---
type: concept
aliases:
  - "company evaluation"
---

# Company Evaluation

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/company-evaluation"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
