import { config } from "./config.js";
import chalk from "chalk";

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

interface ErrorDetail {
  error: string;
  message?: string;
  free_quota_used?: boolean;
  monthly_quota_used?: boolean;
  upgrade_url?: string;
}

export class GroundDocsError extends Error {
  public status: number;
  public detail: ErrorDetail | string;
  
  constructor(status: number, detail: ErrorDetail | string) {
    const message = typeof detail === 'string' ? detail : detail.message || detail.error;
    super(message);
    this.name = 'GroundDocsError';
    this.status = status;
    this.detail = detail;
  }
  
  isFreeQuotaExceeded(): boolean {
    return this.status === 429 && 
           typeof this.detail === 'object' && 
           this.detail.free_quota_used === true;
  }
  
  isMonthlyQuotaExceeded(): boolean {
    return this.status === 429 && 
           typeof this.detail === 'object' && 
           this.detail.monthly_quota_used === true;
  }
  
  getUpgradeUrl(): string | null {
    if (typeof this.detail === 'object' && this.detail.upgrade_url) {
      return this.detail.upgrade_url;
    }
    return null;
  }
  
  getUserFriendlyMessage(): string {
    if (typeof this.detail === 'object') {
      return this.detail.message || this.detail.error || this.message;
    }
    return this.message;
  }
}

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

    console.log(chalk.dim(`Making ${method} request to ${endpoint}${GROUND_DOCS_API_KEY ? ' (with API key)' : ' (free tier)'}`));

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        method,
        headers,
        ...(data ? { body: JSON.stringify(data) } : {}),
      });

      console.log(chalk.dim(`Response status: ${response.status}`));
      
      // Check if response is ok (status 200-299)
      if (!response.ok) {
        let errorDetail: ErrorDetail | string;
        
        try {
          // Try to parse JSON error response
          const errorJson = await response.json();
          errorDetail = errorJson.detail || errorJson;
        } catch (parseError) {
          // If JSON parsing fails, use response text
          errorDetail = await response.text() || `HTTP ${response.status} Error`;
        }
        
        const error = new GroundDocsError(response.status, errorDetail);
        
        // Log clean, user-friendly messages with colors
        if (error.isFreeQuotaExceeded()) {
          console.log(chalk.yellow("⚠️  Free tier limit reached"));
          console.log(chalk.white(error.getUserFriendlyMessage()));
          if (error.getUpgradeUrl()) {
            console.log(chalk.blue(`🔗 Upgrade at: ${error.getUpgradeUrl()}`));
          }
        } else if (error.isMonthlyQuotaExceeded()) {
          console.log(chalk.yellow("⚠️  Monthly quota exceeded"));
          console.log(chalk.white(error.getUserFriendlyMessage()));
          if (error.getUpgradeUrl()) {
            console.log(chalk.blue(`🔗 Upgrade at: ${error.getUpgradeUrl()}`));
          }
        } else {
          console.log(chalk.red(`❌ Request failed (${response.status}): ${error.getUserFriendlyMessage()}`));
        }
        
        throw error;
      }
      
      return { status: response.status, data: (await response.json()) as T };
    } catch (error) {
      // If it's already a GroundDocsError, re-throw it
      if (error instanceof GroundDocsError) {
        throw error;
      }
      
      // For network or other errors, create a generic error
      console.log(chalk.red("❌ Network error:"), error);
      throw new GroundDocsError(500, "Network error: Unable to connect to GroundDocs API");
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