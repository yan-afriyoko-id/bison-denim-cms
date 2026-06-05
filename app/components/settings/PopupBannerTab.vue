<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="card-title mb-0">Popup Banner Management</h5>

      <button
        type="button"
        class="btn btn-primary"
        @click="$emit('create-banner')"
      >
        <span class="me-2">+</span>Create New Banner
      </button>
    </div>

    <div class="card">
      <div class="card-body">
        <!-- Loading -->
        <div v-if="loadingPopupBanners" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2 text-muted">Loading popup banners...</p>
        </div>

        <!-- Empty -->
        <div v-else-if="popupBanners.length === 0" class="text-center py-5">
          <p class="text-muted">
            No popup banners found. Create your first banner!
          </p>
        </div>

        <!-- Table -->
        <div v-else class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(banner, index) in popupBanners" :key="banner.id">
                <td>
                  <span class="badge bg-secondary">
                    {{ index + 1 }}
                  </span>
                </td>

                <td>{{ banner.title }}</td>

                <td>
                  <img
                    v-if="banner.image"
                    :src="banner.image"
                    alt="banner"
                    style="height: 40px; object-fit: cover"
                  />
                  <span v-else>-</span>
                </td>

                <td>{{ banner.start_date || "-" }}</td>
                <td>{{ banner.end_date || "-" }}</td>

                <td class="text-end">
                  <div class="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-primary"
                      @click="$emit('edit-banner', banner)"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>

                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger"
                      @click="$emit('delete-banner', banner)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Optional pagination slot -->
        <div v-if="$slots.pagination" class="mt-3">
          <slot name="pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PopupBanner } from "~/types/popupBanner";

defineProps<{
  popupBanners: PopupBanner[];
  loadingPopupBanners: boolean;
  isActive?: boolean;
}>();

defineEmits<{
  "create-banner": [];
  "edit-banner": [banner: PopupBanner];
  "delete-banner": [banner: PopupBanner];
}>();
</script>

<style scoped>
.table .badge {
  font-weight: 600;
}

.table .badge.bg-secondary {
  background-color: #e5e7eb !important;
  color: #374151 !important;
}
</style>
