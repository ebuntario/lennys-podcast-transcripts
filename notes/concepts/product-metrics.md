---
type: concept
aliases:
  - "product metrics"
---

# Product Metrics

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/product-metrics"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
