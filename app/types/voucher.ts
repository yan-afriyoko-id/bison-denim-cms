/**
 * Voucher types
 * Based on VoucherResource from backend
 */

export interface VoucherCategory {
  id: number;
  taxonomy_name: string;
  taxonomy_slug?: string;
  taxonomy_description?: string;
  parent?: number | null;
  taxonomy_status?: "ACTIVE" | "INACTIVE";
  created_at?: string;
  updated_at?: string;
}

export interface Voucher {
  id: number;
  name: string;
  code: string;
  description?: string | null;
  status?: "ACTIVE" | "INACTIVE" | "DRAFT" | null;
  limit_user?: number | null;
  voucher_used?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  fk_category_id?: number[] | null;
  discount_type?: "PERCENTAGE" | "FIXED" | string | null;
  discount_value?: number | null;
  min_purchase?: number | null;
  is_published: true;
  categories?: VoucherCategory[];
  timestamps?: {
    created_at: string;
    updated_at: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface VoucherResponse {
  success: boolean;
  message?: string;
  data: {
    voucher: Voucher;
  };
}

export interface VouchersResponse {
  success: boolean;
  message?: string;
  data: {
    vouchers: Voucher[];
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
      sort_direction: "asc" | "desc";
    };
  };
}

export interface VoucherCreatePayload {
  name: string;
  code: string;
  description?: string | null;
  status?: "ACTIVE" | "INACTIVE" | "DRAFT" | null;
  limit_user?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  min_purchase?: number | null;
  is_published: true;
  fk_category_id?: number[] | null;
  discount_type?: "PERCENTAGE" | "FIXED" | string | null;
  discount_value?: number | null;
}

export interface VoucherUpdatePayload extends Partial<VoucherCreatePayload> {}
