---
type: concept
aliases:
  - "customer feedback"
---

# Customer Feedback

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-feedback"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
