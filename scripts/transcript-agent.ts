import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import OpenAI from "openai";
import matter from "gray-matter";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import pRetry from "p-retry";
import pLimit from "p-limit";

const require = createRequire(import.meta.url);
const slugify = require("slugify") as (str: string, opts?: { lower?: boolean; strict?: boolean }) => string;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EPISODES_DIR = path.join(__dirname, "..", "episodes");
const NOTES_DIR = path.join(__dirname, "..", "notes", "insights");
const PROCESSED_DIR = path.join(__dirname, "..", "notes", ".processed");

// CLI flags
const DRY_RUN = process.argv.includes("--dry-run");
const VERBOSE = process.argv.includes("--verbose");

// Parse concurrency from --concurrency=N or -c N (default 3)
function parseConcurrency(): number {
  const concurrencyArg = process.argv.find(a => a.startsWith("--concurrency="));
  if (concurrencyArg) {
    return parseInt(concurrencyArg.split("=")[1] || "3", 10);
  }
  const cIndex = process.argv.indexOf("-c");
  if (cIndex !== -1 && process.argv[cIndex + 1]) {
    return parseInt(process.argv[cIndex + 1], 10);
  }
  return 3; // Default concurrency
}

const CONCURRENCY = parseConcurrency();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPT = `You are a knowledge extraction agent. Your task is to extract atomic, reusable insights from podcast transcripts.

Rules:
- Extract 10-25 discrete insights per transcript
- Each insight must be standalone (understandable without context)
- 2-5 sentences per insight
- Ignore banter, timestamps, and filler
- Focus on principles, tactics, frameworks, and actionable advice
- Use present tense
- In the content, add 1-2 inline wikilinks to key concepts using [[concepts/concept-name|display text]] format

Output format (repeat for each insight):
---
type: insight
title: [Short descriptive title]
concepts:
  - "concept-1"
  - "concept-2"
  - "concept-3"
source_guest: [GUEST_NAME]
source_episode: [EPISODE_TITLE]
---
[Insight content with 1-2 [[concepts/key-concept|key concept]] wikilinks embedded naturally]
===NOTE===

Rules for concepts:
- Use lowercase kebab-case (e.g., career-development, product-strategy, subscription-models)
- Use plain strings, NOT wikilink format in the frontmatter
- Choose 2-5 concepts per insight that represent the core themes
- In the body text, link the most important concept(s) inline using [[concepts/name|display text]]
Use ===NOTE=== as separator between insights. Do not include any text outside this format.`;

interface ValidatedNote {
  content: string;
  title: string;
  concepts: string[];
  isValid: boolean;
  errors: string[];
}

/**
 * Extract insights with retry logic
 */
async function extractInsights(
  transcript: string,
  guest: string,
  title: string
): Promise<string> {
  const userPrompt = `Extract atomic insights from this podcast transcript.

Guest: ${guest}
Episode: ${title}

Transcript:
${transcript}`;

  return pRetry(
    async () => {
      const response = await openai.chat.completions.create({
        model: "deepseek/deepseek-v3.2",
        temperature: 0.2,
        max_tokens: 8000,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      });

      const content = response.choices[0]?.message?.content;
      if (!content || content.trim().length === 0) {
        throw new Error("Empty response from LLM");
      }
      return content;
    },
    {
      retries: 3,
      minTimeout: 1000,
      maxTimeout: 10000,
      onFailedAttempt: (error: { attemptNumber: number; retriesLeft: number }) => {
        console.log(
          `  ⚠ Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`
        );
      },
    }
  );
}

/**
 * Parse and validate notes from LLM output
 */
