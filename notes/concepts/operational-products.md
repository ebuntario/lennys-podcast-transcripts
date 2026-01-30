---
type: concept
aliases:
  - "operational products"
---

# Operational Products

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/operational-products"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
