---
type: concept
aliases:
  - "customer understanding"
---

# Customer Understanding

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-understanding"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
