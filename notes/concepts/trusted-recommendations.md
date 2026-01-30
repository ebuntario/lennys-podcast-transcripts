---
type: concept
aliases:
  - "trusted recommendations"
---

# Trusted Recommendations

## Insights

```dataview
LIST
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "concepts/trusted-recommendations"))
SORT file.name ASC
```

## Related Concepts

<!-- Add related concept links here -->
