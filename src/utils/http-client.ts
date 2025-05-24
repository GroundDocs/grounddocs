import { config } from "./config.js";

// Polyfill fetch for Node.js environments
// @ts-ignore
if (typeof fetch === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  globalThis.fetch = require('node-fetch');
}

const GROUND_DOCS_API_KEY =
  config.apiKey || process.env.GROUND_DOCS_API_KEY || process.env.API_KEY;

// const isTesting = process.env.DEBUG === "true" ? true : false;
// export const BASE_URL = isTesting
//   ? "http://localhost:8000"
//   : "https://grounddocs.onrender.com";

export const BASE_URL = "https://grounddocs.onrender.com";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface HttpClient {
  get<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<{ status: number; data: T }>;
  post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<{ status: number; data: T }>;
  put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<{ status: number; data: T }>;
  delete<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<{ status: number; data: T }>;
  patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<{ status: number; data: T }>;
}

const createMethod = (method: HttpMethod) => {
  return async <T>(
    endpoint: string,
    data?: unknown,
    options: RequestInit = {}
  ) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(GROUND_DOCS_API_KEY ? { "x-api-key": GROUND_DOCS_API_KEY } : {}),
      ...options.headers,
    };

    console.log("BASE_URL", BASE_URL);

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        method,
        headers,
        ...(data ? { body: JSON.stringify(data) } : {}),
      });

      console.log("response", response);
      
      // Check if response is ok (status 200-299)
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP Error ${response.status}: ${errorText}`);
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
      }
      return { status: response.status, data: (await response.json()) as T };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };
};

export const groundDocsClient: HttpClient = {
  get: createMethod("GET"),
  post: createMethod("POST"),
  put: createMethod("PUT"),
  delete: createMethod("DELETE"),
  patch: createMethod("PATCH"),
};