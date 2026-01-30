---
type: concept
aliases:
  - "customer expectations"
---

# Customer Expectations

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-expectations"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
