import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSIGHTS_DIR = path.join(__dirname, "..", "notes", "insights");
const CONCEPTS_DIR = path.join(__dirname, "..", "notes", "concepts");

interface ConceptCooccurrence {
  concept: string;
  cooccurrences: Map<string, number>;
}

/**
 * Analyze concept co-occurrence across insights to find related concepts.
 * Two concepts are related if they frequently appear together in the same insight.
 */
function analyzeCooccurrence(): Map<string, Map<string, number>> {
  const cooccurrenceMap = new Map<string, Map<string, number>>();

  if (!fs.existsSync(INSIGHTS_DIR)) {
    console.log("No insights directory found");
    return cooccurrenceMap;
  }

  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Analyzing ${files.length} insights for concept co-occurrence...`);

  for (const file of files) {
    const content = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf-8");
    
    // Extract all concepts from this insight
    const conceptMatches = content.matchAll(/\[\[concepts\/([^\]|]+)/g);
    const concepts: string[] = [];
    
    for (const match of conceptMatches) {
      const concept = match[1].trim().toLowerCase();
      if (concept && !concepts.includes(concept)) {
        concepts.push(concept);
      }
    }

    // Record co-occurrences for each pair
    for (const concept1 of concepts) {
      if (!cooccurrenceMap.has(concept1)) {
        cooccurrenceMap.set(concept1, new Map());
      }
      
      for (const concept2 of concepts) {
        if (concept1 !== concept2) {
          const currentCount = cooccurrenceMap.get(concept1)!.get(concept2) || 0;
          cooccurrenceMap.get(concept1)!.set(concept2, currentCount + 1);
        }
      }
    }
  }

  return cooccurrenceMap;
}

/**
 * Get top N related concepts for a given concept
 */
function getTopRelated(
  cooccurrenceMap: Map<string, Map<string, number>>,
  concept: string,
  topN: number = 5
): Array<{ concept: string; count: number }> {
  const related = cooccurrenceMap.get(concept);
  if (!related) return [];

  return [...related.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([c, count]) => ({ concept: c, count }));
}

/**
 * Update concept pages with related concept links
 */
function updateConceptPages(cooccurrenceMap: Map<string, Map<string, number>>): void {
  const files = fs.readdirSync(CONCEPTS_DIR).filter((f) => f.endsWith(".md"));
  
  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const conceptName = file.replace(".md", "");
    const filepath = path.join(CONCEPTS_DIR, file);
    const content = fs.readFileSync(filepath, "utf-8");

    const topRelated = getTopRelated(cooccurrenceMap, conceptName, 5);
    
    if (topRelated.length === 0) {
      skipped++;
      continue;
    }

    // Generate related concepts markdown
    const relatedLinks = topRelated
      .map(({ concept, count }) => `- [[concepts/${concept}]] (${count} shared insights)`)
      .join("\n");

    // Replace the placeholder comment with actual links
    const oldSection = "<!-- Add related concept links here -->";
    
    if (content.includes(oldSection)) {
      const newContent = content.replace(oldSection, relatedLinks);
      fs.writeFileSync(filepath, newContent, "utf-8");
      updated++;
    } else if (content.includes("## Related Concepts") && !content.includes("[[concepts/")) {
      // Already has section but empty (no placeholder comment)
      const newContent = content.replace(
        /## Related Concepts\s*$/m,
        `## Related Concepts\n\n${relatedLinks}`
      );
      fs.writeFileSync(filepath, newContent, "utf-8");
      updated++;
    } else {
      skipped++;
    }
  }

  console.log(`✅ Updated ${updated} concept pages with related links`);
  console.log(`⏭  Skipped ${skipped} (no related concepts found or already populated)`);
}

/**
 * Print top connected concepts (hub concepts)
 */
function printHubConcepts(cooccurrenceMap: Map<string, Map<string, number>>): void {
  const totalConnections: Array<{ concept: string; connections: number }> = [];

  for (const [concept, related] of cooccurrenceMap) {
    let total = 0;
    for (const count of related.values()) {
      total += count;
    }
    totalConnections.push({ concept, connections: total });
  }

  totalConnections.sort((a, b) => b.connections - a.connections);

  console.log("\n🌟 Top 20 Hub Concepts (most connected):");
  totalConnections.slice(0, 20).forEach(({ concept, connections }, i) => {
    console.log(`  ${i + 1}. ${concept} (${connections} total co-occurrences)`);
  });
}

function main(): void {
  console.log("📊 Analyzing concept co-occurrence...\n");
  
  const cooccurrenceMap = analyzeCooccurrence();
  
  if (cooccurrenceMap.size === 0) {
    console.log("No concepts found to analyze");
    return;
  }

  console.log(`Found ${cooccurrenceMap.size} concepts with relationships\n`);
  
  printHubConcepts(cooccurrenceMap);
  
  console.log("\n📝 Updating concept pages with related links...\n");
  updateConceptPages(cooccurrenceMap);
}

main();
