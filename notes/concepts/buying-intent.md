---
type: concept
aliases:
  - "buying intent"
---

# Buying Intent

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/buying-intent"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
