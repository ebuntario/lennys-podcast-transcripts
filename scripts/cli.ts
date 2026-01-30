#!/usr/bin/env node
/**
 * Lenny's Podcast Knowledge Graph CLI
 * 
 * A unified command-line interface for managing the podcast knowledge graph.
 * 
 * Usage:
 *   npx tsx scripts/cli.ts <command> [options]
 * 
 * Commands:
 *   extract     Extract insights from podcast transcripts
 *   concepts    Generate concept pages from extracted insights
 *   analyze     Analyze concepts for potential merging (uses LLM)
 *   canonicalize Apply concept mappings from clusters file
 *   guests      Generate guest pages
 *   validate    Validate all wikilinks in the vault
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name("lenny-kg")
  .description("Lenny's Podcast Knowledge Graph CLI")
  .version("1.0.0");

// ============================================================================
// EXTRACT COMMAND - Extract insights from transcripts
// ============================================================================
program
  .command("extract")
  .description("Extract insights from podcast transcripts")
  .option("-n, --limit <number>", "Limit number of episodes to process")
  .option("--dry-run", "Preview without writing files")
  .option("--verbose", "Show detailed output")
  .option("--reprocess", "Reprocess already-processed episodes")
  .action(async (options) => {
    const args = ["scripts/transcript-agent.ts"];
    if (options.dryRun) args.push("--dry-run");
    if (options.verbose) args.push("--verbose");
    if (options.limit) args.push(options.limit);
    
    console.log(`Running: npx tsx ${args.join(" ")}`);
    const { spawn } = await import("child_process");
    const child = spawn("npx", ["tsx", ...args], { 
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
    });
    child.on("exit", (code) => process.exit(code ?? 0));
  });

// ============================================================================
// CONCEPTS COMMAND - Generate concept pages
// ============================================================================
program
  .command("concepts")
  .description("Generate concept pages from insights")
  .option("--dry-run", "Preview without writing files")
  .action(async (options) => {
    const args = ["scripts/generate-concepts.ts"];
    if (options.dryRun) args.push("--dry-run");
    
    console.log(`Running: npx tsx ${args.join(" ")}`);
    const { spawn } = await import("child_process");
    const child = spawn("npx", ["tsx", ...args], { 
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
    });
    child.on("exit", (code) => process.exit(code ?? 0));
  });

// ============================================================================
// ANALYZE COMMAND - Analyze concepts for merging
// ============================================================================
program
  .command("analyze")
  .description("Analyze concepts for potential merging (uses LLM)")
  .action(async () => {
    console.log("Running: npx tsx scripts/analyze-concepts.ts");
    const { spawn } = await import("child_process");
    const child = spawn("npx", ["tsx", "scripts/analyze-concepts.ts"], { 
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
    });
    child.on("exit", (code) => process.exit(code ?? 0));
  });

// ============================================================================
// CANONICALIZE COMMAND - Apply concept mappings
// ============================================================================
program
  .command("canonicalize")
  .description("Apply concept mappings from clusters file")
  .option("--dry-run", "Preview without writing files")
  .action(async (options) => {
    const args = ["scripts/canonicalize-concepts.ts"];
    if (options.dryRun) args.push("--dry-run");
    
    console.log(`Running: npx tsx ${args.join(" ")}`);
    const { spawn } = await import("child_process");
    const child = spawn("npx", ["tsx", ...args], { 
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
    });
    child.on("exit", (code) => process.exit(code ?? 0));
  });

// ============================================================================
// GUESTS COMMAND - Generate guest pages
// ============================================================================
program
  .command("guests")
  .description("Generate guest pages from episodes")
  .action(async () => {
    console.log("Running: npx tsx scripts/generate-guests.ts");
    const { spawn } = await import("child_process");
    const child = spawn("npx", ["tsx", "scripts/generate-guests.ts"], { 
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
    });
    child.on("exit", (code) => process.exit(code ?? 0));
  });

// ============================================================================
// VALIDATE COMMAND - Validate wikilinks
// ============================================================================
program
  .command("validate")
  .description("Validate all wikilinks in the vault")
  .option("--fix", "Attempt to fix broken links (removes them)")
  .action(async (options) => {
    await validateLinks(options.fix);
  });

/**
 * Validate all wikilinks in markdown files
 */
