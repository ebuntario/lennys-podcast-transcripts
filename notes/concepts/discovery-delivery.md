---
type: concept
aliases:
  - "discovery delivery"
---

# Discovery Delivery

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, this.file.link)
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
