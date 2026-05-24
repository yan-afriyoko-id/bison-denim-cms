<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <h5 class="card-title mb-4">Social Media Links</h5>
    <form @submit.prevent="$emit('save-settings', 'social')">
      <div class="row g-3">
        <div
          class="col-md-6"
          v-for="field in [
            'social_instagram',
            'social_tiktok',
            'social_facebook',
            'social_youtube',
            'social_pinterest',
          ]"
          :key="field"
        >
          <label class="form-label text-capitalize">{{
            field.replace("social_", "")
          }}</label>
          <input
            v-model="formData[field]"
            type="url"
            class="form-control"
          />
        </div>

        <!-- WhatsApp Number (separate because it's a phone number, not a URL) -->
        <div class="col-md-6">
          <label class="form-label">WhatsApp Number</label>
          <div class="input-group">
            <span class="input-group-text">+</span>
            <input
              v-model="formData.social_whatsapp"
              type="tel"
              class="form-control"
              placeholder="628123456789"
            />
          </div>
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
