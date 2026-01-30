---
type: concept
aliases:
  - "customer insight"
---

# Customer Insight

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-insight"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
