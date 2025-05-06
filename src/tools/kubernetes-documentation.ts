import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { groundDocsClient } from "../utils/http-client.js";
import * as os from 'os';

const K8S_DOCS_TOOL_NAME = "k8s_get_documentation";
const K8S_DOCS_TOOL_DESCRIPTION = `
   Primary Kubernetes documentation lookup tool. Use this for every kubernetes documentation-related query.

    This tool consolidates information from multiple sources—including GitHub, DeepWiki, and curated
    Kubernetes documentation—into a single, searchable knowledge base. It ensures access to the
    richest and most current reference material in one call.

    Args:
        query: A natural language question (e.g., "How do I define a Deployment?").
        version: Optional Kubernetes version (e.g., "v1.28"). Defaults to detected cluster version if not specified.
        top_k: Optional number of top matching documents to return. Defaults to 10.

    Returns:
        A list of dictionaries, each containing document path and corresponding content.

    Example Usage:
        # Search Kubernetes docs for StatefulSets
        k8s_get_documentation(query="what is a StatefulSet", version="v1.28")

    Notes:
        - This tool automatically loads or builds a RAG (Retrieval-Augmented Generation) index for the
          specified Kubernetes version.
        - If an index is not found locally, the tool will fetch and index the documentation before responding.
        - You should call this function for any question that needs project documentation context.
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
