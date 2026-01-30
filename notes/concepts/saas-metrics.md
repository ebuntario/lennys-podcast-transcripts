---
type: concept
aliases:
  - "saas metrics"
---

# Saas Metrics

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/saas-metrics"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
