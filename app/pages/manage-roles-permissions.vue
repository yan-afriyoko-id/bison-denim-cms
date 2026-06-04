<template>
  <div>
    <!-- Page Title -->
    <div class="pagetitle">
      <p>Roles & Permissions</p>
    </div>

    <!-- Main Section -->
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <!-- Nav Tabs Card -->
          <div class="card roles-permissions-card">
            <div class="roles-tabs-wrap">
            <ul class="nav nav-tabs card-header-tabs roles-tabs" role="tablist">
              <li class="nav-item roles-tab-item" role="presentation">
                <button
                  class="nav-link roles-tab-btn"
                  :class="{ active: activeTab === 'roles' }"
                  id="roles-tab"
                  type="button"
                  role="tab"
                  @click="activeTab = 'roles'"
                >
                  <i class="bi bi-shield-lock me-2"></i>
                  Roles
                </button>
              </li>
              <li class="nav-item roles-tab-item" role="presentation">
                <button
                  class="nav-link roles-tab-btn"
                  :class="{ active: activeTab === 'permissions' }"
                  id="permissions-tab"
                  type="button"
                  role="tab"
                  @click="activeTab = 'permissions'"
                >
                  <i class="bi bi-key me-2"></i>
                  Permissions
                </button>
              </li>
            </ul>
            </div>

            <div class="card-body roles-permissions-body">
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
.nav-tabs .nav-link {
  color: #000 !important;
}

.breadcrumb-item,
.breadcrumb-item.active,
.breadcrumb-item :deep(a) {
  color: #5f6b7a !important;
}

.nav-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
}

.nav-tabs .nav-link.active {
  color: #000 !important;
  border-bottom-color: #000;
}

.roles-permissions-card {
  overflow: hidden;
}

.roles-tabs-wrap {
  padding: 0 1rem;
  overflow: hidden;
}

.roles-tabs {
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin-bottom: 0;
  width: auto;
  min-width: 0;
}

.roles-tab-item {
  flex: 0 0 auto;
}

.roles-tab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  white-space: nowrap;
  padding: 0.65rem 0.9rem;
}

.roles-permissions-body {
  padding-top: 1rem;
}

@media (max-width: 768px) {
  .roles-tabs-wrap {
    padding: 0 0.75rem;
  }

  .roles-tabs {
    gap: 0.35rem;
  }

  .roles-tab-btn {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }

  .roles-permissions-body {
    padding: 0.75rem;
  }
}
</style>

