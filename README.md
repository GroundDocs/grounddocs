# GroundDocs
Just do this

```
npx @grounddocs/cli@latest install <client>

Supported clients: cursor, windsurf, cline, claude, witsy, enconvo
```
And now our MCP server is installed!

GroundDocs is a version-aware documentation MCP server for LLMs. It connects LLMs to trusted, real-time documentation sources to reduce hallucinations and ensure accurate, grounded responses during inference.

🔍 What It Does
- Queries official, version-specific documentation for Kubernetes and Python libraries
- Locally pinpoints relevant package versions for precise retrieval
- Retrieves clean, source-grounded content directly from the GroundDocs data repository

GroundDocs consists of:
- Local MCP server (this repo) → lightweight, public, runs inference-time queries
- Remote backend data repository (private) → handles scraping, indexing, and heavy lifting

