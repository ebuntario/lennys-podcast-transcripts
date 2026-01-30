---
type: concept
aliases:
  - "customer proximity"
---

# Customer Proximity

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-proximity"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
