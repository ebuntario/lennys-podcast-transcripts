---
type: concept
aliases:
  - "user journey"
---

# User Journey

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-journey"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
