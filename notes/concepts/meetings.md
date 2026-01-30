---
type: concept
---

# Meetings

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/meetings"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
