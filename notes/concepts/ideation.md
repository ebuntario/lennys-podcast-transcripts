---
type: concept
---

# Ideation

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/ideation"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
