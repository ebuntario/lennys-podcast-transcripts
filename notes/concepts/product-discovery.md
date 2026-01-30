---
type: concept
aliases:
  - "product discovery"
---

# Product Discovery

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/product-discovery"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
