---
type: concept
aliases:
  - "user observation"
---

# User Observation

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/user-observation"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
