---
type: concept
aliases:
  - "user control"
---

# User Control

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-control"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
