<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="card-title mb-0">Store Management</h5>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createStoreModal"
        @click="$emit('load-provinces')"
      >
        <span class="me-2">+</span>Create New Store
      </button>
    </div>

    <!-- Stores Table -->
    <div class="card">
      <div class="card-body">
        <div v-if="loadingStores" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Loading stores...</p>
        </div>

        <div v-else-if="stores.length === 0" class="text-center py-5">
          <p class="text-muted">No stores found. Create your first store!</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <!-- <th>Products</th> -->
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(store, index) in stores" :key="store.id">
                <td>
                  <span class="badge bg-secondary">{{ index + 1 }}</span>
                </td>
                <td>{{ store.name }}</td>
                <td>{{ store.code || "-" }}</td>
                <td>{{ store.email || "-" }}</td>
                <td>{{ store.phone || "-" }}</td>
                <td>
                  <span
                    :class="[
                      'badge',
                      store.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary',
                    ]"
                  >
                    {{ store.status || "INACTIVE" }}
                  </span>
                </td>
                <!-- <td>
                  <span class="badge bg-info">
                    {{ store.products?.length || 0 }} products
                  </span>
                </td> -->
                <td class="text-end">
                  <div class="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-primary"
                      @click="$emit('edit-store', store)"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger"
                      @click="$emit('delete-store', store)"
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
import type { Store } from "~/types/store";

defineProps<{
  stores: Store[];
  loadingStores: boolean;
  isActive?: boolean;
}>();

defineEmits<{
  "edit-store": [store: Store];
  "delete-store": [store: Store];
  "load-provinces": [];
}>();
</script>

<style scoped>
.table :deep(.badge),
.table .badge {
  color: #fff !important;
}

.table :deep(.bg-secondary),
.table :deep(.bg-success),
.table :deep(.bg-info),
.table .bg-secondary,
.table .bg-success,
.table .bg-info {
  color: #fff !important;
}
</style>
