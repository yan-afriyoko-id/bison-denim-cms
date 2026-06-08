/**
 * Sidebar composable for managing sidebar state
 * Provides reactive state management for sidebar toggle
 */
export const useSidebar = () => {
  const desktopBreakpoint = 1200

  // Reactive state
  const isOpen = useState<boolean>('sidebar.isOpen', () => {
    if (import.meta.client) {
      return window.innerWidth >= desktopBreakpoint
    }
    return true
  })

  const syncBodyClass = () => {
    if (!import.meta.client) return

    const isDesktop = window.innerWidth >= desktopBreakpoint
    const shouldApplyToggleClass = isDesktop ? !isOpen.value : isOpen.value

    document.body.classList.toggle('toggle-sidebar', shouldApplyToggleClass)
  }

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
    watch(isOpen, syncBodyClass, { immediate: true })

    let lastIsDesktop = window.innerWidth >= desktopBreakpoint

    const handleResize = () => {
      const nowIsDesktop = window.innerWidth >= desktopBreakpoint
      if (nowIsDesktop !== lastIsDesktop) {
        lastIsDesktop = nowIsDesktop
        isOpen.value = nowIsDesktop
      }
      syncBodyClass()
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

