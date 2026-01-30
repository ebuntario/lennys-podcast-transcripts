---
type: moc
theme: "strategy-business"
---

# Strategy & Business

Business strategy, competition, and market dynamics

## Core Concepts

- [[concepts/product-strategy|Product Strategy]] (127 insights)
- [[concepts/product-market-fit|Product Market Fit]] (68 insights)
- [[concepts/strategy-execution|Strategy Execution]] (49 insights)
- [[concepts/value-based-pricing|Value Based Pricing]] (32 insights)
- [[concepts/organizational-product-strategy|Organizational Product Strategy]] (29 insights)
- [[concepts/competitive-advantage|Competitive Advantage]] (28 insights)
- [[concepts/go-to-market|Go To Market]] (27 insights)
- [[concepts/product-positioning|Product Positioning]] (24 insights)
- [[concepts/strategy|Strategy]] (24 insights)
- [[concepts/positioning|Positioning]] (23 insights)
- [[concepts/marketplace-strategy|Marketplace Strategy]] (23 insights)
- [[concepts/startup-strategy|Startup Strategy]] (19 insights)
- [[concepts/seo-strategy|Seo Strategy]] (19 insights)
- [[concepts/business-model|Business Model]] (17 insights)
- [[concepts/product-marketing|Product Marketing]] (15 insights)
- [[concepts/platform-strategy|Platform Strategy]] (14 insights)
- [[concepts/product-market-leadership|Product Market Leadership]] (13 insights)
- [[concepts/business-strategy|Business Strategy]] (11 insights)
- [[concepts/monetization-strategy|Monetization Strategy]] (10 insights)
- [[concepts/brand-strategy|Brand Strategy]] (9 insights)
- [[concepts/freemium-strategy|Freemium Strategy]] (8 insights)
- [[concepts/marketing-strategy|Marketing Strategy]] (7 insights)
- [[concepts/launch-strategy|Launch Strategy]] (7 insights)
- [[concepts/market-research|Market Research]] (7 insights)
- [[concepts/business-philosophy|Business Philosophy]] (7 insights)
- [[concepts/channel-strategy|Channel Strategy]] (6 insights)
- [[concepts/market-dynamics|Market Dynamics]] (6 insights)
- [[concepts/ai-strategy|Ai Strategy]] (6 insights)
- [[concepts/strategy-deployment|Strategy Deployment]] (6 insights)
- [[concepts/business-acumen|Business Acumen]] (6 insights)

## All Insights

```dataview
TABLE WITHOUT ID
  file.link as "Insight",
  source_guest as "Guest"
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "strategy"))
SORT file.name ASC
LIMIT 50
```
