---
type: moc
title: Career Growth
---

# 📈 Career Growth

A map of content for career development insights from Lenny's Podcast.

## Career Navigation

- [[concepts/career-development]] - Growing your career
- [[concepts/career-strategy]] - Long-term career planning
- [[concepts/networking]] - Building professional relationships
- [[concepts/mentorship]] - Learning from others

## Personal Development

- [[concepts/skill-development]] - Building new capabilities
- [[concepts/self-awareness]] - Understanding yourself
- [[concepts/feedback]] - Giving and receiving feedback
- [[concepts/personal-growth]] - Continuous improvement

## Work & Life

- [[concepts/burnout]] - Preventing exhaustion
- [[concepts/productivity]] - Working effectively
- [[concepts/time-management]] - Managing your time
- [[concepts/work-life-balance]] - Sustainable work

## Top Career Insights

```dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, "career-development") OR contains(concepts, "career-strategy")
SORT file.name ASC
LIMIT 20
```
