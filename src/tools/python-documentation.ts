import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { groundDocsClient } from "../utils/http-client.js";

const PYTHON_DOCS_TOOL_NAME = "python_get_documentation";
const PYTHON_DOCS_TOOL_DESCRIPTION = `
Use this for every Python related query. Primary Python documentation lookup tool. 

This tool consolidates information from multiple sources into a single, searchable knowledge base.
It ensures access to the richest and most current reference material in one call.
`;

export class GetPythonDocumentationTool extends BaseTool {
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
      console.log(`Fetching Python docs for library: "${library}", query: "${query}" with top_k=${top_k}`);

      const { data }: { data: { results: string[] } } = await groundDocsClient.post(
        "/api/python/documentation",
        {
          query,
          library,
          version,
          top_k
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
      console.error(`Error fetching Python documentation for ${library}:`, error);
      throw error;
    }
  }
}
