---
type: moc
theme: "communication-influence"
---

# Communication & Influence

Communication skills, storytelling, and stakeholder management

## Core Concepts

- [[concepts/team-communication|Team Communication]] (97 insights)
- [[concepts/persuasion|Persuasion]] (20 insights)
- [[concepts/communication|Communication]] (18 insights)
- [[concepts/vision-communication|Vision Communication]] (14 insights)
- [[concepts/internal-communication|Internal Communication]] (11 insights)
- [[concepts/communication-skills|Communication Skills]] (11 insights)
- [[concepts/writing|Writing]] (9 insights)
- [[concepts/negotiation|Negotiation]] (9 insights)
- [[concepts/leadership-communication|Leadership Communication]] (5 insights)
- [[concepts/strategic-communication|Strategic Communication]] (5 insights)
- [[concepts/visual-communication|Visual Communication]] (4 insights)
- [[concepts/executive-communication|Executive Communication]] (4 insights)
- [[concepts/stakeholder-buy-in|Stakeholder Buy In]] (4 insights)
- [[concepts/asynchronous-communication|Asynchronous Communication]] (4 insights)
- [[concepts/influencer-marketing|Influencer Marketing]] (3 insights)
- [[concepts/communication-tools|Communication Tools]] (3 insights)
- [[concepts/storytelling|Storytelling]] (3 insights)
- [[concepts/product-communication|Product Communication]] (2 insights)
- [[concepts/sales-negotiation|Sales Negotiation]] (2 insights)
- [[concepts/subconscious-communication|Subconscious Communication]] (2 insights)
- [[concepts/professional-communication|Professional Communication]] (2 insights)
- [[concepts/business-communication|Business Communication]] (2 insights)
- [[concepts/career-communication|Career Communication]] (2 insights)
- [[concepts/customer-communication|Customer Communication]] (2 insights)
- [[concepts/value-communication|Value Communication]] (2 insights)
- [[concepts/direct-communication|Direct Communication]] (2 insights)
- [[concepts/product-presentation|Product Presentation]] (1 insights)
- [[concepts/win-win-negotiation|Win Win Negotiation]] (1 insights)
- [[concepts/communication-ownership|Communication Ownership]] (1 insights)
- [[concepts/persuasion-sequence|Persuasion Sequence]] (1 insights)

## All Insights

```dataview
TABLE WITHOUT ID
  file.link as "Insight",
  source_guest as "Guest"
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "communication"))
SORT file.name ASC
LIMIT 50
```
