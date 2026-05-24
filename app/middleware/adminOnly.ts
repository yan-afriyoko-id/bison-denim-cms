/**
 * Admin Only Middleware
 * 
 * Melindungi routes yang hanya bisa diakses oleh admin/manager
 * Redirect ke dashboard jika user bukan admin
 */

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()

  // Initialize auth first
  const token = useCookie('auth_token')
  if (token.value) {
    await auth.initAuth()
  }

  // Check jika user tidak authenticated
  if (!auth.isAuthenticated.value) {
    return navigateTo('/login')
  }

  // Check jika user bukan admin
  const user = auth.user.value
  if (!user?.roles) {
    return navigateTo('/dashboard')
  }

  const userRoles = user.roles.map((r: any) => {
    if (typeof r === 'string') return r
    return r.name || String(r)
  })

  const adminRoles = ['Super Admin', 'Admin', 'Manager']
  const hasAdminAccess = userRoles.some(role => adminRoles.includes(role))

  if (!hasAdminAccess) {
    return navigateTo('/dashboard')
  }
})

