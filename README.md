# GroundDocs Cli

GroundDocs is a version-aware documentation server that connects LLMs to trusted, real-time documentation sources—reducing hallucinations and ensuring accurate, version-specific responses during inference.

## 🚀 Installation

```bash
npx @grounddocs/cli@latest install <client>
```

**Supported clients:** cursor, windsurf, cline, claude, witsy, enconvo


## 🔧 Manual Installation

If you prefer manual setup, add GroundDocs to your IDE's MCP (Model Context Protocol) configuration:

```json
{
  "mcpServers": {
    "@grounddocs/grounddocs": {
      "command": "npx",
      "args": ["-y", "@grounddocs/grounddocs@latest", "API_KEY=\"your-api-key\""]
    }
  }
}
```
After configuration, restart your IDE for changes to take effect.


## 📚 Supported Libraries

Currently, GroundDocs supports:

- **Kubernetes**
- **Python Libraries**:
  - requests
  - pandas
  - numpy
  - scipy
  - scikit-learn
  - torch
  - transformers

## 🏗️ Architecture

GroundDocs consists of:
- **Local MCP server** (this repo) → lightweight, public, runs inference-time queries
- **Remote backend data repository** (private) → handles scraping, indexing, and heavy lifting

## 🌟 Example Queries

### Kubernetes Documentation

```
What changes were made to the kubectl command behavior in Kubernetes 1.26 regarding pruning during apply operations?
```
[View example response](https://claude.ai/share/b864ee23-4899-4092-bbd8-a020d55296a7)

### Python Libraries Documentation

```
How to use Python transformers pipeline features? What are in its API?
```
[View example response](https://claude.ai/share/30ed72c5-3cec-4e01-8ae2-e3d67edb29b5)

## 📚 Documentation

For more information on using GroundDocs, see our [documentation](https://github.com/grounddocs/grounddocs).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
