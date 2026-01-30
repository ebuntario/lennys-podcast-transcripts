---
type: concept
aliases:
  - "customer experience"
---

# Customer Experience

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-experience"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
