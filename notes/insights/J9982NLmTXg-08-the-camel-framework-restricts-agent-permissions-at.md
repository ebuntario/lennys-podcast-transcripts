---
type: insight
title: The CAMEL framework restricts agent permissions at runtime
concepts:
  - "permissioning"
  - "ai-agents"
  - "ai-security"
source_guest: "Sander Schulhoff"
source_episode: "Why securing AI is harder than anyone expected and guardrails are failing | HackAPrompt CEO"
source: "[[guests/sander-schulhoff-20|Sander Schulhoff 2.0]]"
---
The CAMEL framework is a promising defensive technique that analyzes a user's request and dynamically grants an AI agent only the specific permissions needed to fulfill that request. For example, if a user asks to "summarize my emails," the agent receives read-only access, preventing it from being tricked into sending malicious emails via [[concepts/prompt-injection|prompt injection]].