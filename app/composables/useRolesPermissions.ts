import type { Role, Permission } from '~/types/role'

export const useRolesPermissions = () => {
  const {
    getRoles: getRolesApi,
    getRole: getRoleApi,
    createRole: createRoleApi,
    updateRole: updateRoleApi,
    deleteRole: deleteRoleApi,
    getAllPermissions: getAllPermissionsApi,
    getPermissionsGrouped: getPermissionsGroupedApi,
    getPermission: getPermissionApi,
    createPermission: createPermissionApi,
    updatePermission: updatePermissionApi,
    deletePermission: deletePermissionApi,
  } = useRolesPermissionsApi()

  // State
  const roles = ref<Role[]>([])
  const permissions = ref<Permission[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)

  const normalizeRoles = (data: Role[] | { roles: Role[]; pagination?: unknown } | undefined): Role[] => {
    if (Array.isArray(data)) {
      return data
    }

    return data?.roles ?? []
  }

  const normalizePermissions = (
    data: Permission[] | { permissions: Permission[] } | undefined
  ): Permission[] => {
    if (Array.isArray(data)) {
      return data
    }

    return data?.permissions ?? []
  }

  // Clear messages
  const clearMessages = () => {
    error.value = null
    success.value = null
  }

  // ============= ROLES API =============

  /**
   * Get all roles with pagination
   */
  const fetchRoles = async (perPage = 15) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getRolesApi(perPage)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch roles'
        error.value = message
        console.error(message)
        return null
      }

      roles.value = normalizeRoles(response.data)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching roles'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get single role
   */
  const fetchRoleById = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getRoleApi(id)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch role'
        error.value = message
        console.error(message)
        return null
      }

      return response.data || response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching role'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create new role
   */
  const createRole = async (payload: { name: string; description: string; permissions?: number[] }) => {
    try {
      isLoading.value = true
      clearMessages()

      const { data: response, error: apiError } = await createRoleApi(payload)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to create role'
        error.value = message
        console.error(message)
        return null
      }

      success.value = 'Role created successfully'
      await fetchRoles()
      return response.data || response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating role'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update role
   */
  const updateRole = async (id: number, payload: { name?: string; description?: string; permissions?: number[] }) => {
    try {
      isLoading.value = true
      clearMessages()

      const { data: response, error: apiError } = await updateRoleApi(id, payload)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to update role'
        error.value = message
        console.error(message)
        return null
      }

      success.value = 'Role updated successfully'
      await fetchRoles()
      return response.data || response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating role'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete role
   */
  const deleteRole = async (id: number) => {
    try {
      isLoading.value = true
      clearMessages()

      const { data: response, error: apiError } = await deleteRoleApi(id)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to delete role'
        error.value = message
        console.error(message)
        return false
      }

      success.value = 'Role deleted successfully'
      await fetchRoles()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting role'
      error.value = message
      console.error(message)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // ============= PERMISSIONS API =============

  /**
   * Get all permissions without pagination
   */
  const fetchPermissions = async () => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getAllPermissionsApi()

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch permissions'
        error.value = message
        console.error(message)
        return null
      }

      permissions.value = normalizePermissions(response.data)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching permissions'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get permissions grouped by module
   */
  const fetchPermissionsGrouped = async () => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getPermissionsGroupedApi()

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch permissions'
        error.value = message
        console.error(message)
        return null
      }

      return response.data || response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching permissions'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get single permission
   */
  const fetchPermissionById = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getPermissionApi(id)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch permission'
        error.value = message
        console.error(message)
        return null
      }

      return response.data || response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching permission'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create new permission
   */
  const createPermission = async (payload: { name: string; description: string }) => {
    try {
      isLoading.value = true
      clearMessages()

      const { data: response, error: apiError } = await createPermissionApi(payload)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to create permission'
        error.value = message
        console.error(message)
        return null
      }

      success.value = 'Permission created successfully'
      await fetchPermissions()
      return response.data || response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating permission'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update permission
   */
  const updatePermission = async (id: number, payload: { name?: string; description?: string }) => {
    try {
      isLoading.value = true
      clearMessages()

      const { data: response, error: apiError } = await updatePermissionApi(id, payload)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to update permission'
        error.value = message
        console.error(message)
        return null
      }

      success.value = 'Permission updated successfully'
      await fetchPermissions()
      return response.data || response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating permission'
      error.value = message
      console.error(message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete permission
   */
  const deletePermission = async (id: number) => {
    try {
      isLoading.value = true
      clearMessages()

      const { data: response, error: apiError } = await deletePermissionApi(id)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to delete permission'
        error.value = message
        console.error(message)
        return false
      }

      success.value = 'Permission deleted successfully'
      await fetchPermissions()
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting permission'
      error.value = message
      console.error(message)
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    roles,
    permissions,
    isLoading,
    error,
    success,

    // Methods
    clearMessages,

    // Roles
    fetchRoles,
    fetchRoleById,
    createRole,
    updateRole,
    deleteRole,

    // Permissions
    fetchPermissions,
    fetchPermissionsGrouped,
    fetchPermissionById,
    createPermission,
    updatePermission,
    deletePermission
  }
}
