---
type: moc
theme: "startup-founder"
---

# Startup & Founder

Startup building, fundraising, and founder journey

## Core Concepts

- [[concepts/founder-mindset|Founder Mindset]] (35 insights)
- [[concepts/startup-growth|Startup Growth]] (27 insights)
- [[concepts/startup-strategy|Startup Strategy]] (19 insights)
- [[concepts/startup-culture|Startup Culture]] (14 insights)
- [[concepts/fundraising|Fundraising]] (10 insights)
- [[concepts/founder-led-sales|Founder Led Sales]] (10 insights)
- [[concepts/bootstrapping|Bootstrapping]] (8 insights)
- [[concepts/sales-pitch-framework|Sales Pitch Framework]] (7 insights)
- [[concepts/startup-mindset|Startup Mindset]] (7 insights)
- [[concepts/early-stage-startups|Early Stage Startups]] (7 insights)
- [[concepts/pitching|Pitching]] (7 insights)
- [[concepts/founder-motivation|Founder Motivation]] (5 insights)
- [[concepts/pivoting|Pivoting]] (4 insights)
- [[concepts/founder-dynamics|Founder Dynamics]] (4 insights)
- [[concepts/venture-funding|Venture Funding]] (3 insights)
- [[concepts/investor-relations|Investor Relations]] (3 insights)
- [[concepts/lean-startup|Lean Startup]] (3 insights)
- [[concepts/startup-failure|Startup Failure]] (3 insights)
- [[concepts/startup-journey|Startup Journey]] (3 insights)
- [[concepts/sales-pitching|Sales Pitching]] (3 insights)
- [[concepts/strategic-pivots|Strategic Pivots]] (2 insights)
- [[concepts/founder-leadership|Founder Leadership]] (2 insights)
- [[concepts/startup-within-a-company|Startup Within A Company]] (2 insights)
- [[concepts/startup-advice|Startup Advice]] (2 insights)
- [[concepts/startup-hiring|Startup Hiring]] (2 insights)
- [[concepts/founder-advice|Founder Advice]] (2 insights)
- [[concepts/founder-resilience|Founder Resilience]] (2 insights)
- [[concepts/pivots|Pivots]] (2 insights)
- [[concepts/venture-investing|Venture Investing]] (2 insights)
- [[concepts/venture-capital|Venture Capital]] (2 insights)

## All Insights

```dataview
TABLE WITHOUT ID
  file.link as "Insight",
  source_guest as "Guest"
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "startup"))
SORT file.name ASC
LIMIT 50
```
