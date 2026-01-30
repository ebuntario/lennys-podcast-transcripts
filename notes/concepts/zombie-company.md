---
type: concept
aliases:
  - "zombie company"
---

# Zombie Company

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/zombie-company"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
