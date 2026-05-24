<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <p class="text-muted mb-0">Manage blog posts</p>
      </div>
      <NuxtLink
        v-if="hasPermission('blogs.create')"
        to="/manage-blog/create"
        class="btn btn-primary"
      >
        <span class="me-2">+</span>Create New Blog Post
      </NuxtLink>
    </div>

    <!-- Filter Section -->
    <div class="card mb-4">
      <div class="card-body p-3">
        <div class="row g-2">
          <div class="col-md-4">
            <input
              v-model="filters.search"
              type="text"
              class="form-control form-control-sm"
              placeholder="Search title..."
              @input="handleSearch"
            />
          </div>
          <div class="col-md-4">
            <select
              v-model="filters.category"
              class="form-select form-select-sm"
              @change="loadBlogs(1)"
            >
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <select
              v-model="filters.status"
              class="form-select form-select-sm"
              @change="loadBlogs(1)"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Blogs Table -->
    <div v-if="hasPermission('blogs.read')" class="card">
      <div class="card-body">
        <div v-if="loadingBlogs" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Loading blogs...</p>
        </div>

        <div v-else-if="blogs.length === 0" class="text-center py-5">
          <p class="text-muted">No blog posts found. Create your first blog post!</p>
        </div>

        <div v-else>
          <div class="table-responsive">
            <table class="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th style="width: 80px;">Image</th>
                  <th>Title</th>
                  <th style="width: 120px;">Category</th>
                  <th style="width: 100px;">Status</th>
                  <th style="width: 120px;">Date</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="blog in blogs" :key="blog.id">
                  <td>
                    <img
                      v-if="blog.cover_url"
                      :src="blog.cover_url"
                      :alt="blog.title"
                      style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;"
                      @error="handleImageError($event)"
                    />
                    <div v-else style="width: 60px; height: 60px; background: #e9ecef; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                      <i class="bi bi-image" style="color: #6c757d;"></i>
                    </div>
                  </td>
                  <td>
                    <strong>{{ truncate(blog.title, 40) }}</strong>
                    <br />
                    <small class="text-muted">{{ truncate(blog.short_desc || '', 50) }}</small>
                  </td>
                  <td>
                    <span v-if="blog.category" class="badge bg-info">{{ blog.category.name }}</span>
                    <span v-else class="text-muted">-</span>
                  </td>
                  <td>
                    <span :class="`badge ${(blog.status === 'published' || blog.status === 1 || blog.status === true) ? 'bg-success' : 'bg-warning'}`">
                      {{ (blog.status === 'published' || blog.status === 1 || blog.status === true) ? 'Published' : 'Draft' }}
                    </span>
                  </td>
                  <td>{{ formatDate(blog.created_at) }}</td>
                  <td class="text-end">
                    <div class="d-flex justify-content-end gap-2">
                      <NuxtLink
                        v-if="hasPermission('blogs.update')"
                        :to="`/manage-blog/edit/${blog.id}`"
                        class="btn btn-sm btn-outline-primary"
                        title="Edit"
                      >
                        <i class="bi bi-pencil"></i>
                      </NuxtLink>
                      <button
                        v-if="hasPermission('blogs.delete')"
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        @click="handleDeleteClick(blog)"
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

          <!-- Pagination -->
          <div v-if="pagination && pagination.last_page > 1" class="mt-3">
            <div class="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center gap-2">
              <div class="text-muted text-center text-md-start small" style="font-size: 0.875rem;">
                Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
              </div>
              <nav aria-label="Page navigation">
                <ul class="pagination mb-0">
                  <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                    <a
                      class="page-link"
                      href="#"
                      @click.prevent="changePage(pagination.current_page - 1)"
                    >
                      Previous
                    </a>
                  </li>
                  <li
                    v-for="page in getPageNumbers()"
                    :key="page"
                    class="page-item"
                    :class="{ active: typeof page === 'number' && page === pagination.current_page, disabled: page === '...' }"
                  >
                    <a
                      v-if="page !== '...'"
                      class="page-link"
                      href="#"
                      @click.prevent="changePage(Number(page))"
                    >
                      {{ page }}
                    </a>
                    <span v-else class="page-link">{{ page }}</span>
                  </li>
                  <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                    <a
                      class="page-link"
                      href="#"
                      @click.prevent="changePage(pagination.current_page + 1)"
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card">
      <div class="card-body">
        <div class="text-center py-5">
          <p class="text-muted">You don't have permission to view blogs.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- BlogCreateModal and BlogEditModal are no longer used - replaced with dedicated pages -->
    <BlogDeleteModal
      v-if="blogToDelete"
      :blog="blogToDelete"
      @deleted="handleBlogDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import type { Blog, CategoryBlog } from '~/types/blog'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

