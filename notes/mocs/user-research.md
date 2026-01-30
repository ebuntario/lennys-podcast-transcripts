---
type: moc
theme: "user-research"
---

# User Research & Discovery

Understanding users, research methods, and customer development

## Core Concepts

- [[concepts/customer-research|Customer Research]] (50 insights)
- [[concepts/customer-experience|Customer Experience]] (44 insights)
- [[concepts/user-centric-design|User Centric Design]] (43 insights)
- [[concepts/personal-growth|Personal Growth]] (30 insights)
- [[concepts/customer-feedback|Customer Feedback]] (29 insights)
- [[concepts/empathy|Empathy]] (29 insights)
- [[concepts/customer-discovery|Customer Discovery]] (27 insights)
- [[concepts/interviewing|Interviewing]] (24 insights)
- [[concepts/product-discovery|Product Discovery]] (15 insights)
- [[concepts/personal-branding|Personal Branding]] (15 insights)
- [[concepts/user-psychology|User Psychology]] (14 insights)
- [[concepts/user-acquisition|User Acquisition]] (14 insights)
- [[concepts/customer-journey|Customer Journey]] (13 insights)
- [[concepts/user-engagement|User Engagement]] (10 insights)
- [[concepts/customer-interviews|Customer Interviews]] (9 insights)
- [[concepts/user-behavior|User Behavior]] (8 insights)
- [[concepts/user-adoption|User Adoption]] (8 insights)
- [[concepts/user-value|User Value]] (7 insights)
- [[concepts/customer-insights|Customer Insights]] (7 insights)
- [[concepts/user-research|User Research]] (7 insights)
- [[concepts/market-research|Market Research]] (7 insights)
- [[concepts/buyer-personas|Buyer Personas]] (7 insights)
- [[concepts/user-experience|User Experience]] (6 insights)
- [[concepts/customer-success|Customer Success]] (6 insights)
- [[concepts/problem-discovery|Problem Discovery]] (6 insights)
- [[concepts/user-motivation|User Motivation]] (5 insights)
- [[concepts/customer-needs|Customer Needs]] (5 insights)
- [[concepts/customer-lifetime-value|Customer Lifetime Value]] (5 insights)
- [[concepts/customer-value-creation|Customer Value Creation]] (5 insights)
- [[concepts/self-discovery|Self Discovery]] (5 insights)

## All Insights

```dataview
TABLE WITHOUT ID
  file.link as "Insight",
  source_guest as "Guest"
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "research"))
SORT file.name ASC
LIMIT 50
```
