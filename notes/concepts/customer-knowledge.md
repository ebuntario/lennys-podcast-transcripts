---
type: concept
aliases:
  - "customer knowledge"
---

# Customer Knowledge

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-knowledge"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
