---
type: concept
aliases:
  - "self assessment"
---

# Self Assessment

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/self-assessment"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
