# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a content archive containing 300+ podcast transcripts from Lenny's Podcast. Each episode is stored as a standalone markdown file with YAML frontmatter containing structured metadata.

## Repository Structure

```
episodes/
├── guest-name/
│   └── transcript.md
```

Each `transcript.md` file follows a strict two-part structure:

1. **YAML Frontmatter** (lines 1-36 typically):
   - Delimited by `---` at start and end
   - Contains: `guest`, `title`, `youtube_url`, `video_id`, `description`, `duration_seconds`, `duration`, `view_count`, `channel`, `keywords`
   - Keywords are a YAML list of standardized topic tags (e.g., growth, metrics, roadmap, leadership, etc.)

2. **Transcript Content**:
   - Starts with H1 title matching the frontmatter title
   - Followed by `## Transcript` heading
   - Speaker-attributed dialogue with timestamps in format: `Speaker Name (HH:MM:SS):`

## Working with Transcripts

### Parsing Transcripts

When reading transcripts programmatically:
- Split on `---` to separate frontmatter from content
- Use YAML parser for frontmatter (shown in README.md:43-63)
- Frontmatter must remain valid YAML (watch for quotes in titles/descriptions)

### Metadata Standards

When updating or adding metadata:
- `youtube_url` format: `https://www.youtube.com/watch?v={video_id}`
- `video_id`: YouTube video ID extracted from URL
- `duration_seconds`: Numeric float
- `duration`: Human-readable format like `1:13:28` or `3:50`
- `keywords`: Use existing standardized keywords from other transcripts (common ones: growth, metrics, roadmap, prioritization, leadership, management, strategy, product-market fit, etc.)

### Searching Content

To search across all transcripts:
```bash
# Search for specific topics
grep -r "product-market fit" episodes/

# Search in frontmatter only
grep -A 30 "^---$" episodes/*/transcript.md | grep "keyword"

# List all episodes
ls episodes/
```

### Episode Count

The repository currently contains 303 transcript files across episode directories. The README.md claims 284 episodes, which may need updating.

## Obsidian Integration

This repository is configured as an Obsidian vault (`.obsidian/` directory present). The structured markdown format allows for graph visualization and linking between episodes in Obsidian.

## Common Maintenance Tasks

### Adding New Transcripts

1. Create directory: `episodes/guest-name/`
2. Create `transcript.md` with proper YAML frontmatter
3. Ensure frontmatter matches existing format exactly
4. Verify YouTube metadata matches actual video

### Fixing Metadata Issues

Recent commits show common issues:
- YouTube URLs not matching video_id
- Incorrect metadata copied from wrong episodes
- Missing or invalid keywords

When fixing metadata, verify:
- YouTube URL and video_id are consistent
- Guest name matches folder name convention (lowercase, hyphens)
- All required frontmatter fields are present

### Validation

To check for metadata inconsistencies:
```bash
# Check for YouTube URL/video_id mismatches
grep -A 5 "youtube_url:" episodes/*/transcript.md | grep -B 1 "video_id:"

# Find transcripts missing keywords
grep -L "keywords:" episodes/*/transcript.md
```

## Git Workflow

This is a content repository with a straightforward structure:
- Main branch: `main`
- Typical commits: Adding new transcripts, fixing metadata
- No build process or CI/CD
- Pull requests are used for bulk additions/updates
