---
type: concept
---

# Announcements

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/announcements"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
