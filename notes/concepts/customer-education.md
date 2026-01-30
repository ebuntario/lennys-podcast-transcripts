---
type: concept
aliases:
  - "customer education"
---

# Customer Education

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customer-education"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
