<template>
  <div
    id="deleteBlogModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deleteBlogModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteBlogModalLabel">Confirm Delete</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this blog post?</p>
          <div class="alert alert-warning">
            <strong>{{ blog.title }}</strong>
            <br>
            <small>Slug: {{ blog.slug }}</small>
            <br>
            <small v-if="blog.category">Category: <span class="badge bg-info">{{ blog.category.name }}</span></small>
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
            <span v-else>Delete Blog Post</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from '~/types/blog'

interface Props {
  blog: Blog
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleted'): void
}>()

const { deleteBlog } = useBlogApi()
const toast = useToast()

const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const loading = ref(false)

// Reset message when modal opens
watch(() => props.blog, () => {
  message.value = ''
}, { immediate: true })

const handleDelete = async () => {
  if (!props.blog) return

  loading.value = true
  message.value = ''

  const { data, error } = await deleteBlog(props.blog.id)

  if (error) {
    message.value = error.message || 'Failed to delete blog post'
    messageType.value = 'error'
    toast.error(error.message || 'Failed to delete blog post')
  } else if (data?.success) {
    message.value = 'Blog post deleted successfully!'
    messageType.value = 'success'
    toast.success('Blog post deleted successfully!')

    emit('deleted')

    const { closeModal } = useModal()
    closeModal('deleteBlogModal')
  }

  loading.value = false
}
</script>

