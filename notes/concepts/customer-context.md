---
type: concept
aliases:
  - "customer context"
---

# Customer Context

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-context"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
