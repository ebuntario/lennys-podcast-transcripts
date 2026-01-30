---
type: concept
aliases:
  - "value metric"
---

# Value Metric

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, this.file.link)
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
