---
type: concept
aliases:
  - "user engagement"
---

# User Engagement

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-engagement"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
