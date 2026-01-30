---
type: concept
---

# Strengths

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/strengths"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
