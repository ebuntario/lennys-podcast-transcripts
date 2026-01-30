---
type: moc
title: Product Leadership
---

# 🎯 Product Leadership

A map of content for product management and leadership insights from Lenny's
Podcast.

## Core PM Skills

- [[concepts/product-strategy]] - Strategic product thinking
- [[concepts/product-management]] - The PM craft
- [[concepts/decision-making]] - Making good decisions fast
- [[concepts/prioritization]] - What to work on and when
- [[concepts/product-development]] - Building products

## Leadership & Influence

- [[concepts/leadership]] - Leading teams and organizations
- [[concepts/communication]] - Clear and effective messaging
- [[concepts/cross-functional-collaboration]] - Working across teams
- [[concepts/stakeholder-management]] - Managing up and across
- [[concepts/company-culture]] - Building great environments

## Product Discovery

- [[concepts/user-research]] - Understanding users deeply
- [[concepts/product-market-fit]] - Finding your market
- [[concepts/customer-development]] - Learning from customers
- [[concepts/jobs-to-be-done]] - Understanding user motivations

## Execution

- [[concepts/execution]] - Shipping products
- [[concepts/agile]] - Iterative development
- [[concepts/technical-debt]] - Managing engineering tradeoffs

## Top Leadership Insights

```dataview
LIST
FROM "notes/insights"
WHERE contains(concepts, "leadership") OR contains(concepts, "product-strategy")
SORT file.name ASC
LIMIT 20
```
