---
type: concept
aliases:
  - "customer insights"
---

# Customer Insights

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-insights"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
