---
type: concept
aliases:
  - "conversion metrics"
---

# Conversion Metrics

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/conversion-metrics"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
