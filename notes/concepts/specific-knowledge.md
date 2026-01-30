---
type: concept
aliases:
  - "specific knowledge"
---

# Specific Knowledge

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, this.file.link)
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
