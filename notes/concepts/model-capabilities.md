---
type: concept
aliases:
  - "model capabilities"
---

# Model Capabilities

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/model-capabilities"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
