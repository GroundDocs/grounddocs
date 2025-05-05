import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { groundDocsClient } from "../utils/http-client.js";

const PYTHON_DOCS_TOOL_NAME = "python_get_documentation";
const PYTHON_DOCS_TOOL_DESCRIPTION = `
Use this for every Python related query. Primary Python documentation lookup tool. 

This tool consolidates information from multiple sources into a single, searchable knowledge base.
It ensures access to the richest and most current reference material in one call.
`;

interface PythonDocResponse {
  results: Array<{
    path: string;
    content: string;
    url?: string;
  }>;
}

export class PythonDocumentationTool extends BaseTool {
  name = PYTHON_DOCS_TOOL_NAME;
  description = PYTHON_DOCS_TOOL_DESCRIPTION;

  schema = z.object({
    query: z.string().describe("A natural language question (e.g., \"How do I use transformers?\")."),
    library: z.string().describe("Python library to search documentation for."),
    version: z.string().optional().describe("Optional Library version (e.g., \"4.46.1\"). Defaults to detected library version if not specified."),
    top_k: z.number().optional().default(10).describe("Optional number of top matching documents to return. Defaults to 10."),
  });

  async execute({ query, library, version, top_k = 10 }: z.infer<typeof this.schema>) {
    try {
      const { data } = await groundDocsClient.post<PythonDocResponse>(
        "/api/python/documentation",
        {
          query,
          library,
          version,
          top_k
        }
      );

      // Format results as markdown
      let formattedResults = "";
      if (data.results && data.results.length > 0) {
        formattedResults = data.results.map((doc: { path: string; content: string; url?: string }) => {
          return `## ${doc.path || library + ' Documentation'}\n\n${doc.content}\n\n${doc.url ? `Source: ${doc.url}` : ''}`;
        }).join('\n\n---\n\n');
      } else {
        formattedResults = `No relevant documentation found for ${library}${version ? ` v${version}` : ''}.`;
      }

      return {
        content: [
          {
            type: "text" as const,
            text: formattedResults,
          },
        ],
      };
    } catch (error) {
      console.error(`Error fetching Python documentation for ${library}:`, error);
      throw error;
    }
  }
}
