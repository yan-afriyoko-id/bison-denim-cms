/**
 * Toast composable for easy toast notifications
 * Uses Bootstrap 5 toast component
 */
export const useToast = () => {
  const nuxtApp = useNuxtApp()
  const $toast = nuxtApp.$toast

  const success = (message: string, duration?: number) => {
    try {
      if ($toast && $toast.success) {
        $toast.success(message, duration)
      } else {
        console.warn('Toast plugin not available', { $toast, nuxtApp })
      }
    } catch (error) {
      console.error('Error showing success toast:', error)
    }
  }

  const error = (message: string, duration?: number) => {
    try {
      if ($toast && $toast.error) {
        $toast.error(message, duration)
      } else {
        console.warn('Toast plugin not available', { $toast, nuxtApp })
      }
    } catch (error) {
      console.error('Error showing error toast:', error)
    }
  }

  const warning = (message: string, duration?: number) => {
    try {
      if ($toast && $toast.warning) {
        $toast.warning(message, duration)
      } else {
        console.warn('Toast plugin not available', { $toast, nuxtApp })
      }
    } catch (error) {
      console.error('Error showing warning toast:', error)
    }
  }

  const info = (message: string, duration?: number) => {
    try {
      if ($toast && $toast.info) {
        $toast.info(message, duration)
      } else {
        console.warn('Toast plugin not available', { $toast, nuxtApp })
      }
    } catch (error) {
      console.error('Error showing info toast:', error)
    }
  }

  return {
    success,
    error,
    warning,
    info,
  }
}

