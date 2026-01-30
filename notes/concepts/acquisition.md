---
type: concept
---

# Acquisition

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/acquisition"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
