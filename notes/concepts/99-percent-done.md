---
type: concept
aliases:
  - "99 percent done"
---

# 99 Percent Done

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/99-percent-done"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
