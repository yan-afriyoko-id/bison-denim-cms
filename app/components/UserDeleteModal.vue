<template>
  <div
    id="deleteUserModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deleteUserModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteUserModalLabel">Confirm Delete</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this user?</p>
          <div class="alert alert-warning">
            <strong>{{ user.name }} {{ user.last_name }}</strong>
            <br>
            <small>Email: {{ user.email }}</small>
            <br>
            <small v-if="user.roles && user.roles.length > 0">
              Role: <span class="badge bg-info">
                {{ getUserRole() }}
              </span>
            </small>
          </div>
          <div v-if="message" class="alert mb-0" :class="messageType === 'success' ? 'alert-success' : 'alert-danger'">
            {{ message }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            :disabled="loading"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="handleDelete"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span v-if="loading">Deleting...</span>
            <span v-else>Delete User</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

interface Props {
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleted'): void
}>()

const { deleteUser } = useUserManagementApi()
const toast = useToast()

const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const loading = ref(false)

// Reset message when modal opens
watch(() => props.user, () => {
  message.value = ''
}, { immediate: true })

const getUserRole = (): string => {
  if (!props.user.roles || props.user.roles.length === 0) return ''
  const firstRole = props.user.roles[0]
  return typeof firstRole === 'string' ? firstRole : (firstRole?.name || '')
}

const handleDelete = async () => {
  if (!props.user) return

  loading.value = true
  message.value = ''

  const { data, error } = await deleteUser(props.user.id)

  if (error) {
    message.value = error.message || 'Failed to delete user'
    messageType.value = 'error'
    toast.error(error.message || 'Failed to delete user')
  } else if (data?.success) {
    message.value = 'User deleted successfully!'
    messageType.value = 'success'
    toast.success('User deleted successfully!')

    emit('deleted')

    const { closeModal } = useModal()
    closeModal('deleteUserModal')
  }

  loading.value = false
}
</script>

