<template>
  <div
    id="editCategoryModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editCategoryModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editCategoryModalLabel">Edit Category</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetForm"
          ></button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-body">
            <div class="mb-3">
              <label for="edit_category_name" class="form-label fw-medium">
                Category Name <span class="text-danger">*</span>
              </label>
              <input
                id="edit_category_name"
                v-model="form.name"
                type="text"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                placeholder="Enter category name"
                @input="generateSlug"
              />
              <div v-if="errors.name" class="invalid-feedback">
                {{ errors.name[0] }}
              </div>
            </div>

            <div class="mb-3">
              <label for="edit_category_slug" class="form-label fw-medium">
                Slug <span class="text-danger">*</span>
              </label>
              <input
                id="edit_category_slug"
                v-model="form.slug"
                type="text"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.slug }"
                placeholder="category-slug"
              />
              <div v-if="errors.slug" class="invalid-feedback">
                {{ errors.slug[0] }}
              </div>
            </div>

            <div class="mb-3">
              <label for="edit_category_description" class="form-label fw-medium">
                Description
              </label>
              <textarea
                id="edit_category_description"
                v-model="form.description"
                class="form-control"
                rows="3"
                :class="{ 'is-invalid': errors.description }"
                placeholder="Optional category description"
              ></textarea>
              <div v-if="errors.description" class="invalid-feedback">
                {{ errors.description[0] }}
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-medium">Status</label>
              <div>
                <div class="form-check form-check-inline">
                  <input
                    id="edit_category_status_active"
                    v-model="form.status"
                    class="form-check-input"
                    type="radio"
                    name="edit_category_status"
                    :value="true"
                  />
                  <label class="form-check-label" for="edit_category_status_active">
                    Active
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="edit_category_status_inactive"
                    v-model="form.status"
                    class="form-check-input"
                    type="radio"
                    name="edit_category_status"
                    :value="false"
                  />
                  <label class="form-check-label" for="edit_category_status_inactive">
                    Inactive
                  </label>
                </div>
              </div>
              <div v-if="errors.status" class="invalid-feedback d-block">
                {{ errors.status[0] }}
              </div>
            </div>

            <div v-if="message" class="alert mt-3 mb-0" :class="messageType === 'success' ? 'alert-success' : 'alert-danger'">
              {{ message }}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              :disabled="loading"
              @click="resetForm"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-success"
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <span v-if="loading">Updating...</span>
              <span v-else>Update Category</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryBlog, CategoryBlogUpdatePayload } from '~/types/blog'

interface Props {
  category: CategoryBlog
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'updated'): void
}>()

const { updateCategory } = useBlogApi()
const toast = useToast()

const form = reactive<CategoryBlogUpdatePayload>({
  name: '',
  slug: '',
  description: '',
  status: true,
})

const errors = ref<Record<string, string[]>>({})
const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const loading = ref(false)

// Initialize form when category changes
watch(() => props.category, (category) => {
  if (category) {
    form.name = category.name
    form.slug = category.slug
    form.description = category.description || ''
    form.status = category.status === true || category.status === 1
    errors.value = {}
    message.value = ''
  }
}, { immediate: true })

const generateSlug = () => {
  form.slug = form.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const resetForm = () => {
  form.name = ''
  form.slug = ''
  form.description = ''
  form.status = true
  errors.value = {}
  message.value = ''
}

const handleSubmit = async () => {
  loading.value = true
  message.value = ''
  errors.value = {}

  const { data, error } = await updateCategory(props.category.id, form)

  if (error) {
    message.value = error.message || 'Failed to update category'
    messageType.value = 'error'
    errors.value = error.errors || {}
    toast.error(error.message || 'Failed to update category')
  } else if (data?.success) {
    message.value = 'Category updated successfully!'
    messageType.value = 'success'
    errors.value = {}
    toast.success('Category updated successfully!')

    emit('updated')

    const { closeModal } = useModal()
    closeModal('editCategoryModal')
  }

  loading.value = false
}
</script>

