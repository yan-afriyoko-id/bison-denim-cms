/**
 * Product types
 * Based on ProductResource from backend
 */

export interface ProductCategory {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductBrand {
  id: number;
  product_id: number;
  brand_id: number;
  name?: string | null;
  brand?: {
    id: number;
    name: string;
  };
}

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  sku?: string;
  price: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductPrice {
  id: number;
  product_id: number;
  price_type: string;
  price: number;
  min_quantity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  is_freeshiping?: "ACTIVE" | "INACTIVE";
  product_information?: string | null;
  material?: string | null;
  style?: string | null;
  color?: string | null;
  meta_keywords?: string | null;
  meta_description?: string | null;
  meta_title?: string | null;
  weight?: number | null;
  type_weight?: "GRAM" | "KG" | null;
  size?: string | null;
  size_long?: number | null;
  size_wide?: number | null;
  size_tall?: number | null;
  type_size?: "CM" | "M" | null;
  package_long?: number | null;
  package_wide?: number | null;
  package_tall?: number | null;
  sku?: string | null;
  base_price?: number | null;
  base_strike_price?: number | null;
  discount?: number | null;
  sort?: number | null;
  tags?: string | null;
  product_protection_percent?: number | null;
  status?: "PUBLISH" | "INACTIVE" | "DRAFT" | null;
  categories?: Array<{
    id: number;
    product_id: number;
    category_id: number;
    category_name?: string | null;
    category_slug?: string | null;
  }>;
  brands?: Array<{
    id: number;
    product_id: number;
    brand_id: number;
    name?: string | null;
    brand?: {
      id: number;
      name: string;
    };
  }>;
  variants?: Array<{
    id: number;
    color?: string | null;
    size?: string | null;
    model?: string | null;
    sku?: string | null;
    image_path?: string | null;
    stock?: number | null;
    discount?: number | null;
    price?: number | null;
    strike_price?: number | null;
    discount_percent?: number | null;
    final_price?: number | null;
    status: "ACTIVE" | "INACTIVE";
  }>;
  images?: Array<{
    id: number;
    path: string;
    order_number: number;
  }>;
  timestamps?: {
    created_at: string;
    updated_at: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface ProductResponse {
  success: boolean;
  message?: string;
  data: {
    product: Product;
  };
}

export interface ProductsResponse {
  success: boolean;
  message?: string;
  data: {
    products: Product[];
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

export interface ProductCreatePayload {
  name: string;
  slug: string;
  is_freeshiping?: "ACTIVE" | "INACTIVE";
  product_information?: string | null;
  material?: string | null;
  style?: string | null;
  color?: string | null;
  meta_keywords?: string | null;
  meta_description?: string | null;
  meta_title?: string | null;
  weight?: number | null;
  type_weight?: "GRAM" | "KG" | null;
  size?: string | null;
  size_long?: number | null;
  size_wide?: number | null;
  size_tall?: number | null;
  type_size?: "CM" | "M" | null;
  package_long?: number | null;
  package_wide?: number | null;
  package_tall?: number | null;
  sku?: string | null;
  base_price?: number | null;
  base_strike_price?: number | null;
  sort?: number | null;
  tags?: string | null;
  product_protection_percent?: number | null;
  status?: "PUBLISH" | "INACTIVE" | "DRAFT" | null;
}

export interface ProductUpdatePayload extends Partial<ProductCreatePayload> {}

export interface ProductVariantCreatePayload {
  name: string;
  sku?: string;
  price: number;
  is_active?: boolean;
}

export interface StoreVariantStock {
  id: number;
  variant_id: number;
  store_id: number;
  qty: number;
  reserved_qty: number;
  store?: {
    id: number;
    name: string;
    code?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface StoreVariantStockCreatePayload {
  store_id: number;
  qty: number;
  reserved_qty?: number;
}
