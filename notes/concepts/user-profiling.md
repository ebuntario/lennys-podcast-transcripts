---
type: concept
aliases:
  - "user profiling"
---

# User Profiling

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-profiling"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
