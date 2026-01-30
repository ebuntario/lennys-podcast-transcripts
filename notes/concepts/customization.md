---
type: concept
---

# Customization

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/customization"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
