/**
 * Store types
 * Based on StoreResource from backend
 */

export interface Store {
  id: number
  name: string
  code?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  city?: string | null
  province?: string | null
  country?: string | null
  postal_code?: string | null
  status?: 'ACTIVE' | 'INACTIVE' | null
  description?: string | null
  products?: Array<{
    id: number
    name: string
    slug: string
    status: string
  }>
  timestamps?: {
    created_at: string
    updated_at: string
  }
  created_at?: string
  updated_at?: string
}

export interface StoreResponse {
  success: boolean
  message?: string
  data: {
    store: Store
  }
}

export interface StoresResponse {
  success: boolean
  data: {
    stores: Store[]
    pagination?: {
      current_page: number
      per_page: number
      total: number
      last_page: number
      from: number | null
      to: number | null
    }
    sort?: {
      sort_by: string
      sort_direction: string
    }
  }
}

export interface StoreCreatePayload {
  name: string
  code?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  province?: string
  country?: string
  postal_code?: string
  status?: 'ACTIVE' | 'INACTIVE'
  description?: string
  product_ids?: number[]
}

export interface StoreUpdatePayload {
  name?: string
  code?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  province?: string
  country?: string
  postal_code?: string
  status?: 'ACTIVE' | 'INACTIVE'
  description?: string
  product_ids?: number[]
}

