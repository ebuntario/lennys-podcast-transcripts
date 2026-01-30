---
type: concept
aliases:
  - "customer journey"
---

# Customer Journey

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-journey"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
