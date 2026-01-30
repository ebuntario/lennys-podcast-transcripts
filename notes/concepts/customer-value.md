---
type: concept
aliases:
  - "customer value"
---

# Customer Value

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-value"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
