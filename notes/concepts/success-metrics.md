---
type: concept
aliases:
  - "success metrics"
---

# Success Metrics

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/success-metrics"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
