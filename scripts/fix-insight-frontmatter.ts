import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSIGHTS_DIR = path.join(__dirname, "..", "notes", "insights");

/**
 * Fix insight frontmatter by removing wikilink syntax from concepts.
 * 
 * Before: concepts: ["[[concepts/hiring-strategy]]"]
 * After:  concepts: ["hiring-strategy"]
 * 
 * This makes Obsidian's Properties view display correctly.
 */
function fixInsightFrontmatter(): void {
  if (!fs.existsSync(INSIGHTS_DIR)) {
    console.log("No insights directory found");
    return;
  }

  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Processing ${files.length} insight files...`);

  let fixed = 0;
  let unchanged = 0;

  for (const file of files) {
    const filepath = path.join(INSIGHTS_DIR, file);
    const content = fs.readFileSync(filepath, "utf-8");

    // Replace wikilink concept format with plain concept names
    // Match: "[[concepts/concept-name]]" or "[[concepts/concept-name|display]]"
    let newContent = content;
    
    // Fix concepts in frontmatter - replace [[concepts/name]] with just name
    newContent = newContent.replace(
      /^(concepts:[\s\S]*?)"\[\[concepts\/([^\]|]+)(?:\|[^\]]+)?\]\]"/gm,
      (match, prefix, conceptName) => {
        return match.replace(`"[[concepts/${conceptName}]]"`, `"${conceptName}"`);
      }
    );
    
    // More robust approach - replace all instances in the concepts section
    const frontmatterMatch = newContent.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const cleanedFrontmatter = frontmatter.replace(
        /"\[\[concepts\/([^\]|]+)(?:\|[^\]]+)?\]\]"/g, 
        '"$1"'
      );
      
      if (frontmatter !== cleanedFrontmatter) {
        newContent = newContent.replace(frontmatter, cleanedFrontmatter);
        fixed++;
      } else {
        unchanged++;
      }
    }

    if (content !== newContent) {
      fs.writeFileSync(filepath, newContent, "utf-8");
    }
  }

  console.log(`✅ Fixed ${fixed} insight files`);
  console.log(`⏭  Unchanged ${unchanged} files`);
}

fixInsightFrontmatter();
