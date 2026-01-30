---
type: concept
---

# Documentation

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/documentation"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
