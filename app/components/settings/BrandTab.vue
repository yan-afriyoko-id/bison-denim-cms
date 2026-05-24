<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="card-title mb-0">Brand Management</h5>
      <button
        type="button"
        class="btn btn-primary"
        @click="$emit('create-brand')"
      >
        <span class="me-2">+</span>Create New Brand
      </button>
    </div>

    <!-- Brands Table -->
    <div class="card">
      <div class="card-body">
        <div v-if="loadingBrands" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Loading brands...</p>
        </div>

        <div v-else-if="brands.length === 0" class="text-center py-5">
          <p class="text-muted">No brands found. Create your first brand!</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Name</th>
                <th>Order</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(brand, index) in brands" :key="brand.id">
                <td>
                  <span class="badge bg-secondary">{{ index + 1 }}</span>
                </td>
                <td>
                  <img
                    v-if="brand.logo"
                    :src="brand.logo"
                    :alt="brand.name"
                    class="img-thumbnail"
                    style="
                      max-width: 80px;
                      max-height: 50px;
                      object-fit: contain;
                    "
                  />
                  <span v-else class="text-muted">No logo</span>
                </td>
                <td>{{ brand.name }}</td>
                <td>{{ brand.order || 0 }}</td>
                <td>
                  <span
                    :class="[
                      'badge',
                      brand.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary',
                    ]"
                  >
                    {{ brand.status || "INACTIVE" }}
                  </span>
                </td>
                <td class="text-end">
                  <div class="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-primary"
                      @click="$emit('edit-brand', brand)"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger"
                      @click="$emit('delete-brand', brand)"
                      title="Delete"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Brand } from "~/types/brand";

defineProps<{
  brands: Brand[];
  loadingBrands: boolean;
  isActive?: boolean;
}>();

defineEmits<{
  "edit-brand": [brand: Brand];
  "delete-brand": [brand: Brand];
}>();
</script>