useHead({
  title: "Blog Management - Karsindo",
})

const { getBlogs, getCategories } = useBlogApi()
const { hasPermission } = usePermission()

const blogs = ref<Blog[]>([])
const loadingBlogs = ref(false)
const currentPage = ref(1)
const perPage = ref(15)
const pagination = ref<{
  current_page: number
  per_page: number
  total: number
  last_page: number
  from: number | null
  to: number | null
} | null>(null)

const categories = ref<CategoryBlog[]>([])
const loadingCategories = ref(false)

const blogToDelete = ref<Blog | null>(null)

const filters = ref({
  search: '',
  category: '',
  status: ''
})

const loadBlogs = async (page: number = currentPage.value) => {
  loadingBlogs.value = true
  currentPage.value = page
  
  const { data, error } = await getBlogs({
    page,
    per_page: perPage.value,
    ...(filters.value.search && { search: filters.value.search }),
    ...(filters.value.category && { category: filters.value.category }),
    ...(filters.value.status && { status: filters.value.status as 'published' | 'draft' }),
  })

  if (error || !data?.success) {
    console.error("Failed to load blogs:", error)
  } else if (data.data) {
    // Handle response structure
    if (Array.isArray(data.data)) {
      blogs.value = data.data
    } else if (data.data.blogs) {
      blogs.value = data.data.blogs
      if (data.data.pagination) {
        pagination.value = {
          ...data.data.pagination,
          from: data.data.pagination.from || null,
          to: data.data.pagination.to || null,
        }
      }
    }
  }

  loadingBlogs.value = false
}

const loadCategories = async () => {
  loadingCategories.value = true
  const { data, error } = await getCategories()

  if (error || !data?.success) {
    console.error("Failed to load categories:", error)
  } else if (data.data) {
    // Handle response structure
    if (Array.isArray(data.data)) {
      categories.value = data.data
    } else if (data.data && 'categories' in data.data && Array.isArray(data.data.categories)) {
      categories.value = data.data.categories
    }
  }

  loadingCategories.value = false
}

const changePage = (page: number) => {
  if (page >= 1 && page <= (pagination.value?.last_page || 1)) {
    loadBlogs(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const getPageNumbers = (): (number | string)[] => {
  if (!pagination.value) return []
  
  const current = pagination.value.current_page
  const last = pagination.value.last_page
  const pages: (number | string)[] = []
  
  if (last <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= last; i++) {
      pages.push(i)
    }
  } else {
    // Show first page
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    // Show pages around current
    const start = Math.max(2, current - 1)
    const end = Math.min(last - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < last - 2) {
      pages.push('...')
    }
    
    // Show last page
    pages.push(last)
  }
  
  return pages
}

const { showModal } = useModal()

const handleDeleteClick = async (blog: Blog) => {
  blogToDelete.value = blog
  await nextTick()
  await showModal('deleteBlogModal')
}

const handleSearch = () => {
  loadBlogs(1)
}

const handleBlogDeleted = () => {
  blogToDelete.value = null
  // If current page becomes empty, go to previous page
  if (blogs.value.length === 1 && currentPage.value > 1) {
    loadBlogs(currentPage.value - 1)
  } else {
    loadBlogs(currentPage.value)
  }
}

const truncate = (text: string, length: number) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (date: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID')
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.style.display = 'none'
    const parent = target.parentElement
    if (parent) {
      const placeholder = document.createElement('div')
      placeholder.style.cssText = 'width: 60px; height: 60px; background: #e9ecef; border-radius: 4px; display: flex; align-items: center; justify-content: center;'
      placeholder.innerHTML = '<i class="bi bi-image" style="color: #6c757d;"></i>'
      parent.appendChild(placeholder)
    }
  }
}

onMounted(async () => {
  await Promise.all([loadCategories(), loadBlogs()])
})
</script>
