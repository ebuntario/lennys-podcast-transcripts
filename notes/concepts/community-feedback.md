---
type: concept
aliases:
  - "community feedback"
---

# Community Feedback

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/community-feedback"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
