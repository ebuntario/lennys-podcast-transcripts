---
type: concept
aliases:
  - "self discovery"
---

# Self Discovery

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/self-discovery"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
