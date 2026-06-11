<template>
  <div class="profile-page">
    <!-- Page Title Container -->
    <div class="page-header-container">
      <div class="pagetitle">
        <h1>My Profile</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink to="/dashboard">Home</NuxtLink></li>
            <li class="breadcrumb-item active">Profile</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- End Page Title -->

    <section class="section profile">
      <div class="container-fluid profile-container">
        <div class="row g-4">
          <!-- Profile Card Column -->
          <div class="col-xl-4 col-lg-5">
            <div class="card profile-card-wrapper">
              <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <!-- Avatar with initials -->
                <div class="avatar-container mb-3">
                  <div class="avatar-initials">
                    {{ getInitials(user?.name, user?.last_name) }}
                  </div>
                </div>

                <h2 class="profile-name">{{ user?.name }} {{ user?.last_name }}</h2>
                <h3 class="profile-role">
                  <span class="badge bg-info">{{ userRole }}</span>
                </h3>

                <!-- Email -->
                <p class="profile-email text-muted mb-3">
                  <i class="bi bi-envelope me-2"></i>
                  {{ user?.email }}
                </p>

                <!-- Social Links -->
                <div class="social-links mt-3">
                </div>
              </div>
            </div>
          </div>

          <!-- Info Card Column -->
          <div class="col-xl-8 col-lg-7">
            <div class="card">
              <div class="card-body pt-3">
                <!-- Tabs Navigation -->
                <ul class="nav nav-tabs nav-tabs-bordered">
                  <li class="nav-item">
                    <button
                      class="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                      type="button"
                    >
                      Overview
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                      type="button"
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-settings"
                      type="button"
                    >
                      Settings
                    </button>
                  </li>
                </ul>

                <!-- Tab Content -->
                <div class="tab-content pt-3">
                  <!-- Overview Tab -->
                  <div class="tab-pane fade show active profile-overview" id="profile-overview">
                    <h5 class="card-title">Profile Details</h5>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Full Name</div>
                      <div class="col-lg-9 col-md-8">{{ user?.name }} {{ user?.last_name }}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Email</div>
                      <div class="col-lg-9 col-md-8">{{ user?.email }}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Phone</div>
                      <div class="col-lg-9 col-md-8">{{ user?.phone }}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Date of Birth</div>
                      <div class="col-lg-9 col-md-8">{{ formatDate(user?.dob) }}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Gender</div>
                      <div class="col-lg-9 col-md-8">{{ user?.gender === 'MALE' ? 'Male' : 'Female' }}</div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Role</div>
                      <div class="col-lg-9 col-md-8">
                        <span class="badge bg-info">{{ userRole }}</span>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-3 col-md-4 label">Joined</div>
                      <div class="col-lg-9 col-md-8">{{ formatDate(user?.created_at) }}</div>
                    </div>

                    <div class="row" v-if="user?.email_verified_at">
                      <div class="col-lg-3 col-md-4 label">Email Verified</div>
                      <div class="col-lg-9 col-md-8">
                        <span class="badge bg-success">
                          <i class="bi bi-check-circle"></i> Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Edit Profile Tab -->
                  <div class="tab-pane fade profile-edit" id="profile-edit">
                    <h5 class="card-title mb-4">Edit Profile</h5>

                    <div v-if="editError" class="alert alert-danger alert-dismissible fade show" role="alert">
                      <i class="bi bi-exclamation-circle me-2"></i>
                      {{ editError }}
                      <button type="button" class="btn-close" @click="editError = ''"></button>
                    </div>

                    <form @submit.prevent="handleUpdateProfile">
                      <div class="row mb-3">
                        <label for="firstName" class="col-md-4 col-lg-3 col-form-label">First Name</label>
                        <div class="col-md-8 col-lg-9">
                          <input v-model="editForm.name" name="firstname" type="text" class="form-control" id="firstName" />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="lastName" class="col-md-4 col-lg-3 col-form-label">Last Name</label>
                        <div class="col-md-8 col-lg-9">
                          <input v-model="editForm.last_name" name="lastname" type="text" class="form-control" id="lastName" />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                        <div class="col-md-8 col-lg-9">
                          <input v-model="editForm.email" name="email" type="email" class="form-control" id="email" disabled />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="phone" class="col-md-4 col-lg-3 col-form-label">Phone</label>
                        <div class="col-md-8 col-lg-9">
                          <input 
                            v-model="editForm.phone" 
                            name="phone" 
                            type="tel"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            class="form-control" 
                            id="phone"
                            placeholder="081234567890"
                            @keypress="(e) => { if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') e.preventDefault() }"
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="dob" class="col-md-4 col-lg-3 col-form-label">Date of Birth</label>
                        <div class="col-md-8 col-lg-9">
                          <input v-model="editForm.dob" name="dob" type="date" class="form-control" id="dob" />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="gender" class="col-md-4 col-lg-3 col-form-label">Gender</label>
                        <div class="col-md-8 col-lg-9">
                          <select v-model="editForm.gender" name="gender" class="form-select" id="gender">
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                        </div>
                      </div>

                      <div class="text-center">
                        <button type="submit" class="btn btn-primary action-btn-dark" :disabled="isUpdating">
                          <span v-if="isUpdating" class="spinner-border spinner-border-sm me-2"></span>
                          {{ isUpdating ? 'Updating...' : 'Save Changes' }}
                        </button>
                      </div>
                    </form>
                  </div>

                  <!-- Settings Tab -->
                  <div class="tab-pane fade profile-settings" id="profile-settings">
                    <h5 class="card-title mb-4">Account Settings</h5>

                    <!-- Change Password Section -->
                    <div class="settings-section mb-5">
                      <h6 class="section-title mb-4">
                        <i class="bi bi-lock me-2"></i>Change Password
                      </h6>

                      <form @submit.prevent="handleChangePassword">
                        <div class="row mb-4">
                          <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                        <div class="col-md-8 col-lg-9">
                          <input
                            v-model="passwordForm.currentPassword"
                            type="password"
                            class="form-control form-control-lg"
                            id="currentPassword"
                            placeholder="Enter your current password"
                            required
                          />
                        </div>
                      </div>

                        <div class="row mb-4">
                          <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                        <div class="col-md-8 col-lg-9">
                          <input
                            v-model="passwordForm.newPassword"
                            type="password"
                            class="form-control form-control-lg"
                            id="newPassword"
                            placeholder="Enter new password"
                            required
                          />
                        </div>
                      </div>

                        <div class="row mb-4">
                          <label for="confirmPassword" class="col-md-4 col-lg-3 col-form-label">Confirm Password</label>
                        <div class="col-md-8 col-lg-9">
                          <input
                            v-model="passwordForm.confirmPassword"
                            type="password"
                            class="form-control form-control-lg"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            required
                          />
                        </div>
                      </div>

                        <div class="row">
                          <div class="col-md-8 col-lg-9 offset-md-4 offset-lg-3">
                            <button type="submit" class="btn btn-success btn-lg" :disabled="isChangingPassword">
                              <span v-if="isChangingPassword" class="spinner-border spinner-border-sm me-2"></span>
                              {{ isChangingPassword ? 'Updating...' : 'Update Password' }}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <hr class="my-5" />

                    <!-- Danger Zone -->
                    <div class="settings-section">
                      <h6 class="section-title text-danger mb-4">
                        <i class="bi bi-exclamation-triangle me-2"></i>Danger Zone
                      </h6>
                      <div>
                        <button class="btn btn-danger btn-lg" @click="handleDeleteAccount" :disabled="isDeletingAccount">
                          <span v-if="isDeletingAccount" class="spinner-border spinner-border-sm me-2"></span>
                          {{ isDeletingAccount ? 'Deleting...' : 'Delete Account' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
import type { User } from '~/types/user'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

useAppTitle("Profile")

const auth = useAuth()
const { getProfile, updateProfile, updatePassword } = useProfileApi()
const toast = useToast()

const user = ref<User | null>(null)
const loadingUser = ref(true)

// Edit Form
const editForm = ref({
  name: '',
  last_name: '',
  email: '',
  phone: '',
  dob: '',
  gender: 'MALE' as 'MALE' | 'FEMALE'
})

const userRole = computed(() => {
  if (!user.value?.roles || user.value.roles.length === 0) return 'User'
  const firstRole = user.value.roles[0]
  return typeof firstRole === 'string' ? firstRole : (firstRole?.name || 'User')
})

// Format date untuk input type="date" (YYYY-MM-DD)
const formatDateForInput = (dateString?: string | null): string => {
  if (!dateString) return ''
  try {
    // Jika sudah format YYYY-MM-DD, return langsung
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString
    }
    // Jika format lain (YYYY-MM-DD HH:mm:ss atau ISO), extract date saja
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

const loadUser = async () => {
  loadingUser.value = true
  try {
    const { data: response, error: apiError } = await getProfile()

    if (apiError || !response?.success) {
      console.error('Failed to fetch profile:', apiError)
      toast.error(apiError?.message || 'Failed to load profile')
      return
    }

    if (response.data?.user) {
      user.value = response.data.user
      auth.user.value = response.data.user
      
      editForm.value = {
        name: response.data.user.name || '',
        last_name: response.data.user.last_name || '',
        email: response.data.user.email || '',
        phone: response.data.user.phone || '',
        dob: formatDateForInput(response.data.user.dob),
        gender: (response.data.user.gender || 'MALE') as 'MALE' | 'FEMALE'
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error)
    toast.error('Failed to load profile')
  } finally {
    loadingUser.value = false
  }
}

// Password Form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Loading States
const isUpdating = ref(false)
const isChangingPassword = ref(false)
const isDeletingAccount = ref(false)
const editError = ref('')
const passwordError = ref('')


// Initialize on mount
onMounted(async () => {
  await loadUser()
})

// Format date
const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get initials from name
const getInitials = (firstName?: string, lastName?: string) => {
  const first = firstName?.charAt(0).toUpperCase() || ''
  const last = lastName?.charAt(0).toUpperCase() || ''
  return (first + last) || '?'
}

// Handle update profile
const handleUpdateProfile = async () => {
  isUpdating.value = true
  editError.value = ''

  try {
    const { data: response, error: apiError } = await updateProfile(editForm.value)

    if (apiError || !response?.success) {
      const errorMessage = apiError?.message || response?.message || 'Failed to update profile'
      editError.value = errorMessage
      toast.error(errorMessage)
      return
    }

    if (response.data?.user) {
        // Update user data
        user.value = response.data.user
        auth.user.value = response.data.user
      
      // Update editForm dengan data terbaru dari response (untuk memastikan sinkronisasi)
      editForm.value = {
        name: response.data.user.name || '',
        last_name: response.data.user.last_name || '',
        email: response.data.user.email || '',
        phone: response.data.user.phone || '',
        dob: formatDateForInput(response.data.user.dob),
        gender: (response.data.user.gender || 'MALE') as 'MALE' | 'FEMALE'
      }
      
      toast.success('Profile updated successfully!')
    }
  } catch (error) {
    editError.value = error instanceof Error ? error.message : 'Failed to update profile'
    toast.error(editError.value)
  } finally {
    isUpdating.value = false
  }
}

// Handle change password
const handleChangePassword = async () => {
  passwordError.value = ''
  isChangingPassword.value = true

  try {
    const { data: response, error: apiError } = await updatePassword({
      current_password: passwordForm.value.currentPassword,
      new_password: passwordForm.value.newPassword,
      new_password_confirmation: passwordForm.value.confirmPassword
    })

    if (apiError || !response?.success) {
      const errorMessage = apiError?.message || response?.message || 'Failed to change password'
      passwordError.value = errorMessage
      toast.error(errorMessage)
      return
    }

    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    toast.success('Password changed successfully!')
  } catch (error) {
    passwordError.value = error instanceof Error ? error.message : 'Failed to change password'
    toast.error(passwordError.value)
  } finally {
    isChangingPassword.value = false
  }
}

// Handle delete account
const handleDeleteAccount = async () => {
  const confirmed = confirm('Are you sure? This action cannot be undone!')
  if (!confirmed) return

  isDeletingAccount.value = true

  try {
    const toast = useToast()
    toast.info('Feature coming soon!')
  } catch (error) {
    const toast = useToast()
    toast.error(error instanceof Error ? error.message : 'Failed to delete account')
  } finally {
    isDeletingAccount.value = false
  }
}
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Page Header Container */
.page-header-container {
  padding: 20px 30px;
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 0;
}

.pagetitle {
  margin-bottom: 0;
}

.pagetitle h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2933;
  margin-bottom: 10px;
}

/* Profile Section */
.profile {
  padding: 30px 0;
  flex: 1;
}

.profile-container {
  padding: 0 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.profile-card-wrapper {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
}

.profile-card {
  border-radius: 12px;
  text-align: center;
}

.avatar-container {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #012970;
  box-shadow: 0 4px 12px rgba(1, 41, 112, 0.2);
}

.avatar-initials {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #012970 0%, #0a1e50 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  border: 4px solid #012970;
  box-shadow: 0 4px 12px rgba(1, 41, 112, 0.2);
}

.avatar-initials-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #012970 0%, #0a1e50 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: bold;
  border: 3px solid #e9ecef;
}

.profile-name {
  font-size: 22px;
  font-weight: 700;
  color: #1f2933;
  margin-bottom: 8px;
  margin-top: 15px;
}

.profile-role {
  font-size: 14px;
  margin-bottom: 12px;
}

.profile-page :deep(.badge.bg-info) {
  background-color: #d8f0f7 !important;
  color: #164e63 !important;
}

.profile-page :deep(.badge.bg-success) {
  background-color: #dff3e7 !important;
  color: #166534 !important;
}

.profile-email {
  font-size: 13px;
  letter-spacing: 0.5px;
}

.social-links {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f5f7;
  color: #374151;
  transition: all 0.3s ease;
  font-size: 16px;
}

.social-link:hover {
  background-color: #012970;
  color: white;
  transform: scale(1.1);
}

.social-link.twitter:hover {
  background: linear-gradient(135deg, #1DA1F2, #1a8cd8);
}

.social-link.facebook:hover {
  background: linear-gradient(135deg, #4267B2, #365899);
}

.social-link.instagram:hover {
  background: linear-gradient(135deg, #E1306C, #833AB4);
}

.social-link.linkedin:hover {
  background: linear-gradient(135deg, #0077B5, #005885);
}

.nav-tabs-bordered {
  border-bottom: 2px solid #e9ecef;
}

.nav-tabs-bordered .nav-link {
  border-bottom: 3px solid transparent;
  color: #4f5b66;
  margin-bottom: -2px;
}

.nav-tabs-bordered .nav-link.active {
  border-color: #1f2933;
  color: #1f2933;
}

.profile-overview .row {
  margin-bottom: 15px;
}

.profile-overview .label {
  font-weight: 600;
  color: #4f5b66;
}

.profile-edit .row {
  padding: 8px 0;
}

.profile-edit .col-form-label {
  font-weight: 500;
  color: #374151;
  padding-top: 8px;
}

.profile-edit .form-control,
.profile-edit .form-select {
  border-radius: 6px;
  border-color: #dee2e6;
  background-color: #fafbfc;
}

.profile-edit .form-control:focus,
.profile-edit .form-select:focus {
  background-color: white;
  border-color: #374151;
  box-shadow: 0 0 0 0.2rem rgba(55, 65, 81, 0.12);
}

.profile-edit form input[disabled],
.profile-edit form input:disabled {
  background-color: #f8f9fa;
  color: #4f5b66;
  cursor: not-allowed;
}

.profile-edit .btn-primary {
  padding: 10px 30px;
  font-weight: 600;
  border-radius: 6px;
}

/* Settings Section */
.settings-section {
  padding: 10px 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2933;
  margin-bottom: 20px;
}

.settings-section .section-title.text-danger {
  color: #dc3545;
}

/* Form Styling */
.form-control-lg,
.form-select {
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.form-control-lg:focus {
  border-color: #374151;
  box-shadow: 0 0 0 0.2rem rgba(55, 65, 81, 0.12);
}

.btn-lg {
  padding: 12px 30px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  color: rgba(255, 255, 255, 0.96);
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
  border-color: #c82333;
  color: rgba(255, 255, 255, 0.96);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.btn-danger:disabled,
.action-btn-dark:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn-dark {
  --bs-btn-color: rgba(255, 255, 255, 0.96);
  --bs-btn-bg: #1f2933;
  --bs-btn-border-color: #1f2933;
  --bs-btn-hover-color: rgba(255, 255, 255, 0.96);
  --bs-btn-hover-bg: #273444;
  --bs-btn-hover-border-color: #273444;
  --bs-btn-focus-shadow-rgb: 33, 37, 41;
  --bs-btn-active-color: rgba(255, 255, 255, 0.96);
  --bs-btn-active-bg: #1f2933;
  --bs-btn-active-border-color: #1f2933;
}

.card-title,
.pagetitle h1,
.breadcrumb-item.active,
.profile-page :deep(.text-muted) {
  color: #4f5b66 !important;
}

.profile-page :deep(.card-title),
.profile-page :deep(.card-title span),
.profile-page :deep(.profile-overview .col-lg-9),
.profile-page :deep(.profile-overview .col-md-8) {
  color: #1f2933 !important;
}

/* Alert Styling */
.alert {
  border-radius: 6px;
  border: none;
}

.alert-danger {
  background-color: #f6dddf;
  color: #721c24;
}

.alert-success {
  background-color: #dceddf;
  color: #155724;
}

.alert-warning {
  background-color: #fdf1d3;
  color: #856404;
}

/* Breadcrumb */
.breadcrumb {
  background-color: transparent;
  padding: 0;
  margin: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  color: #4f5b66;
}

.breadcrumb-item a {
  color: #374151;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-item a:hover {
  color: #0a1e50;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header-container {
    padding: 15px 20px;
  }

  .profile-container {
    padding: 0 20px;
  }

  .pagetitle h1 {
    font-size: 24px;
  }

  .profile-card-wrapper {
    margin-bottom: 20px;
  }
}
</style>
