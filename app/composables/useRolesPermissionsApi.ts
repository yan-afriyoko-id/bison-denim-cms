/**
 * Roles & Permissions API composable
 * Handles all roles and permissions-related API calls
 */
import type { RolesResponse, RoleResponse, RoleCreatePayload, RoleUpdatePayload, PermissionsResponse, PermissionResponse, PermissionsGroupedResponse, PermissionCreatePayload, PermissionUpdatePayload } from '~/types/role'

export const useRolesPermissionsApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  // ============= ROLES API =============

  const getRoles = async (perPage: number = 15) => {
    try {
      const response = await $fetch<RolesResponse>(`${baseURL}/roles`, {
        method: 'GET',
        params: { per_page: perPage },
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

  const getRole = async (id: number) => {
    try {
      const response = await $fetch<RoleResponse>(`${baseURL}/roles/${id}`, {
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

  const createRole = async (payload: RoleCreatePayload) => {
    try {
      const response = await $fetch<RoleResponse>(`${baseURL}/roles`, {
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

  const updateRole = async (id: number, payload: RoleUpdatePayload) => {
    try {
      const response = await $fetch<RoleResponse>(`${baseURL}/roles/${id}`, {
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

  const deleteRole = async (id: number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>(`${baseURL}/roles/${id}`, {
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

  // ============= PERMISSIONS API =============

  const getAllPermissions = async () => {
    try {
      const response = await $fetch<PermissionsResponse>(`${baseURL}/permissions/all`, {
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

  const getPermissionsGrouped = async () => {
    try {
      const response = await $fetch<PermissionsGroupedResponse>(`${baseURL}/permissions/grouped`, {
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

  const getPermission = async (id: number) => {
    try {
      const response = await $fetch<PermissionResponse>(`${baseURL}/permissions/${id}`, {
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

  const createPermission = async (payload: PermissionCreatePayload) => {
    try {
      const response = await $fetch<PermissionResponse>(`${baseURL}/permissions`, {
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

  const updatePermission = async (id: number, payload: PermissionUpdatePayload) => {
    try {
      const response = await $fetch<PermissionResponse>(`${baseURL}/permissions/${id}`, {
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

  const deletePermission = async (id: number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>(`${baseURL}/permissions/${id}`, {
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
    // Roles
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
    // Permissions
    getAllPermissions,
    getPermissionsGrouped,
    getPermission,
    createPermission,
    updatePermission,
    deletePermission,
  }
}

