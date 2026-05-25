<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-0">Edit Blog Post</h4>
        <p class="text-muted mb-0">Update blog post information</p>
      </div>
      <NuxtLink to="/manage-blog" class="btn btn-secondary">
        <i class="bi bi-arrow-left me-2"></i>Back to List
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="loadingBlog" class="card">
      <div class="card-body text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Loading blog post...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="blogError" class="card">
      <div class="card-body">
        <div class="alert alert-danger">
          {{ blogError }}
        </div>
        <NuxtLink to="/manage-blog" class="btn btn-secondary">
          <i class="bi bi-arrow-left me-2"></i>Back to List
        </NuxtLink>
      </div>
    </div>

    <!-- Form Card -->
    <div v-else class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="row g-3">
            <!-- Title -->
            <div class="col-12">
              <label for="blog_title" class="form-label fw-medium">
                Title <span class="text-danger">*</span>
              </label>
              <input
                id="blog_title"
                v-model="form.title"
                type="text"
                required
                class="form-control"
                :class="{ 'is-invalid': errors.title }"
                placeholder="Enter blog title"
                @input="generateSlugFromTitle"
              />
              <div v-if="errors.title" class="invalid-feedback d-block">
                {{ errors.title[0] }}
              </div>
            </div>

            <!-- Slug -->
            <div class="col-12">
              <label for="blog_slug" class="form-label fw-medium">
                Slug
              </label>
              <input
                id="blog_slug"
                v-model="form.slug"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.slug }"
                placeholder="Auto generated slug"
                readonly
                style="background:#f8f9fa;"
              />
              <div v-if="errors.slug" class="invalid-feedback d-block">
                {{ errors.slug[0] }}
              </div>
            </div>

            <!-- Short Description -->
            <div class="col-12">
              <label for="blog_short_desc" class="form-label fw-medium">
                Short Description (Excerpt) <span class="text-danger">*</span>
              </label>
              <textarea
                id="blog_short_desc"
                v-model="form.short_desc"
                class="form-control"
                rows="3"
                required
                :class="{ 'is-invalid': errors.short_desc }"
                placeholder="Short summary of the blog post"
              ></textarea>
              <div v-if="errors.short_desc" class="invalid-feedback d-block">
                {{ errors.short_desc[0] }}
              </div>
            </div>

            <!-- Content (Long Description) -->
            <div class="col-12">
              <label for="blog_long_desc" class="form-label fw-medium">
                Content <span class="text-danger">*</span>
              </label>
              <TiptapEditor
                v-model="form.long_desc"
                placeholder="Write your blog content here..."
                :error-message="errors.long_desc ? errors.long_desc[0] : ''"
                :disabled="loadingBlog"
              />
            </div>

            <!-- Category -->
            <div class="col-md-6">
              <label for="blog_category" class="form-label fw-medium">
                Category <span class="text-danger">*</span>
              </label>
              <select
                id="blog_category"
                v-model="form.fk_category"
                required
                class="form-select"
                :class="{ 'is-invalid': errors.fk_category }"
                :disabled="loadingCategories"
              >
                <option value="">Select category</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
              <div v-if="errors.fk_category" class="invalid-feedback d-block">
                {{ errors.fk_category[0] }}
              </div>
            </div>

            <!-- Status -->
            <div class="col-md-6">
              <label class="form-label fw-medium">Status</label>
              <div>
                <div class="form-check form-check-inline">
                  <input
                    id="blog_status_draft"
                    v-model="form.status"
                    class="form-check-input"
                    type="radio"
                    name="blog_status"
                    value="draft"
                  />
                  <label class="form-check-label" for="blog_status_draft">
                    Draft
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="blog_status_published"
                    v-model="form.status"
                    class="form-check-input"
                    type="radio"
                    name="blog_status"
                    value="published"
                  />
                  <label class="form-check-label" for="blog_status_published">
                    Published
                  </label>
                </div>
              </div>
            </div>

            <!-- Featured Image -->
            <div class="col-12">
              <label for="blog_cover" class="form-label fw-medium">
                Featured Image
              </label>
              <input
                id="blog_cover"
                type="file"
                accept="image/*"
                class="form-control"
                :class="{ 'is-invalid': errors.cover }"
                @change="handleImageUpload"
              />
              <small class="text-muted">Max 2MB, JPG/PNG. Leave empty to keep current image.</small>
              <div v-if="errors.cover" class="invalid-feedback d-block">
                {{ errors.cover[0] }}
              </div>
              <div v-if="imagePreview || currentImage" class="mt-3">
                <img 
                  :src="imagePreview || currentImage" 
                  alt="Preview" 
                  style="max-width: 100%; max-height: 300px; border-radius: 4px; object-fit: cover; background: #f8f9fa; padding: 8px;"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Hot News -->
            <div class="col-12">
              <div class="form-check">
                <input
                  id="blog_hot_news"
                  v-model="form.hot_news"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label" for="blog_hot_news">
                  Hot News
                </label>
              </div>
            </div>

            <!-- Meta Title -->
            <div class="col-md-6">
              <label for="blog_meta_title" class="form-label fw-medium">
                Meta Title (SEO)
              </label>
              <input
                id="blog_meta_title"
                v-model="form.meta_title"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.meta_title }"
                placeholder="Leave empty to use title"
              />
              <small class="text-muted">Leave empty to use blog title</small>
              <div v-if="errors.meta_title" class="invalid-feedback d-block">
                {{ errors.meta_title[0] }}
              </div>
            </div>

            <!-- Meta Description -->
            <div class="col-md-6">
              <label for="blog_meta_description" class="form-label fw-medium">
                Meta Description (SEO)
              </label>
              <input
                id="blog_meta_description"
                v-model="form.meta_description"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.meta_description }"
                placeholder="Leave empty to use short description"
              />
              <small class="text-muted">Leave empty to use short description</small>
              <div v-if="errors.meta_description" class="invalid-feedback d-block">
                {{ errors.meta_description[0] }}
              </div>
            </div>

            <!-- Error/Success Message -->
            <div v-if="message" class="col-12">
              <div class="alert" :class="messageType === 'success' ? 'alert-success' : 'alert-danger'">
                {{ message }}
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="mt-4 d-flex justify-content-end gap-2">
            <NuxtLink to="/manage-blog" class="btn btn-secondary" :disabled="loading">
              Cancel
            </NuxtLink>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <span v-if="loading">Updating...</span>
              <span v-else>Update Blog Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog, BlogUpdatePayload, CategoryBlog } from '~/types/blog'
