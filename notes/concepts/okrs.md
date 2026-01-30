---
type: concept
---

# Okrs

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/okrs"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
