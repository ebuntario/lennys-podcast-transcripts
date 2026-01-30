---
type: concept
aliases:
  - "pre post analysis"
---

# Pre Post Analysis

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/pre-post-analysis"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
