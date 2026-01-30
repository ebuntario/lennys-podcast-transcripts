---
type: concept
aliases:
  - "customer interviews"
---

# Customer Interviews

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-interviews"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
