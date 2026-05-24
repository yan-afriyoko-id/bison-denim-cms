/**
 * Store API composable
 * Handles all store-related API calls
 */
import type { StoresResponse, StoreResponse, StoreCreatePayload, StoreUpdatePayload } from '~/types/store'

export const useStoreApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  const getStores = async (
    page: number = 1,
    perPage: number = 15,
    sortBy?: string,
    sortDirection: 'asc' | 'desc' = 'desc'
  ) => {
    try {
      const response = await $fetch<StoresResponse>(`${baseURL}/stores`, {
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

  const getAllStores = async () => {
    try {
      const response = await $fetch<StoresResponse>(`${baseURL}/stores/all`, {
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

  const getStore = async (id: number) => {
    try {
      const response = await $fetch<StoreResponse>(`${baseURL}/stores/${id}`, {
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

  const createStore = async (data: StoreCreatePayload) => {
    try {
      const response = await $fetch<StoreResponse>(`${baseURL}/stores`, {
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

  const updateStore = async (id: number, data: StoreUpdatePayload) => {
    try {
      const response = await $fetch<StoreResponse>(`${baseURL}/stores/${id}`, {
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

  const deleteStore = async (id: number) => {
    try {
      const response = await $fetch<{ success: boolean; message?: string }>(`${baseURL}/stores/${id}`, {
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

  return {
    getStores,
    getAllStores,
    getStore,
    createStore,
    updateStore,
    deleteStore,
  }
}

