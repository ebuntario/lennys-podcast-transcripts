---
type: concept
aliases:
  - "target buyer"
---

# Target Buyer

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/target-buyer"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
