import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import matter from "gray-matter";
import slugify from "slugify";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EPISODES_DIR = path.join(__dirname, "..", "episodes");
const GUESTS_DIR = path.join(__dirname, "..", "notes", "guests");

interface GuestInfo {
  name: string;
  slug: string;
  episodes: Array<{
    title: string;
    folderName: string;
    videoId: string;
  }>;
}

function main(): void {
  fs.mkdirSync(GUESTS_DIR, { recursive: true });

  const guestMap = new Map<string, GuestInfo>();

  const episodeFolders = fs.readdirSync(EPISODES_DIR).filter((d) => {
    const transcriptPath = path.join(EPISODES_DIR, d, "transcript.md");
    return fs.existsSync(transcriptPath);
  });

  for (const folder of episodeFolders) {
    const transcriptPath = path.join(EPISODES_DIR, folder, "transcript.md");
    const raw = fs.readFileSync(transcriptPath, "utf-8");
    const { data } = matter(raw);

    const guestName = data.guest || folder;
    const slug = slugify(guestName, { lower: true, strict: true });

    if (!guestMap.has(slug)) {
      guestMap.set(slug, {
        name: guestName,
        slug,
        episodes: [],
      });
    }

    guestMap.get(slug)!.episodes.push({
      title: data.title || "Untitled",
      folderName: folder,
      videoId: data.video_id || "",
    });
  }

  console.log(`Found ${guestMap.size} unique guests`);

  for (const [slug, guest] of guestMap) {
    const episodeLinks = guest.episodes
      .map((ep) => `- [[episodes/${ep.folderName}/transcript|${ep.title}]]`)
      .join("\n");

    const content = `---
name: "${guest.name}"
type: guest
---

# ${guest.name}

## Episodes

${episodeLinks}

## Insights

\`\`\`dataview
LIST
FROM "notes/insights"
WHERE source_guest = "${guest.name}"
\`\`\`
`;

    const filepath = path.join(GUESTS_DIR, `${slug}.md`);
    fs.writeFileSync(filepath, content, "utf-8");
    console.log(`  → ${slug}.md (${guest.episodes.length} episode${guest.episodes.length > 1 ? "s" : ""})`);
  }

  console.log("\n✅ Guest index pages generated");
}

main();
