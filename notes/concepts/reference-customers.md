---
type: concept
aliases:
  - "reference customers"
---

# Reference Customers

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/reference-customers"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