import { generateSlug } from '~/utils/helpers'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const blogId = computed(() => route.params.id as string)

useHead({
  title: "Edit Blog Post - Bison Denim",
})

const { updateBlog, getAllBlogs, getCategories } = useBlogApi()
const toast = useToast()

const form = reactive<BlogUpdatePayload & { status: 'published' | 'draft' }>({
  title: '',
  slug: '',
  short_desc: '',
  long_desc: '',
  fk_category: undefined,
  cover: undefined,
  status: 'draft',
  hot_news: false,
  meta_title: '',
  meta_description: '',
})

const categories = ref<CategoryBlog[]>([])
const loadingCategories = ref(false)
const imagePreview = ref<string>('')
const currentImage = ref<string>('')
const errors = ref<Record<string, string[]>>({})
const message = ref('')
const messageType = ref<'success' | 'error'>('error')
const loading = ref(false)
const loadingBlog = ref(true)
const blogError = ref<string>('')

const loadCategories = async () => {
  loadingCategories.value = true
  const { data, error } = await getCategories()

  if (error || !data?.success) {
    console.error("Failed to load categories:", error)
  } else if (data.data) {
    if (Array.isArray(data.data)) {
      categories.value = data.data
    } else if (data.data && 'categories' in data.data && Array.isArray(data.data.categories)) {
      categories.value = data.data.categories
    }
  }

  loadingCategories.value = false
}

