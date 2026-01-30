---
type: concept
---

# Exploration

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/exploration"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
