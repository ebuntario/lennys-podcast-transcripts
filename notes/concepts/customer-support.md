---
type: concept
aliases:
  - "customer support"
---

# Customer Support

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-support"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
