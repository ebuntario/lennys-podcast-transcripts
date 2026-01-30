---
type: concept
aliases:
  - "input metrics"
---

# Input Metrics

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/input-metrics"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
