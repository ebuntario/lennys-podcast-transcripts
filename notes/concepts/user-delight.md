---
type: concept
aliases:
  - "user delight"
---

# User Delight

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-delight"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
