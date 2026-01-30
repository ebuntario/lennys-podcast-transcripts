---
type: concept
aliases:
  - "community metrics"
---

# Community Metrics

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/community-metrics"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
