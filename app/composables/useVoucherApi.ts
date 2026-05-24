import type {
  PaginatedResponse,
  Voucher, 
  VoucherCategory
} from '~/types/voucher'
import { useRuntimeConfig } from '#imports'
import { useApiBase } from '~/composables/useApiBase'

export const useVoucherApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  const getVouchers = async (
    page: number = 1,
    perPage: number = 15,
  ) => {
    try {
      const response = await $fetch<PaginatedResponse<Voucher>>(`${baseURL}/vouchers`, {
        method: 'GET',
        params: { page, per_page: perPage },
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

  const getVoucher = async (id: number) => {
    try {
      const response = await $fetch<{ success: boolean; data: Voucher }>(`${baseURL}/vouchers/${id}`, {
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

  const getAllVouchers = async (
    page: number = 1,
    perPage: number = 15,
  ) => {
    try {
      const response = await $fetch<PaginatedResponse<Voucher>>(`${baseURL}/vouchers/all`, {
        method: 'GET',
        params: { page, per_page: perPage },
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

  const getAdminVoucher = async (id: number) => {
    try {
      const response = await $fetch<{ success: boolean; data: Voucher }>(`${baseURL}/vouchers/admin/${id}`, {
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

  const createVoucher = async (payload: Partial<Voucher>) => {
    try {
      const response = await $fetch<{ success: boolean; data: Voucher }>(`${baseURL}/vouchers`, {
        method: 'POST',
        body: payload,
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

  const updateVoucher = async (id: number, payload: Partial<Voucher>) => {
    try {
      const response = await $fetch<{ success: boolean; data: Voucher }>(`${baseURL}/vouchers/${id}`, {
        method: 'PUT',
        body: payload,
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

  const deleteVoucher = async (id: number) => {
    try {
      const response = await $fetch<{ success: boolean; message: string }>(`${baseURL}/vouchers/${id}`, {
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

  const getCategories = async () => {
    try {
      const response = await $fetch<{ success: boolean; data: VoucherCategory[] }>(
        `${baseURL}/categories/top`,
        { method: 'GET', headers: getHeaders() }
      )
      return { data: response.data, error: null }
    } catch (error: any) {
      return { data: null, error: error.data || { message: error.message || 'An error occurred' } }
    }
  }

  return {
    getVouchers,
    getAllVouchers,
    getVoucher,
    getAdminVoucher,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    getCategories,
  }
}
