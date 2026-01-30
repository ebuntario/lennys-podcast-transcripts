---
type: concept
aliases:
  - "target persona"
---

# Target Persona

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/target-persona"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
