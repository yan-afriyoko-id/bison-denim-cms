<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <h5 class="card-title mb-4">Email Configuration</h5>
    <form @submit.prevent="$emit('save-settings', 'email')">
      <div class="row g-3">
        <div class="col-md-3">
          <label class="form-label">Driver</label>
          <input
            v-model="formData.email_driver"
            class="form-control"
            placeholder="smtp"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label">Host</label>
          <input
            v-model="formData.email_host"
            class="form-control"
            placeholder="smtp.mailtrap.io"
          />
        </div>
        <div class="col-md-2">
          <label class="form-label">Port</label>
          <input
            v-model="formData.email_port"
            type="number"
            class="form-control"
            placeholder="465"
          />
        </div>
        <div class="col-md-4">
          <label class="form-label">Encryption</label>
          <input
            v-model="formData.email_encryption"
            class="form-control"
            placeholder="tls"
          />
        </div>

        <div class="col-md-6">
          <label class="form-label">Username</label>
          <input
            v-model="formData.email_username"
            class="form-control"
            placeholder="your_mailtrap_username"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Password</label>
          <input
            v-model="formData.email_password"
            type="password"
            class="form-control"
            placeholder="••••••"
          />
        </div>

        <div class="col-md-6">
          <label class="form-label">From Name</label>
          <input
            v-model="formData.email_from_name"
            class="form-control"
            placeholder="JLT Admin"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">From Address</label>
          <input
            v-model="formData.email_from_address"
            type="email"
            class="form-control"
            placeholder="noreply@jlt.com"
          />
        </div>
      </div>

      <div class="d-flex gap-2 mt-4">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading"
        >
          {{ isLoading ? "Saving..." : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formData: any;
  isLoading: boolean;
  isActive?: boolean;
}>();

defineEmits<{
  'save-settings': [category: string];
}>();
</script>
