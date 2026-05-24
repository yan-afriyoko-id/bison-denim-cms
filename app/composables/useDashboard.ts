
interface DashboardStats {
  totalUsers: number
  totalBlogs: number
  totalProducts: number
  totalCategories: number
  revenue: number
}

const { baseURL } = useApiBase()

export const useDashboard = () => {
  const stats = ref<DashboardStats>({
    totalUsers: 0,
    totalBlogs: 0,
    totalProducts: 0,
    totalCategories: 0,
    revenue: 0
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch dashboard statistics
   */
  const fetchDashboardStats = async (token: string) => {
    try {
      isLoading.value = true
      error.value = null

      // Fetch users count
      const usersResponse = await $fetch<any>(`${baseURL}/api/user-management`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (usersResponse.success) {
        stats.value.totalUsers = usersResponse.data?.length || 0
      }

      // Fetch blogs count
      const blogsResponse = await $fetch<any>(`${baseURL}/api/blogs`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (blogsResponse.success) {
        stats.value.totalBlogs = blogsResponse.data?.length || 0
      }

      // Fetch products count
      const productsResponse = await $fetch<any>(`${baseURL}/api/products`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (productsResponse.success) {
        stats.value.totalProducts = productsResponse.data?.length || 0
      }

      // Fetch categories count
      const categoriesResponse = await $fetch<any>(`${baseURL}/api/category-blogs`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (categoriesResponse.success) {
        stats.value.totalCategories = categoriesResponse.data?.length || 0
      }

      // Revenue calculation (dummy for now)
      stats.value.revenue = Math.floor(Math.random() * 100000) + 10000
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch dashboard stats'
      error.value = message
      console.error('Dashboard stats error:', message)
    } finally {
      isLoading.value = false
    }
  }

  return {
    stats,
    isLoading,
    error,
    fetchDashboardStats
  }
}

