---
type: concept
---

# Instrumentation

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/instrumentation"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
