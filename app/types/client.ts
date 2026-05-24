/**
 * Client types
 * Based on ClientResource from backend
 */

export interface CategoryClient {
  id: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface Client {
  id: number
  id_client: string
  name: string
  phone: string
  address: string
  created_date?: string
  created_at?: string
  updated_at?: string
}

export interface ClientResponse {
  success: boolean
  message?: string
  data: {
    client: Client
  }
}

export interface ClientsResponse {
  success: boolean
  message?: string
  data: {
    clients: Client[]
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
      sort_direction: 'asc' | 'desc'
    }
  }
}

export interface ClientCreatePayload {
  name: string
  phone: string
  address: string
}

export interface ClientUpdatePayload extends Partial<ClientCreatePayload> {}

