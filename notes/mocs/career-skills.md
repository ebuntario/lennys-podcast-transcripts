---
type: moc
theme: "career-skills"
---

# Career & Skills

Career development, skill building, and professional growth

## Core Concepts

- [[concepts/professional-growth|Professional Growth]] (134 insights)
- [[concepts/product-development|Product Development]] (105 insights)
- [[concepts/skill-development|Skill Development]] (65 insights)
- [[concepts/product-led-growth|Product Led Growth]] (54 insights)
- [[concepts/learning|Learning]] (31 insights)
- [[concepts/personal-growth|Personal Growth]] (30 insights)
- [[concepts/feedback|Feedback]] (30 insights)
- [[concepts/customer-feedback|Customer Feedback]] (29 insights)
- [[concepts/startup-growth|Startup Growth]] (27 insights)
- [[concepts/leadership-development|Leadership Development]] (25 insights)
- [[concepts/career-development|Career Development]] (22 insights)
- [[concepts/growth-loops|Growth Loops]] (19 insights)
- [[concepts/feedback-loops|Feedback Loops]] (16 insights)
- [[concepts/growth-metrics|Growth Metrics]] (14 insights)
- [[concepts/career-transitions|Career Transitions]] (14 insights)
- [[concepts/feedback-culture|Feedback Culture]] (14 insights)
- [[concepts/career-advice|Career Advice]] (14 insights)
- [[concepts/strategic-growth-management|Strategic Growth Management]] (12 insights)
- [[concepts/qualitative-feedback|Qualitative Feedback]] (12 insights)
- [[concepts/communication-skills|Communication Skills]] (11 insights)
- [[concepts/talent-development|Talent Development]] (10 insights)
- [[concepts/product-manager-skills|Product Manager Skills]] (7 insights)
- [[concepts/listening-skills|Listening Skills]] (6 insights)
- [[concepts/organic-growth|Organic Growth]] (6 insights)
- [[concepts/ai-development|Ai Development]] (6 insights)
- [[concepts/product-management-skills|Product Management Skills]] (6 insights)
- [[concepts/reinforcement-learning|Reinforcement Learning]] (6 insights)
- [[concepts/business-development|Business Development]] (6 insights)
- [[concepts/career-alignment|Career Alignment]] (5 insights)
- [[concepts/early-stage-growth|Early Stage Growth]] (5 insights)

## All Insights

```dataview
TABLE WITHOUT ID
  file.link as "Insight",
  source_guest as "Guest"
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "career"))
SORT file.name ASC
LIMIT 50
```
