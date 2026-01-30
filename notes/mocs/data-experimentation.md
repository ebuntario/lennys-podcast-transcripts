---
type: moc
theme: "data-experimentation"
---

# Data & Experimentation

Data-driven decisions, A/B testing, and metrics

## Core Concepts

- [[concepts/testing|Testing]] (81 insights)
- [[concepts/data-driven-decisions|Data Driven Decisions]] (34 insights)
- [[concepts/success-metrics|Success Metrics]] (23 insights)
- [[concepts/growth-metrics|Growth Metrics]] (14 insights)
- [[concepts/product-analytics|Product Analytics]] (13 insights)
- [[concepts/ai-training-data|Ai Training Data]] (12 insights)
- [[concepts/data-analysis|Data Analysis]] (12 insights)
- [[concepts/experimentation|Experimentation]] (12 insights)
- [[concepts/saas-metrics|Saas Metrics]] (10 insights)
- [[concepts/hypothesis-testing|Hypothesis Testing]] (8 insights)
- [[concepts/north-star-metric|North Star Metric]] (7 insights)
- [[concepts/growth-experimentation|Growth Experimentation]] (5 insights)
- [[concepts/business-metrics|Business Metrics]] (5 insights)
- [[concepts/performance-metrics|Performance Metrics]] (5 insights)
- [[concepts/metric-design|Metric Design]] (5 insights)
- [[concepts/data-quality|Data Quality]] (5 insights)
- [[concepts/product-metrics|Product Metrics]] (5 insights)
- [[concepts/data-strategy|Data Strategy]] (4 insights)
- [[concepts/product-experimentation|Product Experimentation]] (4 insights)
- [[concepts/assumption-testing|Assumption Testing]] (4 insights)
- [[concepts/a-b-testing|A B Testing]] (4 insights)
- [[concepts/user-testing|User Testing]] (3 insights)
- [[concepts/synthetic-data|Synthetic Data]] (3 insights)
- [[concepts/experimentation-platform|Experimentation Platform]] (3 insights)
- [[concepts/activation-metrics|Activation Metrics]] (3 insights)
- [[concepts/experimental-mindset|Experimental Mindset]] (3 insights)
- [[concepts/data-insights|Data Insights]] (3 insights)
- [[concepts/data-science|Data Science]] (3 insights)
- [[concepts/productivity-measurement|Productivity Measurement]] (3 insights)
- [[concepts/metrics-framework|Metrics Framework]] (3 insights)

## All Insights

```dataview
TABLE WITHOUT ID
  file.link as "Insight",
  source_guest as "Guest"
FROM "notes/insights"
WHERE any(concepts, (c) => contains(c, "data"))
SORT file.name ASC
LIMIT 50
```
