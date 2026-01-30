---
type: concept
aliases:
  - "human feedback"
---

# Human Feedback

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/human-feedback"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
