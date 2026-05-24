/**
 * User types
 * Based on UserResource from backend
 */

export interface User {
  id: number
  name: string
  last_name: string
  email: string
  phone: string
  gender: 'MALE' | 'FEMALE'
  dob: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  roles?: Role[]
  permissions?: Permission[]
}

export interface UserResponse {
  success: boolean
  message?: string
  data: {
    user: User
  }
}

export interface UsersResponse {
  success: boolean
  message?: string
  data: User[] | {
    users: User[]
    pagination?: {
      current_page: number
      per_page: number
      total: number
      last_page: number
      from: number | null
      to: number | null
    }
    sort?: {
      sort_by: string
      sort_direction: 'asc' | 'desc'
    }
  }
}

export interface AllUsersResponse {
  success: boolean
  message?: string
  data: {
    users: User[]
  }
}

export interface UserCreatePayload {
  name: string
  last_name: string
  email: string
  phone: string
  dob: string
  gender: 'MALE' | 'FEMALE'
  password: string
  password_confirmation: string
  roles?: string[]
}

export interface UserUpdatePayload extends Partial<UserCreatePayload> {
  password?: string
  password_confirmation?: string
}

export interface Role {
  id: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface Permission {
  id: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

