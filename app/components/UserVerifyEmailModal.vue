<template>
  <div
    id="verifyEmailModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="verifyEmailModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="verifyEmailModalLabel">Verify Email</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to mark this user's email as verified?</p>
          <div class="alert alert-info">
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
            class="btn btn-success"
            @click="handleVerify"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span v-if="loading">Verifying...</span>
            <span v-else>Verify Email</span>
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
  (e: 'verified'): void
}>()

const { verifyEmail } = useUserManagementApi()
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

const handleVerify = async () => {
  if (!props.user) return

  loading.value = true
  message.value = ''

  const { data, error } = await verifyEmail(props.user.id)

  if (error) {
    message.value = error.message || 'Failed to verify email'
    messageType.value = 'error'
    toast.error(error.message || 'Failed to verify email')
  } else if (data?.success) {
    message.value = 'Email verified successfully!'
    messageType.value = 'success'
    toast.success('Email verified successfully!')

    emit('verified')

    const { closeModal } = useModal()
    closeModal('verifyEmailModal')
  }

  loading.value = false
}
</script>