function parseAndValidateNotes(rawOutput: string): ValidatedNote[] {
  // Remove any preamble before the first ---
  const cleaned = rawOutput.replace(/^[\s\S]*?(?=---\ntype:)/m, "");

  const rawNotes = cleaned
    .split("===NOTE===")
    .map((n) => n.trim())
    .filter((n) => n.length > 0 && n.startsWith("---"));

  return rawNotes.map((noteContent) => {
    const errors: string[] = [];
    let title = "untitled";
    let concepts: string[] = [];

    try {
      const parsed = matter(noteContent);

      // Validate type
      if (parsed.data.type !== "insight") {
        errors.push(`Invalid type: ${parsed.data.type}`);
      }

      // Validate title
      if (!parsed.data.title || typeof parsed.data.title !== "string") {
        errors.push("Missing or invalid title");
      } else {
        title = parsed.data.title;
      }

      // Validate concepts
      if (!Array.isArray(parsed.data.concepts) || parsed.data.concepts.length === 0) {
        errors.push("Missing or empty concepts array");
      } else {
        concepts = parsed.data.concepts;
      }

      // Validate source_guest
      if (!parsed.data.source_guest) {
        errors.push("Missing source_guest");
      }

      // Validate content exists
      if (!parsed.content || parsed.content.trim().length < 50) {
        errors.push("Content too short (< 50 chars)");
      }
    } catch (e) {
      errors.push(`Parse error: ${e instanceof Error ? e.message : "Unknown"}`);
    }

    return {
      content: noteContent,
      title,
      concepts,
      isValid: errors.length === 0,
      errors,
    };
  });
}

/**
 * Save note with atomic write (write to temp, then move)
 */
function saveNote(
  noteContent: string,
  videoId: string,
  index: number,
  guestName: string,
  guestSlug: string
): string | null {
  let title = `insight-${index}`;

  try {
    const parsed = matter(noteContent);
    if (parsed.data.title) {
      title = parsed.data.title;
    }
  } catch {
    const titleMatch = noteContent.match(/^title:\s*(.+)$/m);
    if (titleMatch) {
      title = titleMatch[1]?.trim() || title;
    }
  }

  // Inject source backlink after frontmatter
  const sourceLink = `source: "[[guests/${guestSlug}|${guestName}]]"`;
  const enhancedContent = noteContent.replace(
    /^(---\n[\s\S]*?)(---)/m,
    `$1${sourceLink}\n$2`
  );

  const slug = slugify(title, { lower: true, strict: true }).slice(0, 50);
  const filename = `${videoId}-${String(index).padStart(2, "0")}-${slug}.md`;
  const filepath = path.join(NOTES_DIR, filename);

  if (DRY_RUN) {
    console.log(`  → [DRY-RUN] Would create: ${filename}`);
    return filename;
  }

  // Atomic write: write to temp file first, then rename
  const tempPath = path.join(os.tmpdir(), `insight-${Date.now()}-${Math.random().toString(36).slice(2)}.md`);
  
  try {
    fs.writeFileSync(tempPath, enhancedContent, "utf-8");
    fs.renameSync(tempPath, filepath);
    console.log(`  → ${filename}`);
    return filename;
  } catch (e) {
    // Clean up temp file if rename failed
    try {
      fs.unlinkSync(tempPath);
    } catch {
      // Ignore cleanup errors
    }
    throw e;
  }
}

function markProcessed(videoId: string): void {
  if (DRY_RUN) return;
  
  const marker = path.join(PROCESSED_DIR, `${videoId}.done`);
  fs.writeFileSync(marker, new Date().toISOString(), "utf-8");
}

function isProcessed(videoId: string): boolean {
  const marker = path.join(PROCESSED_DIR, `${videoId}.done`);
  return fs.existsSync(marker);
}

