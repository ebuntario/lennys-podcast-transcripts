---
type: concept
---

# Agi

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/agi"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
