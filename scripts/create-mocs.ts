/**
 * Analyze concepts and create MOCs and core tags
 */

import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTES_DIR = path.join(__dirname, "..", "notes");
const INSIGHTS_DIR = path.join(NOTES_DIR, "insights");
const CONCEPTS_DIR = path.join(NOTES_DIR, "concepts");
const MOCS_DIR = path.join(NOTES_DIR, "mocs");

// Analyze concept frequency from insights
function analyzeConceptFrequency(): Map<string, number> {
  const conceptCounts = new Map<string, number>();
  
  const files = fs.readdirSync(INSIGHTS_DIR).filter(f => f.endsWith(".md"));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf-8");
    try {
      const { data } = matter(content);
      if (Array.isArray(data.concepts)) {
        for (const concept of data.concepts) {
          const name = String(concept).toLowerCase().trim();
          conceptCounts.set(name, (conceptCounts.get(name) || 0) + 1);
        }
      }
    } catch {
      // Skip invalid files
    }
  }
  
  return conceptCounts;
}

// Theme definitions for MOCs
const THEMES: Record<string, { title: string; description: string; keywords: string[] }> = {
  "leadership-management": {
    title: "Leadership & Management",
    description: "Leading teams, management practices, and organizational leadership",
    keywords: ["leadership", "management", "team", "delegation", "coaching", "mentoring", "one-on-one", "manager", "executive", "ceo", "vp", "director"]
  },
  "product-craft": {
    title: "Product Craft",
    description: "Product management, product thinking, and building great products",
    keywords: ["product", "roadmap", "prioritization", "backlog", "prd", "spec", "feature", "mvp", "iteration"]
  },
  "growth-marketing": {
    title: "Growth & Marketing",
    description: "Growth strategies, marketing, acquisition, and retention",
    keywords: ["growth", "marketing", "acquisition", "retention", "activation", "funnel", "conversion", "seo", "paid", "viral", "referral", "plg", "product-led"]
  },
  "strategy-business": {
    title: "Strategy & Business",
    description: "Business strategy, competition, and market dynamics",
    keywords: ["strategy", "business", "market", "competitive", "moat", "positioning", "pricing", "monetization", "revenue", "unit-economics"]
  },
  "hiring-culture": {
    title: "Hiring & Culture",
    description: "Building teams, hiring, and organizational culture",
    keywords: ["hiring", "culture", "interview", "onboarding", "values", "diversity", "remote", "organizational"]
  },
  "career-skills": {
    title: "Career & Skills",
    description: "Career development, skill building, and professional growth",
    keywords: ["career", "skill", "learning", "mentor", "promotion", "feedback", "growth", "development", "professional"]
  },
  "user-research": {
    title: "User Research & Discovery",
    description: "Understanding users, research methods, and customer development",
    keywords: ["research", "user", "customer", "interview", "discovery", "empathy", "persona", "journey", "pain-point"]
  },
  "data-experimentation": {
    title: "Data & Experimentation",
    description: "Data-driven decisions, A/B testing, and metrics",
    keywords: ["data", "metric", "experiment", "a-b-test", "analytics", "measurement", "kpi", "north-star", "testing"]
  },
  "ai-technology": {
    title: "AI & Technology",
    description: "AI, machine learning, and emerging technology",
    keywords: ["ai", "llm", "machine-learning", "automation", "agent", "prompt", "technology", "engineering"]
  },
  "startup-founder": {
    title: "Startup & Founder",
    description: "Startup building, fundraising, and founder journey",
    keywords: ["startup", "founder", "fundraising", "investor", "pitch", "pivot", "bootstrap", "venture", "seed", "series"]
  },
  "communication-influence": {
    title: "Communication & Influence",
    description: "Communication skills, storytelling, and stakeholder management",
    keywords: ["communication", "storytelling", "presentation", "stakeholder", "influence", "persuasion", "negotiation", "writing"]
  },
  "execution-operations": {
    title: "Execution & Operations",
    description: "Getting things done, operations, and process",
    keywords: ["execution", "operations", "process", "efficiency", "velocity", "shipping", "agile", "sprint", "delivery"]
  }
};

