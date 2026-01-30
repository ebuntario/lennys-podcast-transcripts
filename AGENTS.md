# AGENTS.md

Content archive of 300+ Lenny's Podcast transcripts. No build/test commands—this is a data-only repository.

## Structure
- `episodes/{guest-name}/transcript.md` - Each episode as markdown with YAML frontmatter
- Frontmatter fields: `guest`, `title`, `youtube_url`, `video_id`, `description`, `duration_seconds`, `duration`, `view_count`, `channel`, `keywords`
- Transcript format: H1 title → `## Transcript` → Speaker-attributed dialogue with timestamps `Speaker Name (HH:MM:SS):`

## Conventions
- Folder names: lowercase, hyphenated guest names (e.g., `brian-chesky/`)
- `youtube_url` must match `video_id`: `https://www.youtube.com/watch?v={video_id}`
- Keywords: Use existing standardized tags (growth, metrics, roadmap, leadership, product-market fit, etc.)
- Frontmatter must be valid YAML—escape quotes in titles/descriptions

## Common Commands
```bash
grep -r "topic" episodes/                    # Search transcripts
grep -L "keywords:" episodes/*/transcript.md # Find missing keywords
ls episodes/                                 # List all episodes
```
