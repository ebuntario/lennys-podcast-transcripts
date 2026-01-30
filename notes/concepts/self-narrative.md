---
type: concept
aliases:
  - "self narrative"
---

# Self Narrative

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/self-narrative"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
