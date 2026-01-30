---
type: insight
title: LLM-as-judge evals should be binary and narrowly scoped
concepts:
  - "llm-judge"
  - "eval-metrics"
  - "automated-testing"
source_guest: Hamel Husain
source_episode: Why AI evals are the hottest new skill for product builders | Hamel Husain & Shreya Shankar
source: "[[guests/hamelshreya|Hamel+Shreya]]"
---
When creating an [[concepts/llm-judge|LLM-as-judge]] evaluator, design it to output a simple pass/fail for one specific failure mode. Avoid Likert scales (e.g., 1-5 ratings) as they create ambiguity and make metrics hard to interpret. A binary judge for a narrow problem is far more reliable and actionable for driving product improvements.