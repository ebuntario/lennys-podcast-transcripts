---
type: concept
aliases:
  - "product review"
---

# Product Review

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/product-review"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
