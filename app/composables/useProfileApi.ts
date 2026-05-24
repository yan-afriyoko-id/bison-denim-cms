/**
 * Profile API composable
 * Handles all profile-related API calls
 */
export const useProfileApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  const getProfile = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        data?: {
          user: any
        }
      }>(`${baseURL}/profile`, {
        method: 'GET',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const updateProfile = async (data: {
    name?: string
    last_name?: string
    email?: string
    phone?: string
    dob?: string
    gender?: 'MALE' | 'FEMALE'
  }) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data?: {
          user: any
        }
        errors?: Record<string, string[]>
      }>(`${baseURL}/profile`, {
        method: 'PUT',
        body: data,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.data?.errors || {},
        },
      }
    }
  }

  const updatePassword = async (data: {
    current_password: string
    new_password: string
    new_password_confirmation: string
  }) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        errors?: Record<string, string[]>
      }>(`${baseURL}/profile/update-password`, {
        method: 'POST',
        body: data,
        headers: getHeaders(),
      });
      return { data: response, error: null };
      
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.data?.errors || {},
        },
      };
    } finally {
  }
}

  return {
    getProfile,
    updateProfile,
    updatePassword,
  }
}

