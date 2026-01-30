---
type: moc
title: AI & Product
---

# 🤖 AI & Product

A map of content for AI-related product insights from Lenny's Podcast.

## AI Fundamentals

- [[concepts/ai-agents]] - Autonomous AI systems
- [[concepts/ai-tools]] - AI-powered productivity tools
- [[concepts/ai-adoption]] - Bringing AI into organizations
- [[concepts/ai-product-development]] - Building AI products

## Building AI Products

- [[concepts/non-determinism]] - Handling AI unpredictability
- [[concepts/prompt-engineering]] - Crafting effective prompts
- [[concepts/user-experience]] - UX for AI interfaces
- [[concepts/trust]] - Building user trust in AI

## AI Strategy

- [[concepts/ai-transformation]] - Organizational AI change
- [[concepts/competitive-advantage]] - AI as a moat
- [[concepts/automation]] - Automating workflows

## Top AI Insights

```dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, "ai-agents") OR contains(concepts, "ai-tools") OR contains(concepts, "ai-adoption")
SORT file.name ASC
LIMIT 20
```
