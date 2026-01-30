---
type: concept
aliases:
  - "team health"
---

# Team Health

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/team-health"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
