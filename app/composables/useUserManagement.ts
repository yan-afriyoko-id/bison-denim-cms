import type { User, UserCreatePayload } from '~/types/user'

export const useUserManagement = () => {
  const {
    getUsers: getUsersApi,
    getUser: getUserApi,
    createUser: createUserApi,
    updateUser: updateUserApi,
    deleteUser: deleteUserApi,
    assignRole: assignRoleApi,
    removeRole: removeRoleApi,
    getAllRoles: getAllRolesApi,
  } = useUserManagementApi()

  const users = ref<User[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const totalUsers = ref(0)

  const filters = reactive({
    search: '',
    role: '',
    status: '',
    page: 1,
    perPage: 10
  })

  /**
   * Get all users with filters
   */
  const fetchUsers = async (token: string) => {
    try {
      isLoading.value = true
      error.value = null

      if (!token) {
        throw new Error('No token provided')
      }

      const { data: response, error: apiError } = await getUsersApi({
        search: filters.search,
        role: filters.role,
        status: filters.status,
        page: filters.page,
        per_page: filters.perPage,
      })

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch users'
        error.value = message
        return
      }

      if (response.success && response.data) {
        users.value = response.data || []
        totalUsers.value = response.data?.length || 0
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users'
      error.value = message
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create new user
   */
  const createUser = async (token: string, payload: UserCreatePayload) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await createUserApi(payload)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to create user'
        error.value = message
        return false
      }

      if (response.success) {
        await fetchUsers(token)
        return true
      }

      return false
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user'
      error.value = message
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update user
   */
  const updateUser = async (token: string, id: number, payload: Partial<UserCreatePayload>) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await updateUserApi(id, payload)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to update user'
        error.value = message
        return false
      }

      if (response.success) {
        await fetchUsers(token)
        return true
      }

      return false
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user'
      error.value = message
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete user
   */
  const deleteUser = async (token: string, id: number) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await deleteUserApi(id)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to delete user'
        error.value = message
        return false
      }

      if (response.success) {
        await fetchUsers(token)
        return true
      }

      return false
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user'
      error.value = message
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get single user
   */
  const getUser = async (token: string, id: number) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getUserApi(id)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch user'
        error.value = message
        return null
      }

      if (response.success && response.data) {
        return response.data
      }

      return null
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch user'
      error.value = message
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Assign role to user
   */
  const assignRole = async (token: string, userId: number, role: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await assignRoleApi(userId, role)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to assign role'
        error.value = message
        return false
      }

      if (response.success) {
        await fetchUsers(token)
        return true
      }

      return false
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to assign role'
      error.value = message
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Remove role from user
   */
  const removeRole = async (token: string, userId: number, role: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await removeRoleApi(userId, role)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to remove role'
        error.value = message
        return false
      }

      if (response.success) {
        await fetchUsers(token)
        return true
      }

      return false
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove role'
      error.value = message
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get all available roles
   */
  const fetchAllRoles = async (token: string) => {
    try {
      const { data: response, error: apiError } = await getAllRolesApi()

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch roles'
        return []
      }

      if (response.success && response.data) {
        return response.data || []
      }

      return []
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch roles'
      return []
    }
  }

  /**
   * Reset filters
   */
  const resetFilters = () => {
    filters.search = ''
    filters.role = ''
    filters.status = ''
    filters.page = 1
  }

  return reactive({
    // State
    users,
    isLoading,
    error,
    totalUsers,
    filters,

    // Actions
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    assignRole,
    removeRole,
    fetchAllRoles,
    resetFilters
  })
}