// Categorize concept into theme
function categorizeConceptThemes(concept: string): string[] {
  const themes: string[] = [];
  const lower = concept.toLowerCase();
  
  for (const [themeId, theme] of Object.entries(THEMES)) {
    for (const keyword of theme.keywords) {
      if (lower.includes(keyword)) {
        themes.push(themeId);
        break;
      }
    }
  }
  
  return themes;
}

// Generate MOC content
function generateMOCContent(
  themeId: string, 
  theme: { title: string; description: string }, 
  concepts: Array<{ name: string; count: number }>
): string {
  const topConcepts = concepts.slice(0, 30);
  const conceptLinks = topConcepts
    .map(c => `- [[concepts/${c.name}|${c.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}]] (${c.count} insights)`)
    .join("\n");

  return `---
type: moc
theme: "${themeId}"
---

# ${theme.title}

${theme.description}

## Core Concepts

${conceptLinks}

## All Insights

\`\`\`dataview
TABLE WITHOUT ID
  file.link as "Insight",
  source_guest as "Guest"
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "${theme.keywords[0]}"))
SORT file.name ASC
LIMIT 50
\`\`\`
`;
}

// Add core tag to concept
function addCoreTag(conceptPath: string): boolean {
  const content = fs.readFileSync(conceptPath, "utf-8");
  
  // Skip if already has core tag
  if (content.includes("core: true")) {
    return false;
  }
  
  try {
    const { data, content: body } = matter(content);
    data.core = true;
    
    const newContent = matter.stringify(body, data);
    fs.writeFileSync(conceptPath, newContent, "utf-8");
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log("📊 Analyzing concept frequency...\n");
  
  const conceptCounts = analyzeConceptFrequency();
  const sorted = [...conceptCounts.entries()].sort((a, b) => b[1] - a[1]);
  
  console.log(`Found ${sorted.length} concepts in insights\n`);
  console.log("Top 20 concepts:");
  sorted.slice(0, 20).forEach(([name, count], i) => {
    console.log(`  ${String(i + 1).padStart(2)}. ${name} (${count})`);
  });
  
  // Create MOCs
  console.log("\n📁 Creating MOCs...\n");
  fs.mkdirSync(MOCS_DIR, { recursive: true });
  
  const themeConceptMap = new Map<string, Array<{ name: string; count: number }>>();
  
  // Initialize theme arrays
  for (const themeId of Object.keys(THEMES)) {
    themeConceptMap.set(themeId, []);
  }
  
  // Categorize each concept
  for (const [concept, count] of sorted) {
    const themes = categorizeConceptThemes(concept);
    for (const theme of themes) {
      themeConceptMap.get(theme)?.push({ name: concept, count });
    }
  }
  
  // Create MOC files
  let mocsCreated = 0;
  for (const [themeId, theme] of Object.entries(THEMES)) {
    const concepts = themeConceptMap.get(themeId) || [];
    if (concepts.length < 5) {
      console.log(`  ⏭ Skipping ${themeId} (only ${concepts.length} concepts)`);
      continue;
    }
    
    const mocPath = path.join(MOCS_DIR, `${themeId}.md`);
    const content = generateMOCContent(themeId, theme, concepts);
    fs.writeFileSync(mocPath, content, "utf-8");
    console.log(`  ✅ ${themeId}.md (${concepts.length} concepts)`);
    mocsCreated++;
  }
  
  // Tag core concepts (top 100)
  console.log("\n⭐ Tagging core concepts (top 100)...\n");
  
  const top100 = sorted.slice(0, 100);
  let tagged = 0;
  
  for (const [concept, _count] of top100) {
    const conceptPath = path.join(CONCEPTS_DIR, `${concept}.md`);
    if (fs.existsSync(conceptPath)) {
      if (addCoreTag(conceptPath)) {
        tagged++;
      }
    }
  }
  
  console.log(`  Tagged ${tagged} concepts as core\n`);
  console.log(`✅ Done!`);
  console.log(`   MOCs created: ${mocsCreated}`);
  console.log(`   Core concepts tagged: ${tagged}`);
}

main().catch(console.error);
