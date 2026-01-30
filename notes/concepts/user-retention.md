---
type: concept
aliases:
  - "user retention"
---

# User Retention

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-retention"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
