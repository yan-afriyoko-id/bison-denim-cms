<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <h5 class="card-title mb-4">Product Protection Configuration</h5>
    <form @submit.prevent="$emit('save-settings', 'product_protection')">
      <div class="row g-3">
        <div class="col-md-12">
          <label class="form-label"> Product Protection </label>
          <input
            v-model="formData.product_protection"
            type="number"
            class="form-control"
            placeholder="1 - 100"
            min="1"
            max="100"
          />
        </div>
      </div>
      <div class="d-flex gap-2 mt-4">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
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
  "save-settings": [category: string];
}>();
</script>
