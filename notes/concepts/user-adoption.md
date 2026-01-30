---
type: concept
aliases:
  - "user adoption"
---

# User Adoption

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-adoption"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
