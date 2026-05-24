/**
 * User Management API composable
 * Handles all user management-related API calls
 */
import type { UsersResponse, AllUsersResponse, UserResponse, UserCreatePayload, UserUpdatePayload } from '~/types/user'

export const useUserManagementApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  const getUsers = async (filters?: {
    search?: string
    role?: string
    status?: string
    page?: number
    per_page?: number
  }) => {
    try {
      const params: Record<string, any> = {}
      if (filters?.search) params.search = filters.search
      if (filters?.role) params.role = filters.role
      if (filters?.status) params.status = filters.status
      if (filters?.page) params.page = filters.page
      if (filters?.per_page) params.per_page = filters.per_page

      const response = await $fetch<UsersResponse>(`${baseURL}/user-management`, {
        method: 'GET',
        params,
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

  const getUser = async (id: number) => {
    try {
      const response = await $fetch<UserResponse>(`${baseURL}/user-management/${id}`, {
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

  const createUser = async (payload: UserCreatePayload) => {
    try {
      const response = await $fetch<UserResponse>(`${baseURL}/user-management`, {
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

  const updateUser = async (id: number, payload: UserUpdatePayload) => {
    try {
      const response = await $fetch<UserResponse>(`${baseURL}/user-management/${id}`, {
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

  const deleteUser = async (id: number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>(`${baseURL}/user-management/${id}`, {
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

  const assignRole = async (userId: number, role: string) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data?: any
      }>(`${baseURL}/user-management/${userId}/assign-role`, {
        method: 'POST',
        body: { role },
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

  const removeRole = async (userId: number, role: string) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data?: any
      }>(`${baseURL}/user-management/${userId}/remove-role`, {
        method: 'POST',
        body: { role },
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

  const getAllRoles = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data?: any[]
      }>(`${baseURL}/user-management/roles/all`, {
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

  const getAllUsers = async (role?: string) => {
    try {
      const params: Record<string, string> = {}
      if (role) {
        params.role = role
      }
      
      const response = await $fetch<AllUsersResponse>(`${baseURL}/users/all`, {
        method: 'GET',
        headers: getHeaders(),
        params,
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

  const verifyEmail = async (userId: number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data?: any
      }>(`${baseURL}/user-management/${userId}/verify-email`, {
        method: 'POST',
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
    getUsers,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    assignRole,
    removeRole,
    getAllRoles,
    verifyEmail,
  }
}

