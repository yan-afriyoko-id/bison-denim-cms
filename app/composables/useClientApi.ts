/**
 * Client API composable
 * Handles all client-related API calls
 */
import type { ClientsResponse, ClientResponse, ClientCreatePayload, ClientUpdatePayload } from '~/types/client'

export const useClientApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  const getClients = async (
    page: number = 1,
    perPage: number = 15,
    sortBy?: string,
    sortDirection: 'asc' | 'desc' = 'desc'
  ) => {
    try {
      const response = await $fetch<ClientsResponse>(`${baseURL}/clients`, {
        method: 'GET',
        params: {
          page,
          per_page: perPage,
          ...(sortBy && { sort_by: sortBy }),
          sort_direction: sortDirection,
        },
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getClient = async (id: number) => {
    try {
      const response = await $fetch<ClientResponse>(`${baseURL}/clients/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const createClient = async (data: ClientCreatePayload) => {
    try {
      const response = await $fetch<ClientResponse>(`${baseURL}/clients`, {
        method: 'POST',
        body: data,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.data?.errors || {},
        },
      }
    }
  }

  const updateClient = async (id: number, data: ClientUpdatePayload) => {
    try {
      const response = await $fetch<ClientResponse>(`${baseURL}/clients/${id}`, {
        method: 'PUT',
        body: data,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.data?.errors || {},
        },
      }
    }
  }

  const deleteClient = async (id: number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>(`${baseURL}/clients/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getAllClients = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        data?: {
          clients: Array<{
            id: number
            id_client: string
            name: string
            phone: string
            address: string
            created_date?: string
            created_at?: string
            updated_at?: string
          }>
        }
      }>(`${baseURL}/clients/all`, {
        method: 'GET',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  return {
    getClients,
    getAllClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
  }
}

