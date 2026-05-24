// ============================================
// Auth Service - API Calls
// ============================================

const { baseURL } = useApiBase()

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

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    token: string
    user: any
  }
}

export interface UserResponse {
  success: boolean
  message: string
  data: {
    user: any
  }
}

class AuthService {
  private apiUrl = `${baseURL}/auth`

  /**
   * Login user dengan email dan password
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    return await response.json()
  }

  /**
   * Register user baru
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Registration failed')
    }

    return await response.json()
  }

  /**
   * Verify email dengan token
   */
  async verifyEmail(token: string, email: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/verify-email/${token}?email=${email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Email verification failed')
    }

    return await response.json()
  }

  /**
   * Forgot password - request reset link
   */
  async forgotPassword(email: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Request failed')
    }

    return await response.json()
  }

  /**
   * Reset password dengan token
   */
  async resetPassword(
    token: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<any> {
    const response = await fetch(`${this.apiUrl}/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Password reset failed')
    }

    return await response.json()
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(token: string): Promise<UserResponse> {
    const response = await fetch(`${this.apiUrl}/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch user')
    }

    return await response.json()
  }

  /**
   * Logout user
   */
  async logout(token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Logout failed')
    }

    return await response.json()
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/resend-verification-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to resend verification email')
    }

    return await response.json()
  }
}

export const authService = new AuthService()

