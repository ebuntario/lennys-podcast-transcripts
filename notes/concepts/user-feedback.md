---
type: concept
aliases:
  - "user feedback"
---

# User Feedback

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-feedback"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
