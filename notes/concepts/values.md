---
type: concept
---

# Values

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/values"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
