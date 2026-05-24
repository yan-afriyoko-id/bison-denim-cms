<template>
  <div
    id="editUserModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editUserModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetForm"
          ></button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="edit_user_name" class="form-label fw-medium">
                  First Name <span class="text-danger">*</span>
                </label>
                <input
                  id="edit_user_name"
                  v-model="form.name"
                  type="text"
                  required
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                  placeholder="e.g., John"
                />
                <div v-if="errors.name" class="invalid-feedback">
                  {{ errors.name[0] }}
                </div>
              </div>

              <div class="col-md-6">
                <label for="edit_user_last_name" class="form-label fw-medium">
                  Last Name <span class="text-danger">*</span>
                </label>
                <input
                  id="edit_user_last_name"
                  v-model="form.last_name"
                  type="text"
                  required
                  class="form-control"
                  :class="{ 'is-invalid': errors.last_name }"
                  placeholder="e.g., Doe"
                />
                <div v-if="errors.last_name" class="invalid-feedback">
                  {{ errors.last_name[0] }}
                </div>
              </div>

              <div class="col-md-6">
                <label for="edit_user_email" class="form-label fw-medium">
                  Email <span class="text-danger">*</span>
                </label>
                <input
                  id="edit_user_email"
                  v-model="form.email"
                  type="email"
                  required
                  class="form-control"
                  :class="{ 'is-invalid': errors.email }"
                  placeholder="e.g., john@example.com"
                />
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email[0] }}
                </div>
              </div>

              <div class="col-md-6">
                <label for="edit_user_phone" class="form-label fw-medium">
                  Phone <span class="text-danger">*</span>
                </label>
                <input
                  id="edit_user_phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="form-control"
                  :class="{ 'is-invalid': errors.phone }"
                  placeholder="e.g., 081234567890"
                />
                <div v-if="errors.phone" class="invalid-feedback">
                  {{ errors.phone[0] }}
                </div>
              </div>

              <div class="col-md-6">
                <label for="edit_user_dob" class="form-label fw-medium">
                  Date of Birth <span class="text-danger">*</span>
                </label>
                <input
                  id="edit_user_dob"
                  v-model="form.dob"
                  type="date"
                  required
                  class="form-control"
                  :class="{ 'is-invalid': errors.dob }"
                />
                <div v-if="errors.dob" class="invalid-feedback">
                  {{ errors.dob[0] }}
                </div>
              </div>

              <div class="col-md-6">
                <label for="edit_user_gender" class="form-label fw-medium">
                  Gender <span class="text-danger">*</span>
                </label>
                <select
                  id="edit_user_gender"
                  v-model="form.gender"
                  required
                  class="form-select"
                  :class="{ 'is-invalid': errors.gender }"
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <div v-if="errors.gender" class="invalid-feedback">
                  {{ errors.gender[0] }}
                </div>
              </div>

              <div class="col-md-6">
                <label for="edit_user_role" class="form-label fw-medium">
                  Role <span class="text-danger">*</span>
                </label>
                <select
                  id="edit_user_role"
                  v-model="form.role"
                  required
                  class="form-select"
                  :class="{ 'is-invalid': errors.role }"
                >
                  <option value="">Select Role</option>
                  <option v-for="role in availableRoles" :key="role.id" :value="role.name">
                    {{ role.name }}
                  </option>
                </select>
                <div v-if="errors.role" class="invalid-feedback">
                  {{ errors.role[0] }}
                </div>
              </div>

              <div class="col-md-6">
                <label for="edit_user_password" class="form-label fw-medium">
                  Password <small class="text-muted">(leave blank to keep current password)</small>
                </label>
                <input
                  id="edit_user_password"
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors.password || passwordMismatch }"
                  placeholder="Enter new password (optional)"
                />
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password[0] }}
                </div>
              </div>

              <div class="col-md-6" v-if="form.password">
                <label for="edit_user_password_confirmation" class="form-label fw-medium">
                  Confirm Password
                </label>
                <input
                  id="edit_user_password_confirmation"
                  v-model="form.password_confirmation"
                  type="password"
                  :required="!!form.password"
                  class="form-control"
                  :class="{ 'is-invalid': errors.password_confirmation || passwordMismatch }"
                  placeholder="Confirm new password"
                  @blur="validatePasswordMatch"
                />
                <div v-if="errors.password_confirmation" class="invalid-feedback">
                  {{ errors.password_confirmation[0] }}
                </div>
                <div v-else-if="passwordMismatch && form.password_confirmation" class="invalid-feedback d-block">
                  Password confirmation does not match
                </div>
              </div>
            </div>

            <div v-if="message" class="alert mt-3 mb-0" :class="messageType === 'success' ? 'alert-success' : 'alert-danger'">
              {{ message }}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              :disabled="loading"
              @click="resetForm"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <span v-if="loading">Updating...</span>
              <span v-else>Update User</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, UserUpdatePayload } from '~/types/user'

