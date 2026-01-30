---
type: concept
aliases:
  - "internal products"
---

# Internal Products

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/internal-products"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
