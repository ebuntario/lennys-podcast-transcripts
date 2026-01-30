---
type: concept
aliases:
  - "customer communication"
---

# Customer Communication

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-communication"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
