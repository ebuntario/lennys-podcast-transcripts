---
type: concept
---

# Constraints

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/constraints"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
