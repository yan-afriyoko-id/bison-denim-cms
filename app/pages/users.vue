<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <p class="text-muted mb-0">Manage system users</p>
      </div>
      <button
        v-if="hasPermission('users.create')"
        type="button"
        class="btn btn-primary action-btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#createUserModal"
      >
        <span class="me-2">+</span>Create New User
      </button>
    </div>

    <!-- Users Table -->
    <div v-if="hasPermission('users.read')" class="card">
      <div class="card-body">
        <div v-if="loadingUsers" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Loading users...</p>
        </div>

        <div v-else-if="users.length === 0" class="text-center py-5">
          <p class="text-muted">No users found. Create your first user!</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Email Verified</th>
                <th>Role</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user.id">
                <td>
                  <span class="badge bg-secondary">{{ index + 1 }}</span>
                </td>
                <td>{{ user.name }} {{ user.last_name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span
                    v-if="user.email_verified_at"
                    class="badge bg-success"
                  >
                    <i class="bi bi-check-circle me-1"></i>Verified
                  </span>
                  <span
                    v-else
                    class="badge bg-warning"
                  >
                    <i class="bi bi-x-circle me-1"></i>Not Verified
                  </span>
                </td>
                <td>
                  <span
                    v-if="user.roles && user.roles.length > 0"
                    class="badge bg-primary"
                  >
                    {{ typeof user.roles[0] === 'string' ? user.roles[0] : user.roles[0].name }}
                  </span>
                  <span v-else class="text-muted">-</span>
                </td>
                <td class="text-end">
                  <div class="d-flex justify-content-end gap-2">
                    <button
                      v-if="hasPermission('users.update') && !user.email_verified_at"
                      type="button"
                      class="btn btn-sm btn-outline-success"
                      @click="handleVerifyEmailClick(user)"
                      title="Verify Email"
                    >
                      <i class="bi bi-envelope-check"></i>
                    </button>
                    <button
                      v-if="hasPermission('users.update')"
                      type="button"
                      class="btn btn-sm btn-outline-primary"
                      @click="handleEditClick(user)"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      v-if="hasPermission('users.delete')"
                      type="button"
                      class="btn btn-sm btn-outline-danger"
                      @click="handleDeleteClick(user)"
                      title="Delete"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else class="card">
      <div class="card-body">
        <div class="text-center py-5">
          <p class="text-muted">You don't have permission to view users.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <UserCreateModal @created="handleUserCreated" />
    <UserEditModal
      v-if="userToEdit"
      :user="userToEdit"
      @updated="handleUserUpdated"
    />
    <UserDeleteModal
      v-if="userToDelete"
      :user="userToDelete"
      @deleted="handleUserDeleted"
    />
    <UserVerifyEmailModal
      v-if="userToVerifyEmail"
      :user="userToVerifyEmail"
      @verified="handleEmailVerified"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

useAppTitle("Users")

const { getUsers } = useUserManagementApi()
const { hasPermission } = usePermission()

const users = ref<User[]>([])
const loadingUsers = ref(false)

const userToEdit = ref<User | null>(null)
const userToDelete = ref<User | null>(null)
const userToVerifyEmail = ref<User | null>(null)

const loadUsers = async () => {
  loadingUsers.value = true
  const { data, error } = await getUsers()

  if (error || !data?.success) {
    console.error("Failed to load users:", error)
  } else if (data.data) {
    // Handle response structure
    if (Array.isArray(data.data)) {
      users.value = data.data
    } else if (data.data.users) {
      users.value = data.data.users
    }
  }

  loadingUsers.value = false
}

const { showModal } = useModal()

const handleEditClick = async (user: User) => {
  userToEdit.value = user
  await nextTick()
  await showModal('editUserModal')
}

const handleDeleteClick = async (user: User) => {
  userToDelete.value = user
  await nextTick()
  await showModal('deleteUserModal')
}

const handleVerifyEmailClick = async (user: User) => {
  userToVerifyEmail.value = user
  await nextTick()
  await showModal('verifyEmailModal')
}

const handleUserCreated = () => {
  loadUsers()
}

const handleUserUpdated = () => {
  userToEdit.value = null
  loadUsers()
}

const handleUserDeleted = () => {
  userToDelete.value = null
  loadUsers()
}

const handleEmailVerified = () => {
  userToVerifyEmail.value = null
  loadUsers()
}

onMounted(async () => {
  await loadUsers()
})
</script>

<style scoped>
.table .badge {
  font-weight: 600;
}

.table .badge.bg-secondary {
  color: rgba(255, 255, 255, 0.96) !important;
}

.table .badge.bg-success {
  background-color: #dff3e7 !important;
  color: #166534 !important;
}

.table .badge.bg-warning {
  background-color: #fdf1d3 !important;
  color: #8a5a00 !important;
}

.table .badge.bg-primary {
  background-color: #dbeafe !important;
  color: #1d4ed8 !important;
}

</style>
