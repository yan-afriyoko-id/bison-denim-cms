<template>
  <div
    id="deleteCategoryModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deleteCategoryModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteCategoryModalLabel">Confirm Delete</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this category?</p>
          <div class="alert alert-warning">
            <strong>{{ category.name }}</strong>
            <br>
            <small>Slug: {{ category.slug }}</small>
            <br>
            <small v-if="getBlogsCount() > 0" class="text-danger">
              Warning: This category has {{ getBlogsCount() }} blog post(s). Deleting it may affect those posts.
            </small>
          </div>
          <div v-if="message" class="alert mb-0" :class="messageType === 'success' ? 'alert-success' : 'alert-danger'">
            {{ message }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            :disabled="loading"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="handleDelete"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span v-if="loading">Deleting...</span>
            <span v-else>Delete Category</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryBlog } from '~/types/blog'

interface Props {
  category: CategoryBlog
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleted'): void
}>()

const { deleteCategory } = useBlogApi()
const toast = useToast()

const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const loading = ref(false)

// Reset message when modal opens
watch(() => props.category, () => {
  message.value = ''
}, { immediate: true })

const getBlogsCount = (): number => {
  return (props.category as any).blogs_count || 0
}

const handleDelete = async () => {
  if (!props.category) return

  loading.value = true
  message.value = ''

  const { data, error } = await deleteCategory(props.category.id)

  if (error) {
    message.value = error.message || 'Failed to delete category'
    messageType.value = 'error'
    toast.error(error.message || 'Failed to delete category')
  } else if (data?.success) {
    message.value = 'Category deleted successfully!'
    messageType.value = 'success'
    toast.success('Category deleted successfully!')

    emit('deleted')

    const { closeModal } = useModal()
    closeModal('deleteCategoryModal')
  }

  loading.value = false
}
</script>

