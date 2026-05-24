<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <h5 class="card-title mb-4">Point System Configuration</h5>
    <form @submit.prevent="$emit('save-settings', 'point')">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">
            Minimum Usable Points <span class="text-danger">*</span>
            <small class="text-muted d-block">Minimum poin yang harus dikumpulkan sebelum bisa digunakan</small>
          </label>
          <input
            v-model.number="formData.point_minimum_usable_points"
            type="number"
            min="0"
            step="1"
            class="form-control"
            placeholder="250000"
            required
          />
          <small class="text-muted">Contoh: 250000 (250.000 poin)</small>
        </div>

        <div class="col-md-6">
          <label class="form-label">
            Points Per Million <span class="text-danger">*</span>
            <small class="text-muted d-block">Jumlah poin yang diberikan per kelipatan pembelian</small>
          </label>
          <input
            v-model.number="formData.point_points_per_million"
            type="number"
            min="0"
            step="1"
            class="form-control"
            placeholder="25000"
            required
          />
          <small class="text-muted">Contoh: 25000 (25.000 poin per 1 juta)</small>
        </div>

        <div class="col-md-6">
          <label class="form-label">
            Million Threshold <span class="text-danger">*</span>
            <small class="text-muted d-block">Kelipatan pembelian untuk mendapatkan poin</small>
          </label>
          <input
            v-model.number="formData.point_million_threshold"
            type="number"
            min="1"
            step="1"
            class="form-control"
            placeholder="1000000"
            required
          />
          <small class="text-muted">Contoh: 1000000 (1 juta Rupiah)</small>
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

