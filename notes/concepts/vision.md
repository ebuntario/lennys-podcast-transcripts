---
type: concept
---

# Vision

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/vision"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
