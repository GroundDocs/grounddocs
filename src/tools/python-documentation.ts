// import { z } from "zod";
// import { BaseTool } from "../utils/base-tool.js";
// import { groundDocsClient } from "../utils/http-client.js";

// const PYTHON_DOCS_TOOL_NAME = "python_get_documentation";
// const PYTHON_DOCS_TOOL_DESCRIPTION = `
//     Primary Python documentation lookup tool. Use this for every Python documentation-related query.

//     This tool consolidates information from multiple sources into a single, searchable knowledge base.
//     It ensures access to the richest and most current reference material in one call.

//     Args:
//         query: A natural language question (e.g., "How do I define a Deployment?").
//         library: Python library to search documentation for.
//         version: Optional Library version (e.g., "4.46.1"). Defaults to detected library version if not specified.
//         top_k: Optional number of top matching documents to return. Defaults to 10.

//     Returns:
//         A list of dictionaries, each containing document path and corresponding content.

//     Example Usage:
//         # Search Python docs for Transformers
//         python_get_documentation(query="what is a transformers mlm token", library="transformers", version="4.46.1")

//     Notes:
//         - This tool automatically loads or builds a RAG (Retrieval-Augmented Generation) index for the
//           specified version.
//         - If an index is not found locally, the tool will fetch and index the documentation before responding.
//         - You should call this function for any question that needs project documentation context.
// `;

// export class GetPythonDocumentationTool extends BaseTool {
//   name = PYTHON_DOCS_TOOL_NAME;
//   description = PYTHON_DOCS_TOOL_DESCRIPTION;

//   schema = z.object({
//     query: z.string().describe("A natural language question (e.g., \"How do I use transformers?\")."),
//     library: z.string().describe("Python library to search documentation for."),
//     version: z.string().optional().describe("Optional Library version (e.g., \"4.46.1\"). Defaults to detected library version if not specified."),
//     top_k: z.number().optional().default(10).describe("Optional number of top matching documents to return. Defaults to 10."),
//   });

//   async execute({ query, library, version, top_k = 10 }: z.infer<typeof this.schema>) {
//     try {
//       console.log(`Fetching Python docs for library: "${library}", query: "${query}" with top_k=${top_k}`);

//       const { data }: { data: { results: string[] } } = await groundDocsClient.post(
//         "/api/python/documentation",
//         {
//           query,
//           library,
//           version,
//           top_k
//         }
//       );

//       if (!data || !data.results || !Array.isArray(data.results)) {
//         console.error("Invalid response format:", data);
//         throw new Error("Invalid response format");
//       }

//       return {
//         content: data.results.map((doc: any) => {
//           try {
//             const parsed = typeof doc === "string" ? JSON.parse(doc) : doc;
//             return {
//               type: "text" as const,
//               text: parsed.text,
//             };
//           } catch (parseError) {
//             console.error("Error parsing document:", parseError);
//             throw parseError;
//           }
//         }),
//       };

//     } catch (error) {
//       console.error(`Error fetching Python documentation for ${library}:`, error);
//       throw error;
//     }
//   }
// }