async function processTranscript(transcriptPath: string): Promise<{ valid: number; invalid: number }> {
  const raw = fs.readFileSync(transcriptPath, "utf-8");
  const { data, content } = matter(raw);

  const videoId = data.video_id;
  const guest = data.guest || "Unknown";
  const guestSlug = slugify(guest, { lower: true, strict: true });
  const title = data.title || "Untitled";

  if (!videoId) {
    console.log(`⚠ Skipping (no video_id): ${transcriptPath}`);
    return { valid: 0, invalid: 0 };
  }

  if (isProcessed(videoId)) {
    console.log(`⏭ Already processed: ${guest}`);
    return { valid: 0, invalid: 0 };
  }

  console.log(`\n🎙 Processing: ${guest} - ${title}`);

  const transcriptBody = content.replace(/^#.*\n/, "").replace(/^## Transcript\n/, "");

  let rawNotes: string;
  try {
    rawNotes = await extractInsights(transcriptBody, guest, title);
  } catch (e) {
    console.log(`  ❌ Failed to extract insights after retries: ${e instanceof Error ? e.message : "Unknown"}`);
    return { valid: 0, invalid: 0 };
  }

  const validatedNotes = parseAndValidateNotes(rawNotes);
  const validNotes = validatedNotes.filter((n) => n.isValid);
  const invalidNotes = validatedNotes.filter((n) => !n.isValid);

  console.log(`  📝 Extracted ${validatedNotes.length} notes (${validNotes.length} valid, ${invalidNotes.length} invalid)`);

  // Log invalid notes if verbose
  if (VERBOSE && invalidNotes.length > 0) {
    invalidNotes.forEach((note) => {
      console.log(`    ⚠ Invalid: "${note.title.slice(0, 30)}..." - ${note.errors.join(", ")}`);
    });
  }

  // Only save valid notes
  validNotes.forEach((note, i) => {
    saveNote(note.content, videoId, i + 1, guest, guestSlug);
  });

  // Only mark as processed if we got at least 1 valid note
  if (validNotes.length > 0) {
    markProcessed(videoId);
    console.log(`  ✅ Done`);
  } else {
    console.log(`  ⚠ No valid notes extracted - NOT marking as processed`);
  }

  return { valid: validNotes.length, invalid: invalidNotes.length };
}

async function main(): Promise<void> {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("❌ OPENROUTER_API_KEY not set");
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log("🔍 DRY RUN MODE - no files will be created\n");
  }

  fs.mkdirSync(NOTES_DIR, { recursive: true });
  fs.mkdirSync(PROCESSED_DIR, { recursive: true });

  // Parse limit from args (skip flags)
  const numericArgs = process.argv.slice(2).filter((a) => !a.startsWith("--") && !a.startsWith("-"));
  const limit = numericArgs[0] ? parseInt(numericArgs[0], 10) : undefined;

  const episodes = fs.readdirSync(EPISODES_DIR).filter((d) => {
    const transcriptPath = path.join(EPISODES_DIR, d, "transcript.md");
    return fs.existsSync(transcriptPath);
  });

  // Filter to unprocessed only
  const unprocessed = episodes.filter((ep) => {
    const transcriptPath = path.join(EPISODES_DIR, ep, "transcript.md");
    const raw = fs.readFileSync(transcriptPath, "utf-8");
    try {
      const { data } = matter(raw);
      return data.video_id && !isProcessed(data.video_id);
    } catch {
      return false;
    }
  });

  console.log(`Found ${episodes.length} episodes (${unprocessed.length} unprocessed)`);
  console.log(`Concurrency: ${CONCURRENCY} parallel requests\n`);
  
  const toProcess = limit ? unprocessed.slice(0, limit) : unprocessed;
  
  if (toProcess.length === 0) {
    console.log("✅ All episodes already processed!");
    return;
  }
  
  if (limit) console.log(`Processing ${toProcess.length} episodes`);

  // Parallel processing with progress tracking
  const limit_fn = pLimit(CONCURRENCY);
  let completed = 0;
  let totalValid = 0;
  let totalInvalid = 0;
  const startTime = Date.now();

  const tasks = toProcess.map((ep) =>
    limit_fn(async () => {
      const transcriptPath = path.join(EPISODES_DIR, ep, "transcript.md");
      const { valid, invalid } = await processTranscript(transcriptPath);
      
      completed++;
      totalValid += valid;
      totalInvalid += invalid;
      
      // Progress update
      const elapsed = (Date.now() - startTime) / 1000;
      const rate = completed / elapsed;
      const remaining = toProcess.length - completed;
      const eta = remaining / rate;
      
      console.log(
        `\n📊 Progress: ${completed}/${toProcess.length} (${Math.round(rate * 60)} ep/min, ETA: ${Math.round(eta / 60)}min)`
      );
    })
  );

  await Promise.all(tasks);

  const totalTime = (Date.now() - startTime) / 1000;
  console.log(`\n🎉 Complete!`);
  console.log(`   Total valid notes: ${totalValid}`);
  console.log(`   Total invalid notes: ${totalInvalid}`);
  console.log(`   Time: ${Math.round(totalTime / 60)}min ${Math.round(totalTime % 60)}s`);
  console.log(`   Rate: ${Math.round(completed / totalTime * 60)} episodes/min`);
}

main().catch(console.error);
