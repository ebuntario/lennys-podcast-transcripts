---
type: concept
---

# Quality

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/quality"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
