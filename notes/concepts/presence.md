---
type: concept
---

# Presence

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/presence"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
