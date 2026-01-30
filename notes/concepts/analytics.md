---
type: concept
---

# Analytics

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/analytics"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
