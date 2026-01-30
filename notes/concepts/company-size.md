---
type: concept
aliases:
  - "company size"
---

# Company Size

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/company-size"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
