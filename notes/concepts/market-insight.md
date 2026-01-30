---
type: concept
aliases:
  - "market insight"
---

# Market Insight

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/market-insight"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
