---
type: concept
aliases:
  - "internal champions"
---

# Internal Champions

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/internal-champions"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
