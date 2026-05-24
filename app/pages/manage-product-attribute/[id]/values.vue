<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <NuxtLink to="/manage-product-attribute" class="btn btn-secondary">
          <i class="bi bi-arrow-left me-2"></i>Back to List
        </NuxtLink>
      </div>
      <button @click="openCreateModal" class="btn btn-primary">
        <i class="bi bi-plus-circle me-2"></i>Add Value
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted">loading values...</p>
    </div>

    <!-- Table -->
    <div v-else class="card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Value</th>
              <th>Slug</th>
              <th>Status</th>
              <th class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="values.length === 0">
              <td colspan="6" class="text-center py-5 text-muted">
                Values not found yet
              </td>
            </tr>
            <tr v-for="(val, i) in values" :key="i">
              <td>{{ i }}</td>
              <td>
                <strong>{{ val.value }}</strong>
              </td>
              <td>{{ val.slug }}</td>
              <td>
                <span
                  :class="[
                    'badge',
                    val.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary',
                  ]"
                >
                  {{ val.status }}
                </span>
              </td>
              <td class="text-end">
                <button
                  @click="openEditModal(val)"
                  class="btn btn-sm btn-outline-primary me-2"
                  title="Edit"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="handleDelete(val.id)"
                  title="Hapus"
                  :disabled="deleting === val.id"
                >
                  <i
                    v-if="deleting === val.id"
                    class="bi bi-hourglass-split"
                  ></i>
                  <i v-else class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Create/Edit Value -->
    <div class="modal fade" id="valueModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ editValueId ? "Edit Nilai" : "Tambah Nilai" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveValue">
              <div class="mb-3">
                <label class="form-label">Value (e.g: Merah, 40x60 cm)</label>
                <input
                  v-model="valueForm.value"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select v-model="valueForm.status" class="form-select">
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="saving"
              >
                {{ saving ? "Saving..." : "Save" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Delete -->
    <div class="modal fade" id="deleteConfirmModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Delete Value</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">
              <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>
              Are you sure you want to delete this value.
            </p>
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
              @click="confirmDelete"
              :disabled="deleting"
            >
              <span v-if="deleting">Deleting...</span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const route = useRoute();
const attributeId = Number(route.params.id);

const {
  getAttributeValues,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} = useProductRelationsApi();

const currentAttribute = ref(null);
const values = ref([]);
const loading = ref(true);
const saving = ref(false);
const deleting = ref<number | null>(null);
const errorMessage = ref<string | null>(null);

const valueForm = ref({ value: "", sort: 0, status: "ACTIVE" });
const editValueId = ref<number | null>(null);
const deleteValueId = ref<number | null>(null);

onMounted(async () => {
  loading.value = true;
  const { data } = await getAttributeValues(attributeId);
  if (data?.success) {
    values.value = data.data;
  }
  loading.value = false;
});

const openCreateModal = () => {
  editValueId.value = null;
  valueForm.value = { value: "", sort: 0, status: "ACTIVE" };
  errorMessage.value = null;
  new bootstrap.Modal(document.getElementById("valueModal")!).show();
};

const openEditModal = (val) => {
  editValueId.value = val.id;
  valueForm.value = {
    value: val.value,
    sort: val.sort || 0,
    status: val.status || "ACTIVE",
  };
  errorMessage.value = null;
  new bootstrap.Modal(document.getElementById("valueModal")!).show();
};

const saveValue = async () => {
  saving.value = true;
  errorMessage.value = null;

  const payload = {
    attribute_id: attributeId,
    ...valueForm.value,
  };

  let res;
  if (editValueId.value) {
    res = await updateAttributeValue(editValueId.value, payload);
  } else {
    res = await createAttributeValue(payload);
  }

  if (res.error) {
    errorMessage.value = res.error.message;
  } else if (res.data?.success) {
    await fetchValues();
    bootstrap.Modal.getInstance(document.getElementById("valueModal")!)?.hide();
  }

  saving.value = false;
};

const fetchValues = async () => {
  const { data } = await getAttributeValues(attributeId);
  if (data?.success) values.value = data.data;
};

const handleDelete = (id: number) => {
  deleteValueId.value = id;
  new bootstrap.Modal(document.getElementById("deleteConfirmModal")!).show();
};

const confirmDelete = async () => {
  if (!deleteValueId.value) return;

  deleting.value = deleteValueId.value;
  errorMessage.value = null;

  const { error } = await deleteAttributeValue(deleteValueId.value);

  if (error) {
    errorMessage.value = error.message || "Gagal menghapus nilai atribut";
  } else {
    await fetchValues();
  }

  deleting.value = null;
  deleteValueId.value = null;
  bootstrap.Modal.getInstance(
    document.getElementById("deleteConfirmModal")!,
  )?.hide();
};
</script>
