# GroundDocs

GroundDocs is a local, version-aware documentation server for AI models. It connects models to trusted, real-time documentation sources to reduce hallucinations and ensure accurate, grounded responses during inference.

🔍 What It Does
- Queries official, version-specific documentation for Kubernetes and Python libraries
- Runs locally — no API key or internet connection required after setup
- Returns clean, source-grounded content for use in LLM prompts

GroundDocs consists of:
- Local MCP server (this repo) → lightweight, public, runs inference-time queries
- Remote backend (private) → handles scraping, indexing, and heavy lifting

