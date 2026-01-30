---
type: concept
aliases:
  - "one on ones"
---

# One On Ones

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, this.file.link)
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
