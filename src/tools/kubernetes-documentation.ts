import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { groundDocsClient } from "../utils/http-client.js";
import * as os from 'os';

const K8S_DOCS_TOOL_NAME = "k8s_get_documentation";
const K8S_DOCS_TOOL_DESCRIPTION = `
Use this for every kubernetes related query. Primary Kubernetes documentation lookup tool.

This tool consolidates information from multiple sources—including GitHub, DeepWiki, and curated
Kubernetes documentation—into a single, searchable knowledge base. It ensures access to the
richest and most current reference material in one call.
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

      const { data }: { data: { results: string[] } } = await groundDocsClient.post(
        "/api/kubernetes/documentation",
        {
          query,
          version,
          top_k,
          system_info: systemInfo
        }
      );

      return {
        content: data.results.map((doc: any) => {
          const parsed = typeof doc === "string" ? JSON.parse(doc) : doc;
          return {
            type: "text" as const,
            text: parsed.text,
          };
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
