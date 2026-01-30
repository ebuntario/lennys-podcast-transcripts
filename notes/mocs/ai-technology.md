---
type: moc
theme: "ai-technology"
---

# AI & Technology

AI, machine learning, and emerging technology

## Core Concepts

- [[concepts/ai-agents|Ai Agents]] (20 insights)
- [[concepts/ai-evaluation|Ai Evaluation]] (19 insights)
- [[concepts/ai-security|Ai Security]] (13 insights)
- [[concepts/automation|Automation]] (12 insights)
- [[concepts/ai-adoption|Ai Adoption]] (12 insights)
- [[concepts/ai-training-data|Ai Training Data]] (12 insights)
- [[concepts/engineering-culture|Engineering Culture]] (12 insights)
- [[concepts/fundraising|Fundraising]] (10 insights)
- [[concepts/ai-training|Ai Training]] (9 insights)
- [[concepts/model-training|Model Training]] (9 insights)
- [[concepts/paid-acquisition|Paid Acquisition]] (8 insights)
- [[concepts/ai-productivity|Ai Productivity]] (8 insights)
- [[concepts/ai-tools|Ai Tools]] (7 insights)
- [[concepts/ai-applications|Ai Applications]] (7 insights)
- [[concepts/ai-strategy|Ai Strategy]] (6 insights)
- [[concepts/ai-development|Ai Development]] (6 insights)
- [[concepts/prompt-engineering|Prompt Engineering]] (6 insights)
- [[concepts/ai-skills|Ai Skills]] (5 insights)
- [[concepts/ai-pricing|Ai Pricing]] (5 insights)
- [[concepts/domain-expertise|Domain Expertise]] (5 insights)
- [[concepts/prompt-injection|Prompt Injection]] (5 insights)
- [[concepts/constraints|Constraints]] (5 insights)
- [[concepts/ai-impact|Ai Impact]] (4 insights)
- [[concepts/ai-interaction|Ai Interaction]] (4 insights)
- [[concepts/machine-learning|Machine Learning]] (4 insights)
- [[concepts/ai-ux|Ai Ux]] (4 insights)
- [[concepts/ai-integration|Ai Integration]] (3 insights)
- [[concepts/personality-traits|Personality Traits]] (3 insights)
- [[concepts/sustainability|Sustainability]] (3 insights)
- [[concepts/ai-era-skills|Ai Era Skills]] (3 insights)

## All Insights

```dataview
TABLE WITHOUT ID
  file.link as "Insight",
  source_guest as "Guest"
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "ai"))
SORT file.name ASC
LIMIT 50
```
