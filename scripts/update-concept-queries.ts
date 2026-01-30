import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONCEPTS_DIR = path.join(__dirname, "..", "notes", "concepts");

/**
 * Update Dataview queries in concept pages to match the new frontmatter format.
 * 
 * Old query: WHERE any(concepts, (c) => contains(c, "concepts/concept-name"))
 * New query: WHERE contains(concepts, "concept-name")
 * 
 * Since concepts are now plain strings like "concept-name" not "[[concepts/concept-name]]"
 */
function updateDataviewQueries(): void {
  const files = fs.readdirSync(CONCEPTS_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Processing ${files.length} concept pages...`);

  let updated = 0;

  for (const file of files) {
    const conceptName = file.replace(".md", "");
    const filepath = path.join(CONCEPTS_DIR, file);
    const content = fs.readFileSync(filepath, "utf-8");

    // Old query pattern
    const oldQuery = `WHERE any(concepts, (c) => contains(c, "concepts/${conceptName}"))`;
    // New simpler query
    const newQuery = `WHERE contains(concepts, "${conceptName}")`;

    if (content.includes(oldQuery)) {
      const newContent = content.replace(oldQuery, newQuery);
      fs.writeFileSync(filepath, newContent, "utf-8");
      updated++;
    }
  }

  console.log(`✅ Updated ${updated} concept page queries`);
}

updateDataviewQueries();
