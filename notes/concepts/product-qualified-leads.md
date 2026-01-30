---
type: concept
aliases:
  - "product qualified leads"
---

# Product Qualified Leads

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/product-qualified-leads"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
