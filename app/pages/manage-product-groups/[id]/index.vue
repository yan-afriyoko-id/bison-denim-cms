<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-0">Sub-Groups of {{ group?.title || "Group" }}</h4>
        <p class="text-muted mb-0">Manage sub-groups under this group</p>
      </div>
      <div>
        <button class="btn btn-primary action-btn-dark me-2" @click="openCreateModal">
          <i class="bi bi-plus-circle me-1"></i>Tambah Sub-Group
        </button>
        <NuxtLink
          :to="`/manage-product-groups/${groupId}/edit`"
          class="btn btn-secondary"
        >
          <i class="bi bi-arrow-left me-1"></i>Back to Group
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else-if="subGroups.length === 0" class="card text-center py-5">
      <h5>Belum ada sub-group</h5>
      <p class="text-muted">Tambahkan sub-group baru</p>
    </div>

    <div v-else class="card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Sort</th>
              <th>Jumlah Produk</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sub in subGroups" :key="sub.id">
              <td>{{ sub.title }}</td>
              <td>
                <span
                  :class="[
                    'badge',
                    sub.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary',
                  ]"
                >
                  {{ sub.status }}
                </span>
              </td>
              <td>{{ sub.sort }}</td>
              <td>{{ sub.products?.length || 0 }}</td>
              <td class="text-end">
                <NuxtLink
                  :to="`/manage-product-groups/${groupId}/sub-groups/${sub.id}`"
                  class="btn btn-sm btn-outline-success me-1"
                >
                  <i class="bi bi-box-seam"></i>
                </NuxtLink>
                <button
                  class="btn btn-sm btn-outline-primary me-1"
                  @click="openEditModal(sub)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  :disabled="deleting === sub.id"
                  @click="handleDelete(sub.id)"
                >
                  <i
                    v-if="deleting === sub.id"
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

    <div
      v-if="showCreateModal"
      class="modal fade show d-block"
      style="background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Sub-Group</h5>
            <button class="btn-close" @click="closeCreateModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input v-model="form.title" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Status</label>
              <select v-model="form.status" class="form-select">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Sort</label>
              <input
                v-model.number="form.sort"
                type="number"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeCreateModal">
              Batal
            </button>
            <button
              class="btn btn-primary"
              :disabled="submitting"
              @click="handleCreate"
            >
              <span
                v-if="submitting"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showEditModal"
      class="modal fade show d-block"
      style="background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Sub-Group</h5>
            <button class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input v-model="editForm.title" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Status</label>
              <select v-model="editForm.status" class="form-select">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Sort</label>
              <input
                v-model.number="editForm.sort"
                type="number"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeEditModal">
              Batal
            </button>
            <button
              class="btn btn-primary"
              :disabled="updating"
              @click="handleUpdate"
            >
              <span
                v-if="updating"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              Simpan
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
const groupId = route.params.id as string;

const { getProductGroup } = useProductGroupApi();
const { getSubGroups, deleteSubGroup, createSubGroup, updateSubGroup } =
  useProductSubGroupApi();

const group = ref<any>(null);
const subGroups = ref<any[]>([]);
const loading = ref(true);
const deleting = ref<number | null>(null);

const showCreateModal = ref(false);
const submitting = ref(false);

const form = reactive({
  title: "",
  status: "ACTIVE",
  sort: 0,
});

const showEditModal = ref(false);
const updating = ref(false);
const editingId = ref<number | null>(null);

const editForm = reactive({
  title: "",
  status: "ACTIVE",
  sort: 0,
});

const fetchData = async () => {
  loading.value = true;
  const { data: groupRes } = await getProductGroup(groupId);
  if (groupRes?.success) group.value = groupRes.data;
  const { data: subRes } = await getSubGroups(groupId);
  if (subRes?.success) subGroups.value = subRes.data || [];
  loading.value = false;
};

const openCreateModal = () => (showCreateModal.value = true);

const closeCreateModal = () => {
  showCreateModal.value = false;
  form.title = "";
  form.status = "ACTIVE";
  form.sort = 0;
};

const handleCreate = async () => {
  submitting.value = true;
  const { error } = await createSubGroup(groupId, form);
  submitting.value = false;
  if (error) return useToast().error("Gagal menambahkan sub-group");
  closeCreateModal();
  await fetchData();
};

const openEditModal = (sub: any) => {
  editingId.value = sub.id;
  editForm.title = sub.title;
  editForm.status = sub.status;
  editForm.sort = sub.sort;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingId.value = null;
};

const handleUpdate = async () => {
  if (!editingId.value) return;
  updating.value = true;
  const { error } = await updateSubGroup(groupId, editingId.value, editForm);
  updating.value = false;
  if (error) return alert("Gagal update sub-group");
  closeEditModal();
  await fetchData();
};

const handleDelete = async (id: number) => {
  if (!confirm("Yakin hapus sub-group ini?")) return;
  deleting.value = id;
  const { error } = await deleteSubGroup(groupId, id);
  deleting.value = null;
  if (error) return alert("Gagal menghapus sub-group");
  await fetchData();
};

onMounted(fetchData);
</script>
