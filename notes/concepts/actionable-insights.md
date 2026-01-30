---
type: concept
aliases:
  - "actionable insights"
---

# Actionable Insights

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/actionable-insights"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
