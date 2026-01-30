import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONCEPTS_DIR = path.join(__dirname, "..", "notes", "concepts");

/**
 * Fix Dataview queries in concept pages to use string matching
 * instead of link comparison.
 * 
 * The issue: frontmatter concepts are strings like "[[concepts/x]]"
 * but Dataview's this.file.link is a Link object.
 * 
 * Solution: Use contains() with the string path instead.
 */
function fixDataviewQueries(): void {
  const files = fs.readdirSync(CONCEPTS_DIR).filter(f => f.endsWith(".md"));
  
  let fixed = 0;
  let skipped = 0;

  for (const file of files) {
    const filepath = path.join(CONCEPTS_DIR, file);
    const content = fs.readFileSync(filepath, "utf-8");
    
    // Get concept name from filename (without .md)
    const conceptName = file.replace(".md", "");
    
    // The old broken query
    const oldQuery = `WHERE contains(concepts, this.file.link)`;
    
    // The new working query - search for the concept path in concepts array
    const newQuery = `WHERE any(concepts, (c) => contains(c, "concepts/${conceptName}"))`;
    
    if (content.includes(oldQuery)) {
      const newContent = content.replace(oldQuery, newQuery);
      fs.writeFileSync(filepath, newContent, "utf-8");
      fixed++;
    } else {
      skipped++;
    }
  }

  console.log(`✅ Fixed ${fixed} concept pages`);
  console.log(`⏭  Skipped ${skipped} (already fixed or different query)`);
}

fixDataviewQueries();
