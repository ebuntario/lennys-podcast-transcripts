---
type: concept
aliases:
  - "team diagnosis"
---

# Team Diagnosis

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/team-diagnosis"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
