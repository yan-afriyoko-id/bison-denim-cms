export const useModal = () => {
  const cleanupAllBackdrops = () => {
    if (typeof window === 'undefined') return
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.remove()
    })
    document.body.classList.remove('modal-open')
    document.body.style.paddingRight = ''
    document.body.style.overflow = ''
  }

  const showModal = async (modalId: string) => {
    if (typeof window === 'undefined') return

    await nextTick()

    const bootstrap = (window as any).bootstrap
    if (!bootstrap?.Modal) {
      console.error('Bootstrap Modal is not available')
      return
    }

    const modalElement = document.getElementById(modalId)
    if (!modalElement) {
      console.error(`Modal element "${modalId}" not found`)
      return
    }

    try {
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement)
      modal.show()
    } catch (error) {
      console.error(`Error showing modal ${modalId}:`, error)
    }
  }

  const closeModal = (modalId: string) => {
    if (typeof window === 'undefined') return

    const checkAndCleanup = () => {
      const visibleModals = document.querySelectorAll('.modal.show, .modal[style*="display: block"]')
      if (visibleModals.length === 0) {
        cleanupAllBackdrops()
      }
    }

    const bootstrap = (window as any).bootstrap
    if (!bootstrap?.Modal) {
      checkAndCleanup()
      return
    }

    const modalElement = document.getElementById(modalId)
    if (!modalElement) {
      checkAndCleanup()
      return
    }

    const modal = bootstrap.Modal.getInstance(modalElement)
    if (modal) {
      modal.hide()
      modalElement.addEventListener('hidden.bs.modal', () => {
        cleanupAllBackdrops()
      }, { once: true })
    } else {
      checkAndCleanup()
    }
  }

  const hideModal = (modalId: string) => {
    closeModal(modalId)
  }

  return {
    showModal,
    closeModal,
    hideModal,
  }
}

