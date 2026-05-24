/**
 * Sidebar composable for managing sidebar state
 * Provides reactive state management for sidebar toggle
 */
export const useSidebar = () => {
  // Reactive state
  const isOpen = useState<boolean>('sidebar.isOpen', () => {
    if (import.meta.client) {
      return window.innerWidth >= 1200
    }
    return true
  })

  // Toggle sidebar
  const toggle = () => {
    if (import.meta.client) {
      isOpen.value = !isOpen.value
    }
  }

  // Open sidebar
  const open = () => {
    if (import.meta.client) {
      isOpen.value = true
    }
  }

  // Close sidebar
  const close = () => {
    if (import.meta.client) {
      isOpen.value = false
    }
  }

  // Watch for body class sync
  if (import.meta.client) {
    watch(isOpen, (open) => {
      if (open) {
        document.body.classList.remove('toggle-sidebar')
      } else {
        document.body.classList.add('toggle-sidebar')
      }
    }, { immediate: true })

    // Handle window resize for responsive behavior
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        // Desktop: default open
        if (!isOpen.value) {
          isOpen.value = true
        }
      } else {
        // Mobile: default closed
        if (isOpen.value) {
          isOpen.value = false
        }
      }
    }

    window.addEventListener('resize', handleResize)
    
    // Cleanup on unmount
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
  }

  return {
    isOpen: readonly(isOpen),
    toggle,
    open,
    close,
  }
}

