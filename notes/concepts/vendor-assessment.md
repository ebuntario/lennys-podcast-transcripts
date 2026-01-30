---
type: concept
aliases:
  - "vendor assessment"
---

# Vendor Assessment

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/vendor-assessment"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
