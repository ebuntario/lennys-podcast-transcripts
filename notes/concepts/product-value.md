---
type: concept
aliases:
  - "product value"
---

# Product Value

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/product-value"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
