/**
 * Role types
 * Based on RoleResource from backend
 */

export interface Role {
  id: number
  name: string
  description?: string
  permissions?: Permission[]
  created_at?: string
  updated_at?: string
}

export interface RoleResponse {
  success: boolean
  message?: string
  data: {
    role: Role
  }
}

export interface RolesResponse {
  success: boolean
  message?: string
  data: Role[] | {
    roles: Role[]
    pagination?: {
      current_page: number
      per_page: number
      total: number
      last_page: number
    }
  }
}

export interface RoleCreatePayload {
  name: string
  description?: string
  permissions?: number[]
}

export interface RoleUpdatePayload extends Partial<RoleCreatePayload> {}

export interface Permission {
  id: number
  name: string
  description?: string
  module?: string
  created_at?: string
  updated_at?: string
}

export interface PermissionResponse {
  success: boolean
  message?: string
  data: {
    permission: Permission
  }
}

export interface PermissionsResponse {
  success: boolean
  message?: string
  data: Permission[] | {
    permissions: Permission[]
  }
}

export interface PermissionGrouped {
  module: string
  permissions: Permission[]
}

export interface PermissionsGroupedResponse {
  success: boolean
  message?: string
  data: PermissionGrouped[]
}

export interface PermissionCreatePayload {
  name: string
  description?: string
}

export interface PermissionUpdatePayload extends Partial<PermissionCreatePayload> {}

