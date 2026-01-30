---
type: concept
aliases:
  - "brand attributes"
---

# Brand Attributes

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/brand-attributes"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
