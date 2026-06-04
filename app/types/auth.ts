/**
 * Auth types
 * Based on AuthResource from backend
 */

export interface AuthUser {
  id: number
  name: string
  last_name: string
  avatar?: string | null
  avatar_url?: string | null
  email: string
  phone: string
  gender: 'MALE' | 'FEMALE'
  dob: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  roles?: Array<{
    id: number
    name: string
    description?: string
  }>
  permissions?: Array<{
    id: number
    name: string
    description?: string
  }>
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    token: string
    user: AuthUser
  }
}

export interface UserResponse {
  success: boolean
  message?: string
  data: {
    user: AuthUser
  }
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  last_name: string
  email: string
  phone: string
  dob: string
  gender: 'MALE' | 'FEMALE'
  password: string
  password_confirmation: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export interface VerifyEmailPayload {
  token: string
  email: string
}

