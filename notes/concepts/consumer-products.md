---
type: concept
aliases:
  - "consumer products"
---

# Consumer Products

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/consumer-products"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
