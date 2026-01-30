---
type: concept
aliases:
  - "customer retention"
---

# Customer Retention

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-retention"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
