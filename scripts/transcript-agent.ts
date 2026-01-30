import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import OpenAI from "openai";
import matter from "gray-matter";
import slugify from "slugify";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EPISODES_DIR = path.join(__dirname, "..", "episodes");
const NOTES_DIR = path.join(__dirname, "..", "notes", "insights");
const PROCESSED_DIR = path.join(__dirname, "..", "notes", ".processed");

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
  - "[[concepts/concept-1]]"
  - "[[concepts/concept-2]]"
  - "[[concepts/concept-3]]"
source_guest: [GUEST_NAME]
source_episode: [EPISODE_TITLE]
---
[Insight content with 1-2 [[concepts/key-concept|key concept]] wikilinks embedded naturally]
===NOTE===

Rules for concepts:
- Use lowercase kebab-case (e.g., career-development, product-strategy, subscription-models)
- Choose 2-5 concepts per insight that represent the core themes
- In the body text, link the most important concept(s) inline using [[concepts/name|display text]]
Use ===NOTE=== as separator between insights. Do not include any text outside this format.`;

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

  const response = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3-0324:free",
    temperature: 0.2,
    max_tokens: 8000,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "";
}

function parseNotes(rawOutput: string): string[] {
  // Remove any preamble before the first ---
  const cleaned = rawOutput.replace(/^[\s\S]*?(?=---\ntype:)/m, "");
  
  return cleaned
    .split("===NOTE===")
    .map((n) => n.trim())
    .filter((n) => n.length > 0 && n.startsWith("---"));
}

function saveNote(
  noteContent: string,
  videoId: string,
  index: number,
  guestName: string,
  guestSlug: string
): void {
  let title = `insight-${index}`;
  
  try {
    const parsed = matter(noteContent);
    if (parsed.data.title) {
      title = parsed.data.title;
    }
  } catch {
    const titleMatch = noteContent.match(/^title:\s*(.+)$/m);
    if (titleMatch) {
      title = titleMatch[1].trim();
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

  fs.writeFileSync(filepath, enhancedContent, "utf-8");
  console.log(`  → ${filename}`);
}

function markProcessed(videoId: string): void {
  const marker = path.join(PROCESSED_DIR, `${videoId}.done`);
  fs.writeFileSync(marker, new Date().toISOString(), "utf-8");
}

function isProcessed(videoId: string): boolean {
  const marker = path.join(PROCESSED_DIR, `${videoId}.done`);
  return fs.existsSync(marker);
}

async function processTranscript(transcriptPath: string): Promise<void> {
  const raw = fs.readFileSync(transcriptPath, "utf-8");
  const { data, content } = matter(raw);

  const videoId = data.video_id;
  const guest = data.guest || "Unknown";
  const guestSlug = slugify(guest, { lower: true, strict: true });
  const title = data.title || "Untitled";

  if (!videoId) {
    console.log(`⚠ Skipping (no video_id): ${transcriptPath}`);
    return;
  }

  if (isProcessed(videoId)) {
    console.log(`⏭ Already processed: ${guest}`);
    return;
  }

  console.log(`\n🎙 Processing: ${guest} - ${title}`);

  const transcriptBody = content.replace(/^#.*\n/, "").replace(/^## Transcript\n/, "");

  const rawNotes = await extractInsights(transcriptBody, guest, title);
  const notes = parseNotes(rawNotes);

  console.log(`  📝 Extracted ${notes.length} insights`);

  notes.forEach((note, i) => {
    saveNote(note, videoId, i + 1, guest, guestSlug);
  });

  markProcessed(videoId);
  console.log(`  ✅ Done`);
}

async function main(): Promise<void> {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("❌ OPENROUTER_API_KEY not set");
    process.exit(1);
  }

  fs.mkdirSync(NOTES_DIR, { recursive: true });
  fs.mkdirSync(PROCESSED_DIR, { recursive: true });

  const limit = process.argv[2] ? parseInt(process.argv[2], 10) : undefined;

  const episodes = fs.readdirSync(EPISODES_DIR).filter((d) => {
    const transcriptPath = path.join(EPISODES_DIR, d, "transcript.md");
    return fs.existsSync(transcriptPath);
  });

  console.log(`Found ${episodes.length} episodes`);
  if (limit) console.log(`Processing first ${limit} episodes`);

  const toProcess = limit ? episodes.slice(0, limit) : episodes;

  for (const ep of toProcess) {
    const transcriptPath = path.join(EPISODES_DIR, ep, "transcript.md");
    await processTranscript(transcriptPath);
  }

  console.log("\n🎉 Complete!");
}

main().catch(console.error);
