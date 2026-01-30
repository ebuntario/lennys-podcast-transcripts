---
type: concept
---

# Relationships

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/relationships"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
