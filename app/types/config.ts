/**
 * Config types
 * Based on ConfigResource from backend
 */

export interface Config {
  id?: number;
  key: string;
  value: string | number | boolean | null;
  value_image?: string | null;
  type?: "string" | "integer" | "boolean" | "json" | "text";
  description?: string;
  casted_value?: string | number | boolean | null;
  created_at?: string;
  updated_at?: string;
}

export interface ConfigResponse {
  success: boolean;
  message?: string;
  data: Config;
  errors?: Record<string, string[]>;
}

export interface ConfigsResponse {
  success: boolean;
  message?: string;
  data: Config[];
}

export interface ConfigUpdatePayload {
  value?: string | number | boolean | File;
  type?: "string" | "number" | "boolean" | "json" | "file";
  description?: string;
}
