---
type: concept
aliases:
  - "idea curation"
---

# Idea Curation

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/idea-curation"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
