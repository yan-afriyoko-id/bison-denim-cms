import { useAuthStore } from '~/stores/authStore'

/**
 * Debug composable untuk check auth state
 * Gunakan di console: useAuthDebug().logAuthStatus()
 */
export const useAuthDebug = () => {
  const authStore = useAuthStore()

  /**
   * Log semua auth information
   */
  const logAuthStatus = () => {
    console.group('🔐 AUTH STATUS')
    console.log('Token:', authStore.token ? `${authStore.token.substring(0, 20)}...` : 'null')
    console.log('User:', authStore.user)
    console.log('Is Authenticated:', authStore.isAuthenticated)
    console.log('User Roles:', authStore.userRoles)
    console.log('Has Admin Access:', authStore.hasAdminAccess)
    console.groupEnd()
  }

  /**
   * Check specific role
   */
  const checkRole = (roleName: string) => {
    const hasRole = authStore.hasRole(roleName)
    console.log(`Has role "${roleName}": ${hasRole}`)
    return hasRole
  }

  /**
   * List all available roles
   */
  const listRoles = () => {
    console.log('User Roles:', authStore.userRoles)
    return authStore.userRoles
  }

  /**
   * Check access untuk specific page
   */
  const checkAccess = (pagePath: string) => {
    const adminPages = ['/dashboard', '/users', '/blog', '/products']
    const isAdminPage = adminPages.some(page => pagePath.startsWith(page))
    
    console.group(`🔑 ACCESS CHECK: ${pagePath}`)
    console.log('Is Admin Page:', isAdminPage)
    console.log('Has Admin Access:', authStore.hasAdminAccess)
    console.log('Can Access:', isAdminPage ? authStore.hasAdminAccess : true)
    console.groupEnd()

    return isAdminPage ? authStore.hasAdminAccess : true
  }

  return {
    logAuthStatus,
    checkRole,
    listRoles,
    checkAccess,
    authStore
  }
}

