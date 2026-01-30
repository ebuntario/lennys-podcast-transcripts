---
type: concept
---

# Evaluation

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/evaluation"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
