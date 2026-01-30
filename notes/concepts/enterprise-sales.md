---
type: concept
aliases:
  - "enterprise sales"
---

# Enterprise Sales

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/enterprise-sales"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
