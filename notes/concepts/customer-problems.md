---
type: concept
aliases:
  - "customer problems"
---

# Customer Problems

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-problems"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
