import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSIGHTS_DIR = path.join(__dirname, "..", "notes", "insights");
const CONCEPTS_DIR = path.join(__dirname, "..", "notes", "concepts");
const CLUSTERS_FILE = path.join(__dirname, "..", "concept-clusters.json");

const DRY_RUN = process.argv.includes("--dry-run");

interface ClusterData {
  clusters: Record<string, string[]>;
}

/**
 * Build reverse mapping: alias → canonical
 */
function buildAliasMap(clusters: Record<string, string[]>): Map<string, string> {
  const aliasMap = new Map<string, string>();
  
  for (const [canonical, aliases] of Object.entries(clusters)) {
    for (const alias of aliases) {
      aliasMap.set(alias.toLowerCase(), canonical.toLowerCase());
    }
  }
  
  return aliasMap;
}

/**
 * Canonicalize concepts in insight files (frontmatter + body)
 */
function canonicalizeInsights(aliasMap: Map<string, string>): number {
  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".md"));
  let updated = 0;

  for (const file of files) {
    const filepath = path.join(INSIGHTS_DIR, file);
    let content = fs.readFileSync(filepath, "utf-8");
    let changed = false;

    // Replace concepts in frontmatter (format: "concept-name")
    for (const [alias, canonical] of aliasMap) {
      const regex = new RegExp(`"${alias}"`, "gi");
      if (content.match(regex)) {
        content = content.replace(regex, `"${canonical}"`);
        changed = true;
      }
    }

    // Replace concepts in body wikilinks: [[concepts/alias|...]] or [[concepts/alias]]
    for (const [alias, canonical] of aliasMap) {
      const regex = new RegExp(`\\[\\[concepts/${alias}(\\||\\]\\])`, "gi");
      if (content.match(regex)) {
        content = content.replace(regex, `[[concepts/${canonical}$1`);
        changed = true;
      }
    }

    if (changed) {
      if (!DRY_RUN) {
        fs.writeFileSync(filepath, content, "utf-8");
      }
      updated++;
    }
  }

  return updated;
}

/**
 * Delete alias concept pages and keep canonical ones
 */
function cleanupConceptPages(aliasMap: Map<string, string>): { deleted: number; kept: number } {
  const files = fs.readdirSync(CONCEPTS_DIR).filter((f) => f.endsWith(".md"));
  let deleted = 0;
  let kept = 0;

  for (const file of files) {
    const conceptName = file.replace(".md", "").toLowerCase();
    
    if (aliasMap.has(conceptName)) {
      // This is an alias - delete it
      const filepath = path.join(CONCEPTS_DIR, file);
      if (!DRY_RUN) {
        fs.unlinkSync(filepath);
      }
      console.log(`  🗑️  Deleted: ${file} (alias of ${aliasMap.get(conceptName)})`);
      deleted++;
    } else {
      kept++;
    }
  }

  return { deleted, kept };
}

/**
 * Update related concepts in canonical pages to use canonical names
 */
function updateRelatedConcepts(aliasMap: Map<string, string>): number {
  const files = fs.readdirSync(CONCEPTS_DIR).filter((f) => f.endsWith(".md"));
  let updated = 0;

  for (const file of files) {
    const filepath = path.join(CONCEPTS_DIR, file);
    let content = fs.readFileSync(filepath, "utf-8");
    let changed = false;

    for (const [alias, canonical] of aliasMap) {
      const regex = new RegExp(`\\[\\[concepts/${alias}\\]\\]`, "gi");
      if (content.match(regex)) {
        content = content.replace(regex, `[[concepts/${canonical}]]`);
        changed = true;
      }
    }

    if (changed) {
      if (!DRY_RUN) {
        fs.writeFileSync(filepath, content, "utf-8");
      }
      updated++;
    }
  }

  return updated;
}

async function main(): Promise<void> {
  if (DRY_RUN) {
    console.log("🔍 DRY RUN MODE - no files will be modified\n");
  }

  // Load clusters
  if (!fs.existsSync(CLUSTERS_FILE)) {
    console.error("❌ concept-clusters.json not found. Run analyze-concepts.ts first.");
    process.exit(1);
  }

  const data: ClusterData = JSON.parse(fs.readFileSync(CLUSTERS_FILE, "utf-8"));
  const aliasMap = buildAliasMap(data.clusters);
  
  console.log(`📊 Loaded ${aliasMap.size} alias mappings\n`);

  // Step 1: Update insights
  console.log("📝 Updating insight files...");
  const insightsUpdated = canonicalizeInsights(aliasMap);
  console.log(`   Updated ${insightsUpdated} insights\n`);

  // Step 2: Delete alias concept pages
  console.log("🗑️  Cleaning up alias concept pages...");
  const { deleted, kept } = cleanupConceptPages(aliasMap);
  console.log(`   Deleted ${deleted} alias pages, kept ${kept} pages\n`);

  // Step 3: Update related concepts in remaining pages
  console.log("🔗 Updating related concept links...");
  const conceptsUpdated = updateRelatedConcepts(aliasMap);
  console.log(`   Updated ${conceptsUpdated} concept pages\n`);

  if (DRY_RUN) {
    console.log("✅ Dry run complete. Run without --dry-run to apply changes.");
  } else {
    console.log("✅ Canonicalization complete!");
    console.log("\nRun 'npm run generate-concepts' to regenerate any missing concept pages.");
  }
}

main().catch(console.error);
