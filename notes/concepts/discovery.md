---
type: concept
---

# Discovery

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/discovery"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
