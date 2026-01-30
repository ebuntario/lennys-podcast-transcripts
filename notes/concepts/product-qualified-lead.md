---
type: concept
aliases:
  - "product qualified lead"
---

# Product Qualified Lead

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/product-qualified-lead"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
