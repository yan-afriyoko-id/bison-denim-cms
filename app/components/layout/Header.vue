<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <NuxtLink to="/dashboard" class="logo d-flex align-items-center h-full">
        <img 
          :src="logoUrl || '/assets/img/images.png'" 
          alt="Bison Denim Logo" 
          @error="handleLogoError"
        />
        <span class="logo-text ms-2 fw-bold">Bison Denim</span>
      </NuxtLink>
      <i 
        class="bi toggle-sidebar-btn" 
        :class="{ 'bi-list': !sidebarOpen, 'bi-x': sidebarOpen }" 
        @click="toggleSidebar"
      ></i>
    </div>

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <!-- Profile -->
        <li v-if="user" class="nav-item dropdown pe-3">
          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img v-if="user?.avatar" 
                    :src="user.avatar" 
                    :alt="`${user?.name} ${user?.last_name}`" class="rounded-circle" />
            <span class="d-none d-md-block dropdown-toggle ps-2">{{ user?.name }}</span>
          </a>

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
              <h6>{{ user?.name }} {{ user?.last_name }}</h6>
              <span>{{ userRoles?.[0] || 'User' }}</span>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li>
              <NuxtLink class="dropdown-item d-flex align-items-center" to="/profile">
                <i class="bi bi-person"></i>
                <span>My Profile</span>
              </NuxtLink>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="#" @click.prevent="handleLogout" :class="{ disabled: isLoggingOut }">
                <i class="bi bi-box-arrow-right"></i>
                <span>{{ isLoggingOut ? 'Logging out...' : 'Logout' }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// Composables
const auth = useAuth()
const { logout } = auth
const { fetchPublicConfig } = useConfig()

// State
const isLoggingOut = ref(false)
const logoUrl = ref<string | null>(null)

// Computed
const user = auth.user
const userRoles = computed(() => {
  if (!user.value?.roles) return []
  return user.value.roles.map((r: any) => {
    if (typeof r === 'string') return r
    return r.name || String(r)
  })
})

// Sidebar management using composable
const { toggle: toggleSidebar, isOpen: sidebarOpen } = useSidebar()

// Logo management
const handleLogoError = () => {
  logoUrl.value = '/assets/img/images.png'
}

const loadLogo = async () => {
  try {
    const res = await fetchPublicConfig("store_logo_website")
    if (!res) {
      logoUrl.value = '/assets/img/images.png'
      return
    }
    
    // Response structure: { success, data: Config }
    const configData = res?.data
    if (configData) {
      if (configData.value_image) {
        logoUrl.value = configData.value_image
      } else if (configData.value && typeof configData.value === 'string') {
        // Fallback to value if value_image is not available
        logoUrl.value = configData.value
      }
    }
  } catch (error) {
    console.error("Failed to load logo from config:", error)
  }
}

// Handle account settings
const handleAccountSettings = () => {
  console.log('Go to account settings')
}

// Handle logout
const handleLogout = async () => {
  if (isLoggingOut.value) return

  isLoggingOut.value = true
  try {
    await logout()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    isLoggingOut.value = false
  }
}

// Initialize event listeners when component mounted
onMounted(() => {
  // Load logo from database
  loadLogo()

  // Handle back to top button
  const backtotop = document.querySelector('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    
    window.addEventListener('load', toggleBacktotop)
    window.addEventListener('scroll', toggleBacktotop)
    
    // Initial check
    toggleBacktotop()
  }

  // Close sidebar on overlay click (mobile)
  if (process.client && window.innerWidth < 768) {
    document.addEventListener('click', (e: any) => {
      const target = e.target as HTMLElement
      const isSidebar = target.closest('.sidebar')
      const isToggleBtn = target.closest('.toggle-sidebar-btn')
      
      // If click on overlay (not sidebar, not toggle button)
      if (!isSidebar && !isToggleBtn && document.body.classList.contains('toggle-sidebar')) {
        toggleSidebar()
      }
    })
  }
})
</script>

<style scoped>
.logo-text {
  font-size: 1.25rem;
  white-space: nowrap;
  color: black;
}

.toggle-sidebar-btn {
  transition: transform 0.3s ease;
}

.toggle-sidebar-btn.bi-x {
  transform: rotate(90deg);
}
</style>
