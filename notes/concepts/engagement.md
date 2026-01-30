---
type: concept
---

# Engagement

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/engagement"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
