# Transcript to Obsidian Skill

Converts podcast transcripts into atomic Obsidian notes using OpenRouter.

## Usage

```bash
# Process all unprocessed transcripts
npm run agent

# Process first N transcripts (for testing)
npm run agent 5
```

## Requirements

- `OPENROUTER_API_KEY` in `.env.local`

## Output

- Atomic notes: `notes/insights/*.md`
- Processing markers: `notes/.processed/{video_id}.done`
