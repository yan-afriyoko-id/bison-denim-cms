<template>
  <div>
    <!-- Page Title -->
    <div class="pagetitle">
      <h1>Roles & Permissions</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NuxtLink to="/dashboard">Home</NuxtLink></li>
          <li class="breadcrumb-item active">Roles & Permissions</li>
        </ol>
      </nav>
    </div>

    <!-- Main Section -->
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <!-- Nav Tabs Card -->
          <div class="card">
            <ul class="nav nav-tabs card-header-tabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'roles' }"
                  id="roles-tab"
                  type="button"
                  role="tab"
                  @click="activeTab = 'roles'"
                >
                  <i class="bi bi-shield-lock me-2"></i>
                  Roles Management
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'permissions' }"
                  id="permissions-tab"
                  type="button"
                  role="tab"
                  @click="activeTab = 'permissions'"
                >
                  <i class="bi bi-key me-2"></i>
                  Permissions Management
                </button>
              </li>
            </ul>

            <div class="card-body">
              <!-- Roles Tab -->
              <div v-if="activeTab === 'roles'">
                <RoleManagement :roles-permissions="rolesPermissions" />
              </div>

              <!-- Permissions Tab -->
              <div v-if="activeTab === 'permissions'">
                <PermissionManagement :roles-permissions="rolesPermissions" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRolesPermissions } from '~/composables/useRolesPermissions'
import RoleManagement from '~/components/RoleManagement.vue'
import PermissionManagement from '~/components/PermissionManagement.vue'

// Page meta configuration
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// State
const activeTab = ref<'roles' | 'permissions'>('roles')
const rolesPermissions = useRolesPermissions()

// Load initial data
onMounted(async () => {
  await rolesPermissions.fetchRoles()
  await rolesPermissions.fetchPermissions()
})

// Auto-clear messages after 5 seconds
const setupAutoHideMessages = () => {
  if (rolesPermissions.success.value || rolesPermissions.error.value) {
    setTimeout(() => {
      rolesPermissions.clearMessages()
    }, 5000)
  }
}

// Watch for success/error changes
const originalSuccess = rolesPermissions.success
const originalError = rolesPermissions.error

watch([originalSuccess, originalError], () => {
  setupAutoHideMessages()
})
</script>

<style scoped>
.pagetitle h1,
.breadcrumb-item.active,
.breadcrumb-item :deep(a),
.nav-tabs .nav-link {
  color: #000 !important;
}

.nav-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
}

.nav-tabs .nav-link.active {
  color: #000 !important;
  border-bottom-color: #000;
}
</style>

