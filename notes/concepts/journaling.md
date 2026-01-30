---
type: concept
---

# Journaling

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/journaling"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
