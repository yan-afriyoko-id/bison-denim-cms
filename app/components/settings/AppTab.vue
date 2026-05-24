<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <h5 class="card-title mb-4">Application</h5>
    <form
      @submit.prevent="$emit('save-settings', 'app')"
      enctype="multipart/form-data"
    >
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">App Name</label>
          <input
            v-model="formData.app_name"
            class="form-control"
            placeholder="JLT"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">App URL</label>
          <input
            v-model="formData.app_url"
            class="form-control"
            placeholder="http://localhost:8000"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Timezone</label>
          <input
            v-model="formData.app_timezone"
            class="form-control"
            placeholder="Asia/Jakarta"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Locale</label>
          <input
            v-model="formData.app_locale"
            class="form-control"
            placeholder="id"
          />
        </div>

        <div class="col-md-6">
          <label class="form-label"
            >App Logo (store_logo_website)</label
          >
          <div class="mb-2">
            <img
              :src="
                appLogoPreview ||
                formData.store_logo_website ||
                formData.app_logo ||
                defaultImage
              "
              alt="App Logo"
              class="img-thumbnail"
              style="max-height: 100px"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            @change="$emit('file-change', $event, 'logo')"
            class="form-control"
          />
          <div v-if="formData.store_logo_website" class="form-text">
            Current URL: {{ formData.store_logo_website }}
          </div>
          <div v-else-if="formData.app_logo" class="form-text">
            Current (legacy): {{ formData.app_logo }}
          </div>
        </div>

        <div class="col-md-6">
          <label class="form-label">Favicon (store_favicon)</label>
          <div class="mb-2">
            <img
              :src="
                appFaviconPreview ||
                formData.store_favicon ||
                formData.app_favicon ||
                defaultImage
              "
              alt="Favicon"
              class="img-thumbnail"
              style="max-height: 80px"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            @change="$emit('file-change', $event, 'favicon')"
            class="form-control"
          />
          <div v-if="formData.store_favicon" class="form-text">
            Current URL: {{ formData.store_favicon }}
          </div>
          <div v-else-if="formData.app_favicon" class="form-text">
            Current (legacy): {{ formData.app_favicon }}
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
const defaultImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="100%" height="100%" fill="%23e9ecef"/><text x="50%" y="50%" font-size="12" fill="%23909ca4" dy=".3em" text-anchor="middle">No image</text></svg>';

defineProps<{
  formData: any;
  isLoading: boolean;
  appLogoPreview?: string;
  appFaviconPreview?: string;
  isActive?: boolean;
}>();

defineEmits<{
  'save-settings': [category: string];
  'file-change': [event: Event, type: 'logo' | 'favicon'];
}>();
</script>