interface Props {
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'updated'): void
}>()

const { updateUser, getAllRoles } = useUserManagementApi()
const toast = useToast()

const form = reactive<UserUpdatePayload & { role: string }>({
  name: '',
  last_name: '',
  email: '',
  phone: '',
  dob: '',
  gender: 'MALE' as 'MALE' | 'FEMALE',
  password: '',
  password_confirmation: '',
  role: '',
})

const availableRoles = ref<Array<{ id: number; name: string }>>([])
const errors = ref<Record<string, string[]>>({})
const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const loading = ref(false)
const passwordMismatch = ref(false)

const formatDateForInput = (dateString?: string | null): string => {
  if (!dateString) return ''
  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString
    }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

// Load roles on mount
onMounted(async () => {
  const { data } = await getAllRoles()
  if (data?.success && data.data) {
    availableRoles.value = Array.isArray(data.data) ? data.data : []
  }
})

// Initialize form when user changes
watch(() => props.user, (user) => {
  if (user) {
    form.name = user.name
    form.last_name = user.last_name
    form.email = user.email
    form.phone = user.phone
    form.dob = formatDateForInput(user.dob)
    form.gender = user.gender
    form.password = ''
    form.password_confirmation = ''
    
    // Get role from user
    if (user.roles && user.roles.length > 0) {
      const firstRole = user.roles[0]
      form.role = typeof firstRole === 'string' ? firstRole : (firstRole?.name || '')
    } else {
      form.role = ''
    }
    
    errors.value = {}
    message.value = ''
    passwordMismatch.value = false
  }
}, { immediate: true })

// Validate password match
const validatePasswordMatch = () => {
  if (form.password && form.password_confirmation) {
    passwordMismatch.value = form.password !== form.password_confirmation
  } else {
    passwordMismatch.value = false
  }
}

// Watch for password changes
watch([() => form.password, () => form.password_confirmation], () => {
  if (form.password_confirmation) {
    validatePasswordMatch()
  }
})

const resetForm = () => {
  form.name = ''
  form.last_name = ''
  form.email = ''
  form.phone = ''
  form.dob = ''
  form.gender = 'MALE'
  form.password = ''
  form.password_confirmation = ''
  form.role = ''
  errors.value = {}
  message.value = ''
  passwordMismatch.value = false
}

const handleSubmit = async () => {
  // Validate password match if password is provided
  if (form.password && form.password !== form.password_confirmation) {
    passwordMismatch.value = true
    message.value = 'Password confirmation does not match'
    messageType.value = 'error'
    return
  }

  loading.value = true
  message.value = ''
  errors.value = {}
  passwordMismatch.value = false

  const updateData: UserUpdatePayload = {
    name: form.name,
    last_name: form.last_name,
    email: form.email,
    phone: form.phone,
    dob: form.dob,
    gender: form.gender,
    roles: form.role ? [form.role] : [],
  }

  // Only include password if provided
  if (form.password) {
    updateData.password = form.password
    updateData.password_confirmation = form.password_confirmation
  }

  const { data, error } = await updateUser(props.user.id, updateData)

  if (error) {
    message.value = error.message || 'Failed to update user'
    messageType.value = 'error'
    errors.value = error.errors || {}
    toast.error(error.message || 'Failed to update user')
  } else if (data?.success) {
    message.value = 'User updated successfully!'
    messageType.value = 'success'
    errors.value = {}
    toast.success('User updated successfully!')

    emit('updated')

    const { closeModal } = useModal()
    closeModal('editUserModal')
  }

  loading.value = false
}
</script>

