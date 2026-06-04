<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <!-- Header + Create Button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="card-title mb-0">Main Banner Management</h5>
      <button class="btn btn-primary" @click="openCreateModal">
        <span class="me-2">+</span>Add Banner
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loadingBanners" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted">Loading banners...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="banners.length === 0" class="text-center py-5">
      <p class="text-muted">No banners found. Create your first banner!</p>
    </div>

    <!-- Table List -->
    <div v-else class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Order</th>
                <th>Preview</th>
                <th>Title</th>
                <th>Link URL</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(banner, index) in banners" :key="index">
                <td>
                  <span class="badge bg-secondary">{{
                    banner.sort_order || 0
                  }}</span>
                </td>
                <td>
                  <img
                    v-if="banner.image"
                    :src="banner.image"
                    :alt="banner.title || 'Banner'"
                    class="img-thumbnail"
                    style="
                      max-width: 150px;
                      max-height: 80px;
                      object-fit: cover;
                    "
                    @error="handleImageError"
                  />
                  <span v-else class="text-muted">No image</span>
                </td>
                <td>{{ banner.title || "-" }}</td>
                <td>
                  <a
                    v-if="banner.link_url"
                    :href="banner.link_url"
                    target="_blank"
                    class="text-truncate d-inline-block"
                    style="max-width: 200px"
                  >
                    {{ banner.link_url }}
                  </a>
                  <span v-else class="text-muted">-</span>
                </td>
                <td>
                  <span
                    :class="[
                      'badge',
                      banner.status === 'ACTIVE'
                        ? 'bg-success'
                        : 'bg-secondary',
                    ]"
                  >
                    {{ banner.status }}
                  </span>
                </td>
                <td class="text-end">
                  <div class="d-flex justify-content-end gap-2">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="openEditModal(banner)"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="openDeleteModal(banner)"
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

    <!-- ✅ Create Modal - Bootstrap Modal Instance -->
    <div
      id="createMainBannerModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="createMainBannerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createMainBannerModalLabel">
              Create New Main Banner
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetCreateForm"
            ></button>
          </div>
          <form @submit.prevent="handleCreate">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Title (Optional)</label>
                <input
                  v-model="createForm.title"
                  type="text"
                  class="form-control"
                  placeholder="Banner title"
                  maxlength="250"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">
                  Banner Image <span class="text-danger">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  class="form-control"
                  @change="handleCreateImageChange"
                  required
                />
                <div class="form-text">Max 5MB. (jpeg, jpg, png, webp)</div>
                <div v-if="createForm.imagePreview" class="mt-2">
                  <img
                    :src="createForm.imagePreview"
                    class="img-thumbnail"
                    style="max-height: 200px"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Link URL (Optional)</label>
                <input
                  v-model="createForm.link_url"
                  type="url"
                  class="form-control"
                  placeholder="https://example.com"
                />
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Sort Order</label>
                  <input
                    v-model.number="createForm.sort_order"
                    type="number"
                    class="form-control"
                    min="0"
                    placeholder="0"
                  />
                  <div class="form-text">Lower number appears first</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Status</label>
                  <select v-model="createForm.status" class="form-select">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="resetCreateForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? "Creating..." : "Create Banner" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ✅ Edit Modal - Bootstrap Modal Instance -->
    <div
      id="editMainBannerModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="editMainBannerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editMainBannerModalLabel">
              Edit Main Banner
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeEditModal"
            ></button>
          </div>
          <form @submit.prevent="handleUpdate">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Title (Optional)</label>
                <input
                  v-model="editForm.title"
                  type="text"
                  class="form-control"
                  placeholder="Banner title"
                  maxlength="250"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Banner Image</label>
                <div
                  v-if="editForm.imagePreview || bannerToEdit?.image"
                  class="mb-2"
                >
                  <img
                    :src="editForm.imagePreview || bannerToEdit?.image"
                    class="img-thumbnail"
                    style="max-height: 200px"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  class="form-control"
                  @change="handleEditImageChange"
                />
                <div class="form-text">
                  Leave empty to keep existing image. Max 5MB.
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Link URL (Optional)</label>
                <input
                  v-model="editForm.link_url"
                  type="url"
                  class="form-control"
                  placeholder="https://example.com"
                />
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Sort Order</label>
                  <input
                    v-model.number="editForm.sort_order"
                    type="number"
                    class="form-control"
                    min="0"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Status</label>
                  <select v-model="editForm.status" class="form-select">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="closeEditModal"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-success"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? "Updating..." : "Update Banner" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ✅ Delete Modal - Bootstrap Modal Instance -->
    <div
      id="deleteMainBannerModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="deleteMainBannerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteMainBannerModalLabel">
              Delete Main Banner
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete
              <strong>{{ bannerToDelete?.title || "this banner" }}</strong
              >? This action cannot be undone.
            </p>
            <div v-if="bannerToDelete?.image" class="text-center mt-3">
              <img
                :src="bannerToDelete.image"
                class="img-thumbnail"
                style="max-height: 150px"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="handleDelete"
              :disabled="isDeleting"
            >
              <span
                v-if="isDeleting"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              {{ isDeleting ? "Deleting..." : "Delete Banner" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MainBanner } from "~/types/mainBanner";
import { useMainBannerApi } from "~/composables/useMainBannerApi";

const toast = useToast();
const { getMainBanners, createMainBanner, updateMainBanner, deleteMainBanner } =
  useMainBannerApi();

// Props
const props = defineProps<{
  isActive?: boolean;
}>();

// State
const banners = ref<MainBanner[]>([]);
const loadingBanners = ref(false);
const isSubmitting = ref(false);
const isDeleting = ref(false);
const error = ref<string | null>(null);

// Modal State
const bannerToEdit = ref<MainBanner | null>(null);
const bannerToDelete = ref<MainBanner | null>(null);

// Create Form
const createForm = reactive({
  title: "",
  image: null as File | null,
  imagePreview: null as string | null,
  link_url: "",
  sort_order: 0,
  status: "ACTIVE" as "ACTIVE" | "INACTIVE",
});

// Edit Form
const editForm = reactive({
  title: "",
  image: null as File | null,
  imagePreview: null as string | null,
  link_url: "",
  sort_order: 0,
  status: "ACTIVE" as "ACTIVE" | "INACTIVE",
});

// Load Banners
const loadBanners = async () => {
  loadingBanners.value = true;
  try {
    const { data, error: apiError } = await getMainBanners(
      1,
      50,
      "sort_order",
      "asc",
    );
    if (apiError || !data?.success) {
      console.error("Failed to load main banners:", apiError);
      banners.value = [];
      toast.error("Failed to load banners");
    } else {
      banners.value = data.data.banners || [];
    }
  } catch (err) {
    console.error("Error loading main banners:", err);
    banners.value = [];
    toast.error("Error loading banners");
  } finally {
    loadingBanners.value = false;
  }
};

// Image Handlers
const handleCreateImageChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input?.files?.[0]) return;
  createForm.image = input.files[0];
  createForm.imagePreview = URL.createObjectURL(input.files[0]);
};

const handleEditImageChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input?.files?.[0]) return;
  editForm.image = input.files[0];
  editForm.imagePreview = URL.createObjectURL(input.files[0]);
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/assets/img/placeholder-banner.png";
};

const openCreateModal = async () => {
  resetCreateForm();
  await nextTick();
  const modalEl = document.getElementById("createMainBannerModal");
  if (modalEl) {
    const modal = new (window as any).bootstrap.Modal(modalEl);
    modal.show();
  }
};

const closeCreateModal = () => {
  const modalEl = document.getElementById("createMainBannerModal");
  if (modalEl) {
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
  resetCreateForm();
  error.value = null;
};

const resetCreateForm = () => {
  createForm.title = "";
  createForm.image = null;
  createForm.imagePreview = null;
  createForm.link_url = "";
  createForm.sort_order = 0;
  createForm.status = "ACTIVE";
};

const openEditModal = async (banner: MainBanner) => {
  bannerToEdit.value = banner;
  editForm.title = banner.title || "";
  editForm.image = null;
  editForm.imagePreview = null;
  editForm.link_url = banner.link_url || "";
  editForm.sort_order = banner.sort_order || 0;
  editForm.status = banner.status || "ACTIVE";
  error.value = null;

  await nextTick();
  const modalEl = document.getElementById("editMainBannerModal");
  if (modalEl) {
    const modal = new (window as any).bootstrap.Modal(modalEl);
    modal.show();
  }
};

const closeEditModal = () => {
  const modalEl = document.getElementById("editMainBannerModal");
  if (modalEl) {
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
  bannerToEdit.value = null;
  error.value = null;
};

const openDeleteModal = async (banner: MainBanner) => {
  bannerToDelete.value = banner;
  await nextTick();
  const modalEl = document.getElementById("deleteMainBannerModal");
  if (modalEl) {
    const modal = new (window as any).bootstrap.Modal(modalEl);
    modal.show();
  }
};

const closeDeleteModal = () => {
  const modalEl = document.getElementById("deleteMainBannerModal");
  if (modalEl) {
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
  bannerToDelete.value = null;
};

const handleCreate = async () => {
  if (!createForm.image) {
    error.value = "Banner image is required";
    return;
  }

  isSubmitting.value = true;
  error.value = null;

  try {
    const formData = new FormData();
    if (createForm.title) formData.append("title", createForm.title);
    formData.append("image", createForm.image);
    if (createForm.link_url) formData.append("link_url", createForm.link_url);
    formData.append("sort_order", String(createForm.sort_order));
    formData.append("status", createForm.status);

    const { data, error: apiError } = await createMainBanner(formData);
    if (apiError || !data?.success) {
      error.value = apiError?.message || "Failed to create banner";
      toast.error(error.value);
      return;
    }

    toast.success("Banner created successfully");
    closeCreateModal();
    await loadBanners();
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to create banner";
    toast.error(error.value);
  } finally {
    isSubmitting.value = false;
  }
};

const handleUpdate = async () => {
  if (!bannerToEdit.value) return;

  isSubmitting.value = true;
  error.value = null;

  try {
    const formData = new FormData();
    if (editForm.title) formData.append("title", editForm.title);
    if (editForm.image) formData.append("image", editForm.image);
    if (editForm.link_url) formData.append("link_url", editForm.link_url);
    formData.append("sort_order", String(editForm.sort_order));
    formData.append("status", editForm.status);
    formData.append("_method", "PUT");

    const { data, error: apiError } = await updateMainBanner(
      bannerToEdit.value.id,
      formData,
    );
    if (apiError || !data?.success) {
      error.value = apiError?.message || "Failed to update banner";
      toast.error(error.value);
      return;
    }

    toast.success("Banner updated successfully");
    closeEditModal();
    await loadBanners();
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to update banner";
    toast.error(error.value);
  } finally {
    isSubmitting.value = false;
  }
};

const handleDelete = async () => {
  if (!bannerToDelete.value) return;

  isDeleting.value = true;
  try {
    const { data, error: apiError } = await deleteMainBanner(
      bannerToDelete.value.id,
    );
    if (apiError || !data?.success) {
      toast.error(apiError?.message || "Failed to delete banner");
      return;
    }

    toast.success("Banner deleted successfully");
    closeDeleteModal();
    await loadBanners();
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to delete banner");
  } finally {
    isDeleting.value = false;
  }
};

onBeforeUnmount(() => {
  if (createForm.imagePreview) URL.revokeObjectURL(createForm.imagePreview);
  if (editForm.imagePreview) URL.revokeObjectURL(editForm.imagePreview);
});

watch(
  () => props.isActive,
  (isActive) => {
    if (isActive && banners.value.length === 0) {
      loadBanners();
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.table img {
  transition: transform 0.2s ease;
}
.table img:hover {
  transform: scale(1.05);
}
</style>
