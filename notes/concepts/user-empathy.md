---
type: concept
aliases:
  - "user empathy"
---

# User Empathy

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-empathy"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
