---
type: concept
---

# Feedback

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/feedback"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
