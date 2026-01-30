---
type: concept
aliases:
  - "customer needs"
---

# Customer Needs

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-needs"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
