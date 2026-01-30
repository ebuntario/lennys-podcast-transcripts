import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const slugify = require("slugify") as (str: string, opts?: { lower?: boolean; strict?: boolean }) => string;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSIGHTS_DIR = path.join(__dirname, "..", "notes", "insights");
const CONCEPTS_DIR = path.join(__dirname, "..", "notes", "concepts");

function extractConceptsFromInsights(): Map<string, number> {
  const conceptCounts = new Map<string, number>();

  if (!fs.existsSync(INSIGHTS_DIR)) {
    console.log("No insights directory found");
    return conceptCounts;
  }

  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf-8");
    
    // Extract concepts from wikilink format: "[[concepts/concept-name]]"
    const conceptMatches = content.matchAll(/\[\[concepts\/([^\]|]+)/g);
    for (const match of conceptMatches) {
      const concept = match[1]?.trim();
      if (concept) {
        conceptCounts.set(concept, (conceptCounts.get(concept) || 0) + 1);
      }
    }
  }

  return conceptCounts;
}

function generateConceptPage(concept: string, count: number): string {
  const slug = slugify(concept, { lower: true, strict: true });
  
  // Generate common aliases
  const aliases: string[] = [];
  if (concept.includes("-")) {
    aliases.push(concept.replace(/-/g, " "));
  }

  const aliasYaml = aliases.length > 0 
    ? `aliases:\n${aliases.map(a => `  - "${a}"`).join("\n")}\n` 
    : "";

  return `---
type: concept
${aliasYaml}---

# ${concept.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}

## Insights

\`\`\`dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, this.file.link)
SORT file.name ASC
\`\`\`

## Related Concepts

<!-- Add related concept links here -->
`;
}

function main(): void {
  fs.mkdirSync(CONCEPTS_DIR, { recursive: true });

  const conceptCounts = extractConceptsFromInsights();
  
  if (conceptCounts.size === 0) {
    console.log("No concepts found. Run the agent first to generate insights.");
    return;
  }

  // Sort by count descending
  const sorted = [...conceptCounts.entries()].sort((a, b) => b[1] - a[1]);

  console.log(`Found ${sorted.length} unique concepts\n`);
  console.log("Top 20 concepts:");
  sorted.slice(0, 20).forEach(([tag, count]) => {
    console.log(`  ${count}x ${tag}`);
  });
  console.log("");

  let created = 0;
  let skipped = 0;

  for (const [tag, count] of sorted) {
    const slug = slugify(tag, { lower: true, strict: true });
    const filepath = path.join(CONCEPTS_DIR, `${slug}.md`);

    if (fs.existsSync(filepath)) {
      skipped++;
      continue;
    }

    const content = generateConceptPage(tag, count);
    fs.writeFileSync(filepath, content, "utf-8");
    console.log(`  → ${slug}.md (${count} insights)`);
    created++;
  }

  console.log(`\n✅ Created ${created} concept pages (${skipped} already existed)`);
}

main();
