---
type: concept
aliases:
  - "quality bar"
---

# Quality Bar

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/quality-bar"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
