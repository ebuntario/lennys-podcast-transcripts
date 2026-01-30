import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import dotenv from "dotenv";
import pRetry from "p-retry";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSIGHTS_DIR = path.join(__dirname, "..", "notes", "insights");
const OUTPUT_FILE = path.join(__dirname, "..", "concept-clusters.json");

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error("❌ OPENROUTER_API_KEY not set in environment");
  process.exit(1);
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
});

/**
 * Extract all unique concepts from insights
 */
function extractAllConcepts(): Map<string, number> {
  const conceptCounts = new Map<string, number>();

  if (!fs.existsSync(INSIGHTS_DIR)) {
    console.log("No insights directory found");
    return conceptCounts;
  }

  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf-8");
    
    // Extract concepts from frontmatter (now plain strings like "concept-name")
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch && frontmatterMatch[1]) {
      const conceptMatches = frontmatterMatch[1].matchAll(/^\s*-\s*"([^"]+)"/gm);
      for (const match of conceptMatches) {
        const concept = match[1]?.trim().toLowerCase();
        if (concept && !concept.startsWith("[[")) {
          conceptCounts.set(concept, (conceptCounts.get(concept) || 0) + 1);
        }
      }
    }

    // Also extract from body wikilinks
    const bodyConceptMatches = content.matchAll(/\[\[concepts\/([^\]|]+)/g);
    for (const match of bodyConceptMatches) {
      const concept = match[1]?.trim().toLowerCase();
      if (concept) {
        conceptCounts.set(concept, (conceptCounts.get(concept) || 0) + 1);
      }
    }
  }

  return conceptCounts;
}

/**
 * Use LLM to cluster concepts into canonical groups
 */
async function clusterConcepts(concepts: string[]): Promise<Record<string, string[]>> {
  console.log(`\n🤖 Sending ${concepts.length} concepts to LLM for clustering...\n`);

  const prompt = `You are a knowledge graph expert. I have ${concepts.length} concept tags from a product management podcast.

Many concepts are duplicates or near-duplicates that should be merged. Your job is to:
1. Identify groups of concepts that mean the same thing or are very closely related
2. Pick the BEST canonical name for each group (most common, clearest, most descriptive)
3. Return ONLY the clusters where there are 2+ concepts to merge

Rules for merging:
- Merge singular/plural variants: "ai-agent" + "ai-agents" → "ai-agents"
- Merge spelling variants: "decision-making" + "decision making" → "decision-making"
- Merge semantic equivalents: "career-development" + "career-growth" + "professional-development" → "career-development"
- Merge abbreviations: "pmf" + "product-market-fit" → "product-market-fit"
- DO NOT merge related but distinct concepts: "hiring" and "onboarding" are DIFFERENT
- DO NOT merge parent/child concepts: "growth" and "product-led-growth" are DIFFERENT

Return JSON ONLY (no markdown, no explanation):
{
  "canonical-name-1": ["alias-1", "alias-2"],
  "canonical-name-2": ["alias-3", "alias-4", "alias-5"]
}

The canonical name should NOT be in the aliases array.

Here are all the concepts:
${concepts.join(", ")}`;

  const response = await pRetry(
    async () => {
      const result = await openai.chat.completions.create({
        model: "anthropic/claude-sonnet-4.5",
        temperature: 0.1,
        max_tokens: 8000,
        messages: [
          { role: "user", content: prompt },
        ],
      });
      
      const content = result.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from LLM");
      }
      return content;
    },
    {
      retries: 3,
      minTimeout: 2000,
      maxTimeout: 15000,
      onFailedAttempt: (error: { attemptNumber: number; retriesLeft: number }) => {
        console.log(`  ⚠ Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`);
      },
    }
  );

  // Clean up response - remove markdown code blocks if present
  const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse LLM response:", e);
    console.error("Raw output:", response);
    return {};
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  console.log("📊 Extracting all concepts from insights...\n");
  
  const conceptCounts = extractAllConcepts();
  const concepts = [...conceptCounts.keys()].sort();
  
  console.log(`Found ${concepts.length} unique concepts`);
  
  // Show top 20 by frequency
  const sorted = [...conceptCounts.entries()].sort((a, b) => b[1] - a[1]);
  console.log("\nTop 20 concepts by frequency:");
  sorted.slice(0, 20).forEach(([c, count], i) => {
    console.log(`  ${i + 1}. ${c} (${count})`);
  });

  // Cluster using LLM
  const clusters = await clusterConcepts(concepts);
  
  // Count how many concepts will be merged
  let mergeCount = 0;
  for (const aliases of Object.values(clusters)) {
    mergeCount += aliases.length;
  }
  
  console.log(`\n✅ LLM identified ${Object.keys(clusters).length} canonical concepts`);
  console.log(`   ${mergeCount} aliases will be merged`);
  console.log(`   Final concept count: ~${concepts.length - mergeCount}`);
  
  // Save to file
  const output = {
    generated_at: new Date().toISOString(),
    total_concepts: concepts.length,
    clusters_found: Object.keys(clusters).length,
    aliases_to_merge: mergeCount,
    estimated_final_count: concepts.length - mergeCount,
    clusters: clusters,
  };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\n📁 Saved to: concept-clusters.json`);
  console.log("\nReview this file, then run: npm run canonicalize");
}

main().catch(console.error);
