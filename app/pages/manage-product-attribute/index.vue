<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-0">Manage Product Attributes</h4>
        <p class="text-muted mb-0">Manage attributes for your products</p>
      </div>
      <button @click="openCreateModal" class="btn btn-primary action-btn-dark">
        <i class="bi bi-plus-circle me-2"></i>Add Attribute
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted">Loading attributes...</p>
    </div>

    <!-- Attributes Table -->
    <div v-else class="card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Values</th>
              <th>Status</th>
              <th class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="attributes.length === 0">
              <td colspan="7" class="text-center py-5 text-muted">
                Attributes not found yet
              </td>
            </tr>
            <tr v-for="(attr, i) in attributes" :key="i + 1">
              <td>{{ i + 1 }}</td>
              <td>
                <strong>{{ attr.name }}</strong>
              </td>
              <td>{{ attr.slug }}</td>
              <td>
                <NuxtLink
                  :to="`/manage-product-attribute/${attr.id}/values`"
                  class="badge bg-info text-decoration-none"
                >
                  {{ attr.attribute_values?.length || 0 }} values
                  <i class="bi bi-arrow-right-short ms-1"></i>
                </NuxtLink>
              </td>
              <td>
                <span
                  :class="[
                    'badge',
                    attr.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary',
                  ]"
                >
                  {{ attr.status }}
                </span>
              </td>

              <td class="text-end">
                <button
                  @click="openEditModal(attr)"
                  class="btn btn-sm btn-outline-primary me-2"
                  title="Edit"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  @click="handleDelete(attr.id)"
                  title="Hapus"
                  :disabled="deleting === attr.id"
                >
                  <i
                    v-if="deleting === attr.id"
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

    <!-- Pagination -->
    <!-- <div
      v-if="!loading && totalPages > 1"
      class="d-flex justify-content-center mt-4"
    >
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button
              class="page-link"
              @click="fetchAttributes(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="fetchAttributes(page)">
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <button
              class="page-link"
              @click="fetchAttributes(currentPage + 1)"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </li>
        </ul>
      </nav> 
    </div> -->

    <!-- Modal Create/Edit Attribute -->
    <div class="modal fade" id="attributeModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ editId ? "Edit Attribute" : "Add Attribute" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAttribute">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input v-model="form.name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select v-model="form.status" class="form-select">
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <button
                type="submit"
                :class="
                  editId
                    ? 'btn btn-success w-100'
                    : 'btn btn-primary action-btn-dark w-100'
                "
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
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              Delete Attribute
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">
              Are you sure you want to delete this attribute?<br />
              <strong>All of values will be deleted.</strong><br />
              This action cannot be undone.
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
              <span v-if="deleting">
                <i class="bi bi-hourglass-split me-1"></i>Deleting...
              </span>
              <span v-else> <i class="bi bi-trash me-1"></i>Delete </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Attribute } from "~/types";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { getAttributes, createAttribute, updateAttribute, deleteAttribute } =
  useProductRelationsApi();

const attributes = ref<Attribute[]>([]);
const loading = ref(true);
const saving = ref(false);
const errorMessage = ref<string | null>(null);
const deleting = ref<number | null>(null);

const deleteId = ref<number | null>(null);

const form = ref({
  name: "",
  sort: 0,
  status: "ACTIVE",
});

const editId = ref<number | null>(null);

const fetchAttributes = async () => {
  loading.value = true;
  const { data, error } = await getAttributes();
  if (error) {
    console.error("Error fetching attributes:", error);
  } else if (data?.success) {
    attributes.value = data.data;
  }
  loading.value = false;
};

const openCreateModal = () => {
  editId.value = null;
  form.value = { name: "", sort: 0, status: "ACTIVE" };
  new bootstrap.Modal(document.getElementById("attributeModal")!).show();
};

const openEditModal = (attr: Attribute) => {
  editId.value = attr.id;
  form.value = { name: attr.name, sort: attr.sort, status: attr.status };
  new bootstrap.Modal(document.getElementById("attributeModal")!).show();
};

const saveAttribute = async () => {
  saving.value = true;
  errorMessage.value = null;

  const payload = { ...form.value };

  let res;
  if (editId.value) {
    res = await updateAttribute(editId.value, payload);
  } else {
    res = await createAttribute(payload);
  }

  if (res.error) {
    errorMessage.value = res.error.message;
  } else if (res.data?.success) {
    await fetchAttributes();
    bootstrap.Modal.getInstance(
      document.getElementById("attributeModal")!,
    )?.hide();
  }

  saving.value = false;
};

const handleDelete = (id: number) => {
  deleteId.value = id;
  errorMessage.value = null;
  new bootstrap.Modal(document.getElementById("deleteConfirmModal")!).show();
};

const confirmDelete = async () => {
  if (!deleteId.value) return;

  deleting.value = deleteId.value;
  errorMessage.value = null;

  const { error } = await deleteAttribute(deleteId.value);

  if (error) {
    errorMessage.value = error.message || "Gagal menghapus atribut";
  } else {
    await fetchAttributes();
  }

  deleting.value = null;
  deleteId.value = null;
  bootstrap.Modal.getInstance(
    document.getElementById("deleteConfirmModal")!,
  )?.hide();
};

onMounted(() => {
  fetchAttributes();
});
</script>
