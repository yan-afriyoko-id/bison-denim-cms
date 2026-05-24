<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <h5 class="card-title mb-4">Notification Settings</h5>
    <form @submit.prevent="$emit('save-settings', 'notification')">
      <div class="form-check form-switch mb-3">
        <input
          v-model="formData.notification_email_enabled"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label"
          >Enable Email Notifications</label
        >
      </div>
      <div class="form-check form-switch mb-3">
        <input
          v-model="formData.notification_sms_enabled"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label"
          >Enable SMS Notifications</label
        >
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
