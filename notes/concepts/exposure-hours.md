---
type: concept
aliases:
  - "exposure hours"
---

# Exposure Hours

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/exposure-hours"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
