---
type: concept
aliases:
  - "jobs to be done"
---

# Jobs To Be Done

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/jobs-to-be-done"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
