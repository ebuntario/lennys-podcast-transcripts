---
type: concept
---

# Impact

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/impact"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
