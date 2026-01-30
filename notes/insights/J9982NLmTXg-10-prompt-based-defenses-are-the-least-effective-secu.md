---
type: insight
title: Prompt-based defenses are the least effective security measure
concepts:
  - "prompt-engineering"
  - "ai-security"
  - "prompt-injection"
source_guest: "Sander Schulhoff"
source_episode: "Why securing AI is harder than anyone expected and guardrails are failing | HackAPrompt CEO"
source: "[[guests/sander-schulhoff-20|Sander Schulhoff 2.0]]"
---
Adding instructions like "don't follow malicious requests" to a system prompt is a highly ineffective defense against [[concepts/prompt-injection|prompt injection]]. This method has been proven unreliable since early 2023, as attackers can easily craft prompts that cause the model to ignore those embedded instructions.