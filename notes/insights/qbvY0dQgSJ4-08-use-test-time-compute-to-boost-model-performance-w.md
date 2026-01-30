---
type: insight
title: Use "test time compute" to boost model performance without retraining
concepts:
  - "model-inference"
  - "ai-application-performance"
  - "cost-optimization"
source_guest: Chip Huyen
source_episode: AI Engineering 101 with Chip Huyen (Nvidia, Stanford, Netflix)
source: "[[guests/chip-huyen|Chip Huyen]]"
---
Allocating more compute resources during [[concepts/model-inference|inference]], known as "test time compute," can significantly improve output quality without changing the base model. Strategies include generating multiple answers and choosing the best (self-consistency) or allowing the model to "think" longer by generating more reasoning tokens before a final answer.