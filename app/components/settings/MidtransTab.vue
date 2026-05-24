<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <h5 class="card-title mb-4">Midtrans Configuration</h5>
    <form @submit.prevent="$emit('save-settings', 'midtrans')">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">
            Server Key
          </label>
          <input
            v-model="formData.midtrans_server_key"
            type="password"
            class="form-control"
            placeholder="Mid-server-xxxxx"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">
            Client Key
          </label>
          <input
            v-model="formData.midtrans_client_key"
            type="text"
            class="form-control"
            placeholder="Mid-client-xxxxx"
          />
        </div>
        <div class="col-md-12">
          <label class="form-label">Production Mode</label>
          <select
            v-model="formData.midtrans_is_production"
            class="form-select"
          >
            <option :value="false">Sandbox (Test)</option>
            <option :value="true">Production (Live)</option>
          </select>
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