async function validateLinks(fix: boolean): Promise<void> {
  const NOTES_DIR = path.join(__dirname, "..", "notes");
  const brokenLinks: Array<{ file: string; link: string; type: string }> = [];

  // Get all existing concepts, guests, and insights
  const existingFiles = new Set<string>();
  
  const conceptsDir = path.join(NOTES_DIR, "concepts");
  const guestsDir = path.join(NOTES_DIR, "guests");
  const insightsDir = path.join(NOTES_DIR, "insights");
  
  if (fs.existsSync(conceptsDir)) {
    fs.readdirSync(conceptsDir)
      .filter(f => f.endsWith(".md"))
      .forEach(f => existingFiles.add(`concepts/${f.replace(".md", "")}`));
  }
  
  if (fs.existsSync(guestsDir)) {
    fs.readdirSync(guestsDir)
      .filter(f => f.endsWith(".md"))
      .forEach(f => existingFiles.add(`guests/${f.replace(".md", "")}`));
  }
  
  if (fs.existsSync(insightsDir)) {
    fs.readdirSync(insightsDir)
      .filter(f => f.endsWith(".md"))
      .forEach(f => existingFiles.add(`insights/${f.replace(".md", "")}`));
  }

  console.log(`📋 Found ${existingFiles.size} existing pages`);
  console.log("🔍 Scanning for broken wikilinks...\n");

  // Scan all markdown files
  const scanDir = (dir: string, prefix: string) => {
    if (!fs.existsSync(dir)) return;
    
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".md")) continue;
      
      const filepath = path.join(dir, file);
      let content = fs.readFileSync(filepath, "utf-8");
      
      // Find all wikilinks
      const linkPattern = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
      let match;
      let modified = false;
      
      while ((match = linkPattern.exec(content)) !== null) {
        const link = match[1];
        
        // Skip if it's a valid link
        if (existingFiles.has(link)) continue;
        
        // Determine type of broken link
        let type = "unknown";
        if (link.startsWith("concepts/")) type = "concept";
        else if (link.startsWith("guests/")) type = "guest";
        else if (link.startsWith("insights/")) type = "insight";
        
        brokenLinks.push({
          file: `${prefix}/${file}`,
          link,
          type,
        });
      }
    }
  };

  scanDir(path.join(NOTES_DIR, "concepts"), "concepts");
  scanDir(path.join(NOTES_DIR, "guests"), "guests");
  scanDir(path.join(NOTES_DIR, "insights"), "insights");
  scanDir(path.join(NOTES_DIR, "mocs"), "mocs");

  if (brokenLinks.length === 0) {
    console.log("✅ No broken links found!");
    return;
  }

  console.log(`❌ Found ${brokenLinks.length} broken links:\n`);

  // Group by type
  const byType = brokenLinks.reduce((acc, link) => {
    if (!acc[link.type]) acc[link.type] = [];
    acc[link.type]!.push(link);
    return acc;
  }, {} as Record<string, typeof brokenLinks>);

  for (const [type, links] of Object.entries(byType)) {
    console.log(`\n${type.toUpperCase()} (${links.length}):`);
    const uniqueLinks = [...new Set(links.map(l => l.link))];
    uniqueLinks.slice(0, 10).forEach(link => {
      const count = links.filter(l => l.link === link).length;
      console.log(`  - ${link} (${count} references)`);
    });
    if (uniqueLinks.length > 10) {
      console.log(`  ... and ${uniqueLinks.length - 10} more`);
    }
  }

  if (fix) {
    console.log("\n🔧 --fix not yet implemented. Would remove broken wikilinks.");
  }
}

// ============================================================================
// STATS COMMAND - Show knowledge graph statistics
// ============================================================================
program
  .command("stats")
  .description("Show knowledge graph statistics")
  .action(async () => {
    const NOTES_DIR = path.join(__dirname, "..", "notes");
    
    const countFiles = (dir: string): number => {
      if (!fs.existsSync(dir)) return 0;
      return fs.readdirSync(dir).filter(f => f.endsWith(".md")).length;
    };
    
    const conceptCount = countFiles(path.join(NOTES_DIR, "concepts"));
    const insightCount = countFiles(path.join(NOTES_DIR, "insights"));
    const guestCount = countFiles(path.join(NOTES_DIR, "guests"));
    const mocCount = countFiles(path.join(NOTES_DIR, "mocs"));
    
    const EPISODES_DIR = path.join(__dirname, "..", "episodes");
    const episodeCount = fs.existsSync(EPISODES_DIR) 
      ? fs.readdirSync(EPISODES_DIR).filter(d => 
          fs.existsSync(path.join(EPISODES_DIR, d, "transcript.md"))
        ).length
      : 0;
    
    const processedDir = path.join(NOTES_DIR, ".processed");
    const processedCount = fs.existsSync(processedDir)
      ? fs.readdirSync(processedDir).filter(f => f.endsWith(".done")).length
      : 0;

    console.log("\n📊 Knowledge Graph Statistics\n");
    console.log("┌─────────────────────────────────────┐");
    console.log(`│  Episodes:     ${String(episodeCount).padStart(5)} total          │`);
    console.log(`│                ${String(processedCount).padStart(5)} processed      │`);
    console.log("├─────────────────────────────────────┤");
    console.log(`│  Insights:     ${String(insightCount).padStart(5)}                │`);
    console.log(`│  Concepts:     ${String(conceptCount).padStart(5)}                │`);
    console.log(`│  Guests:       ${String(guestCount).padStart(5)}                │`);
    console.log(`│  MOCs:         ${String(mocCount).padStart(5)}                │`);
    console.log("└─────────────────────────────────────┘\n");
  });

program.parse();