const loadBlog = async () => {
  loadingBlog.value = true
  blogError.value = ''

  const { data, error } = await getAllBlogs()

  if (error || !data?.success) {
    blogError.value = error?.message || 'Failed to load blog post'
    loadingBlog.value = false
    return
  }

  let blog: Blog | null = null

  if (data.data?.blogs) {
    blog = data.data.blogs.find((b: Blog) => b.id.toString() === blogId.value) || null
  }

  if (!blog) {
    blogError.value = 'Blog post not found'
    loadingBlog.value = false
    return
  }

  // Populate form with blog data
  form.title = blog.title
  form.slug = blog.slug
  form.short_desc = blog.short_desc || ''
  form.long_desc = blog.long_desc || ''
  form.fk_category = blog.fk_category
  form.status = (blog.status === 'published' || blog.status === 1 || (blog.status as any) === true) ? 'published' : 'draft'
  form.hot_news = (blog.hot_news === true || blog.hot_news === 1) as boolean
  form.meta_title = blog.meta_title || blog.title
  form.meta_description = blog.meta_description || blog.short_desc || ''
  form.cover = undefined
  imagePreview.value = ''
  currentImage.value = blog.cover_url || blog.cover || ''

  loadingBlog.value = false
}

const generateSlugFromTitle = () => {
  if (!form.title) {
    form.slug = ''
    return
  }
  form.slug = generateSlug(form.title)
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    form.cover = file
    // Revoke previous object URL to prevent memory leak
    if (imagePreview.value) {
      URL.revokeObjectURL(imagePreview.value)
    }
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.style.display = 'none'
    const parent = target.parentElement
    if (parent) {
      const placeholder = document.createElement('div')
      placeholder.className = 'text-center p-3 bg-light border rounded'
      placeholder.innerHTML = '<i class="bi bi-image text-muted" style="font-size: 2rem;"></i><p class="text-muted mb-0 mt-2 small">Image not available</p>'
      parent.appendChild(placeholder)
    }
  }
}

const handleSubmit = async () => {
  loading.value = true
  message.value = ''
  errors.value = {}

  // Validate content is not empty (check for text or images)
  const contentHtml = form.long_desc || ''
  const contentText = contentHtml.replace(/<[^>]*>/g, '').trim()
  const hasImage = /<img[^>]*>/i.test(contentHtml)
  
  if (!contentText && !hasImage) {
    errors.value = { long_desc: ['Content is required'] }
    message.value = 'Please fill in all required fields'
    messageType.value = 'error'
    loading.value = false
    return
  }

  const payload: BlogUpdatePayload = {
    title: form.title,
    slug: form.slug,
    short_desc: form.short_desc,
    long_desc: form.long_desc,
    fk_category: form.fk_category,
    cover: form.cover,
    status: form.status,
    hot_news: form.hot_news,
    meta_title: form.meta_title || form.title,
    meta_description: form.meta_description || form.short_desc,
  }

  const { data, error } = await updateBlog(blogId.value, payload)

  if (error) {
    message.value = error.message || 'Failed to update blog post'
    messageType.value = 'error'
    errors.value = error.errors || {}
    toast.error(error.message || 'Failed to update blog post')
  } else if (data?.success) {
    message.value = 'Blog post updated successfully!'
    messageType.value = 'success'
    errors.value = {}
    toast.success('Blog post updated successfully!')

    // Redirect to blog list after 1 second
    setTimeout(() => {
      router.push('/manage-blog')
    }, 1000)
  }

  loading.value = false
}

onMounted(async () => {
  await Promise.all([loadCategories(), loadBlog()])
})

onUnmounted(() => {
  // Clean up object URL
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
})
</script>

