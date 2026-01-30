---
type: concept
aliases:
  - "organizational diagnostics"
---

# Organizational Diagnostics

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/organizational-diagnostics"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
