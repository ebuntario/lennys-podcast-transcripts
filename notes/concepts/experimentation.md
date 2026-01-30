---
type: concept
---

# Experimentation

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/experimentation"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
