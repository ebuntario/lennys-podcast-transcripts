---
type: concept
aliases:
  - "product feedback"
---

# Product Feedback

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/product-feedback"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
