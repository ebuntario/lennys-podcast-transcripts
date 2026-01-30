---
type: concept
aliases:
  - "team goals"
---

# Team Goals

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/team-goals"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
