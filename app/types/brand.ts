/**
 * Brand types
 * Based on BrandResource from backend
 */

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  status?: "ACTIVE" | "INACTIVE" | null;
  order?: number | null;
  description?: string | null;
  timestamps?: {
    created_at: string;
    updated_at: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface BrandResponse {
  success: boolean;
  message?: string;
  data: {
    brand: Brand;
  };
}

export interface BrandsResponse {
  success: boolean;
  data: {
    brands: Brand[];
    pagination?: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
      from: number | null;
      to: number | null;
    };
    sort?: {
      sort_by: string;
      sort_direction: string;
    };
  };
}

export interface BrandCreatePayload {
  name: string;
  slug: string;
  status?: "ACTIVE" | "INACTIVE";
  order?: number;
  description?: string;
  // logo is handled via FormData file upload, not included in JSON payload
}

export interface BrandUpdatePayload {
  name?: string;
  slug?: string;
  status?: "ACTIVE" | "INACTIVE";
  order?: number;
  description?: string;
  // logo is handled via FormData file upload, not included in JSON payload
}
