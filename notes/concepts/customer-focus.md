---
type: concept
aliases:
  - "customer focus"
---

# Customer Focus

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-focus"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
