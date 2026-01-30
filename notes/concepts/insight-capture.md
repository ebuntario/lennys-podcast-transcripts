---
type: concept
aliases:
  - "insight capture"
---

# Insight Capture

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/insight-capture"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
