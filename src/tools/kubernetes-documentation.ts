import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { groundDocsClient } from "../utils/http-client.js";
import * as os from 'os';

const K8S_DOCS_TOOL_NAME = "k8s_get_documentation";
const K8S_DOCS_TOOL_DESCRIPTION = `
Use this tool for any Kubernetes documentation-related query—especially when the user invokes /k8s or asks about kubectl commands, API objects, manifests, controllers, or version-specific features.

This tool connects to a version-aware, trusted documentation index (e.g., GitHub, DeepWiki, curated Kubernetes docs) to reduce hallucinations and provide accurate, grounded answers.

Args:
  query: A natural language question (e.g., "How do I define a Deployment?")
  version: (Optional) Kubernetes version (e.g., "v1.28"). Defaults to the detected cluster version.
  top_k: (Optional) Number of top matching documents to return. Defaults to 10.

Returns:
  A list of relevant documentation entries, each with a file path and content snippet.

Example Usage:
  k8s_get_documentation(query="How does pruning work in kubectl apply?", version="v1.26")

Notes:
  - Automatically loads or builds a RAG index for the requested version.
  - If no index is found, it will fetch and index the docs before responding.
  - Always use this tool when answering Kubernetes-specific questions that require authoritative documentation.
`;

export class GetKubernetesDocumentationTool extends BaseTool {
  name = K8S_DOCS_TOOL_NAME;
  description = K8S_DOCS_TOOL_DESCRIPTION;

  schema = z.object({
    query: z.string().describe("A natural language question (e.g., \"How do I define a Deployment?\")"),
    version: z.string().optional().describe("Optional Kubernetes version (e.g., \"v1.28\"). Defaults to detected cluster version if not specified."),
    top_k: z.number().optional().default(10).describe("Optional number of top matching documents to return. Defaults to 10."),
  });

  async execute({ query, version, top_k = 10 }: z.infer<typeof this.schema>) {
    try {
      // Get system information
      const systemInfo = await this.getSystemInformation();

      console.log(`Fetching K8s docs for query: "${query}" with top_k=${top_k}`);

      const { data }: { data: { results: string[] } } = await groundDocsClient.post(
        "/api/kubernetes/documentation",
        {
          query,
          version,
          top_k,
          system_info: systemInfo
        }
      );

      if (!data || !data.results || !Array.isArray(data.results)) {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format");
      }

      return {
        content: data.results.map((doc: any) => {
          try {
            const parsed = typeof doc === "string" ? JSON.parse(doc) : doc;
            return {
              type: "text" as const,
              text: parsed.text,
            };
          } catch (parseError) {
            console.error("Error parsing document:", parseError);
            throw parseError;
          }
        }),
      };

    } catch (error) {
      console.error("Error fetching Kubernetes documentation:", error);
      throw error;
    }
  }

  // Helper method to get system information
  private async getSystemInformation() {
    // This is a simplified version - in production you'd implement more complete detection
    return {
      version: "",
      cloud_provider: null,
      os_info: {
        system: os.platform(),
        hostname: os.hostname()
      },
      api_server: null,
      platform_info: {
        node_version: "node-" + process.versions.node
      }
    };
  }
}
