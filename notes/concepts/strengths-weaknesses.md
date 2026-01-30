---
type: concept
aliases:
  - "strengths weaknesses"
---

# Strengths Weaknesses

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/strengths-weaknesses"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
