/**
 * Generate missing concept pages for all broken concept links
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTES_DIR = path.join(__dirname, "..", "notes");
const CONCEPTS_DIR = path.join(NOTES_DIR, "concepts");

const DRY_RUN = process.argv.includes("--dry-run");

function getExistingConcepts(): Set<string> {
  const concepts = new Set<string>();
  if (fs.existsSync(CONCEPTS_DIR)) {
    fs.readdirSync(CONCEPTS_DIR)
      .filter(f => f.endsWith(".md"))
      .forEach(f => concepts.add(f.replace(".md", "")));
  }
  return concepts;
}

function findBrokenConceptLinks(): Map<string, number> {
  const brokenLinks = new Map<string, number>();
  const existingConcepts = getExistingConcepts();

  const scanDir = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".md")) continue;
      
      const filepath = path.join(dir, file);
      const content = fs.readFileSync(filepath, "utf-8");
      
      // Find all concept wikilinks
      const linkPattern = /\[\[concepts\/([^\]|]+)(?:\|[^\]]+)?\]\]/g;
      let match;
      
      while ((match = linkPattern.exec(content)) !== null) {
        const conceptName = match[1];
        
        if (!existingConcepts.has(conceptName)) {
          brokenLinks.set(conceptName, (brokenLinks.get(conceptName) || 0) + 1);
        }
      }
    }
  };

  scanDir(path.join(NOTES_DIR, "insights"));
  scanDir(path.join(NOTES_DIR, "concepts"));
  scanDir(path.join(NOTES_DIR, "mocs"));

  return brokenLinks;
}

function generateConceptPage(conceptName: string): string {
  const displayName = conceptName
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return `---
type: concept
aliases:
  - "${displayName.toLowerCase()}"
---

# ${displayName}

## Insights

\`\`\`dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, "${conceptName}")
SORT file.name ASC
\`\`\`
`;
}

function main(): void {
  console.log("🔍 Finding broken concept links...\n");
  
  const brokenLinks = findBrokenConceptLinks();
  
  if (brokenLinks.size === 0) {
    console.log("✅ No broken concept links found!");
    return;
  }
  
  // Sort by reference count (most referenced first)
  const sorted = [...brokenLinks.entries()].sort((a, b) => b[1] - a[1]);
  
  console.log(`Found ${brokenLinks.size} missing concepts\n`);
  
  let generated = 0;
  
  for (const [concept, count] of sorted) {
    const filepath = path.join(CONCEPTS_DIR, `${concept}.md`);
    
    if (DRY_RUN) {
      console.log(`  📄 [DRY-RUN] Would create: ${concept}.md (${count} refs)`);
    } else {
      const content = generateConceptPage(concept);
      fs.writeFileSync(filepath, content, "utf-8");
      console.log(`  📄 Created: ${concept}.md (${count} refs)`);
    }
    generated++;
  }
  
  console.log(`\n✅ Done! Generated ${generated} concept pages`);
}

main();
