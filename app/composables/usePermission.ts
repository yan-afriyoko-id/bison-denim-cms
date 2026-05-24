export const usePermission = () => {
  const auth = useAuth()
  const user = auth.user

  const hasPermission = (permission: string): boolean => {
    if (!user.value) return false

    // Check if user has permissions array
    // Permissions can be array of strings or array of objects with name property
    if (user.value.permissions && Array.isArray(user.value.permissions)) {
      const permissionNames = user.value.permissions.map((p: any) => 
        typeof p === 'string' ? p : p.name || String(p)
      )
      return permissionNames.includes(permission)
    }

    // Check roles - Super Admin, Admin, Manager have all permissions
    const userRoles = user.value.roles
    if (userRoles) {
      const roleNames = Array.isArray(userRoles)
        ? userRoles.map((r: any) => (typeof r === 'string' ? r : r.name || String(r)))
        : []
      
      const adminRoles = ['Super Admin']
      if (roleNames.some(role => adminRoles.includes(role))) {
        return true
      }
    }

    return false
  }

  return {
    hasPermission,
  }
}

