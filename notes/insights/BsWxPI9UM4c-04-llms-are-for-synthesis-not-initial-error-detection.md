---
type: insight
title: LLMs are for synthesis, not initial error detection
concepts:
  - "llm-applications"
  - "error-analysis"
  - "human-in-the-loop"
source_guest: Shreya Shankar
source_episode: Why AI evals are the hottest new skill for product builders | Hamel Husain & Shreya Shankar
source: "[[guests/hamelshreya|Hamel+Shreya]]"
---
Do not use an LLM to perform the initial [[concepts/error-analysis|error analysis]] on traces. LLMs lack the product context to identify subtle failures or "product smells." Instead, use them later to synthesize your manual open codes into categories (axial codes), which dramatically speeds up the organization of your findings.