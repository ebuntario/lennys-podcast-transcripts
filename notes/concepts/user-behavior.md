---
type: concept
aliases:
  - "user behavior"
---

# User Behavior

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-behavior"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
