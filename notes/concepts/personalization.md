---
type: concept
---

# Personalization

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/personalization"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
