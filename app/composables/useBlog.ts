
export const useBlog = () => {
  const { 
    getBlogs, 
    getBlogBySlug, 
    createBlog: createBlogApi, 
    updateBlog: updateBlogApi, 
    deleteBlog: deleteBlogApi, 
    getCategories, 
    createCategory: createCategoryApi, 
    updateCategory: updateCategoryApi, 
    deleteCategory: deleteCategoryApi 
  } = useBlogApi()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch all blog posts dengan filter
   */
  const fetchBlogs = async (filters?: {
    page?: number
    per_page?: number
    category?: string | number
    status?: 'published' | 'draft'
    search?: string
    token?: string
  }) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getBlogs({
        page: filters?.page,
        per_page: filters?.per_page,
        category: filters?.category,
        status: filters?.status,
        search: filters?.search,
      })

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch blogs'
        error.value = message
        console.error('Fetch blogs error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch blogs'
      error.value = message
      console.error('Fetch blogs error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch single blog by slug
   */
  const fetchBlogBySlug = async (slug: string, token?: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getBlogBySlug(slug)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch blog'
        error.value = message
        console.error('Fetch blog error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch blog'
      error.value = message
      console.error('Fetch blog error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create new blog post
   */
  const createBlogPost = async (data: any, token: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await createBlogApi({
        title: data.title,
        short_desc: data.short_desc || data.excerpt || '',
        long_desc: data.long_desc || data.content || '',
        fk_category: data.fk_category || data.category_id,
        slug: data.slug,
        status: data.status === 'published' || data.status === 1 ? 'published' : 'draft',
        hot_news: data.hot_news,
        meta_title: data.meta_title || data.title,
        meta_description: data.meta_description || data.short_desc || '',
        cover: data.cover,
      })

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to create blog'
        error.value = message
        console.error('Create blog error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create blog'
      error.value = message
      console.error('Create blog error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update blog post
   */
  const updateBlogPost = async (id: string | number, data: any, token: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await updateBlogApi(id, {
        title: data.title,
        short_desc: data.short_desc || data.excerpt,
        long_desc: data.long_desc || data.content,
        fk_category: data.fk_category || data.category_id,
        slug: data.slug,
        status: data.status === 'published' || data.status === 1 ? 'published' : 'draft',
        hot_news: data.hot_news,
        meta_title: data.meta_title || data.title,
        meta_description: data.meta_description || data.short_desc,
        cover: data.cover,
      })

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to update blog'
        error.value = message
        console.error('Update blog error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update blog'
      error.value = message
      console.error('Update blog error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete blog post
   */
  const deleteBlogPost = async (id: string | number, token: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await deleteBlogApi(id)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to delete blog'
        error.value = message
        console.error('Delete blog error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete blog'
      error.value = message
      console.error('Delete blog error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch all blog categories
   */
  const fetchCategories = async (token?: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await getCategories()

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to fetch categories'
        error.value = message
        console.error('Fetch categories error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch categories'
      error.value = message
      console.error('Fetch categories error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Create blog category
   */
  const createCategory = async (data: any, token: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await createCategoryApi({
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        status: data.status !== undefined ? data.status : true,
      })

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to create category'
        error.value = message
        console.error('Create category error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create category'
      error.value = message
      console.error('Create category error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update blog category
   */
  const updateCategory = async (id: string | number, data: any, token: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await updateCategoryApi(id, {
        name: data.name,
        slug: data.slug,
        description: data.description,
        status: data.status !== undefined ? data.status : true,
      })

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to update category'
        error.value = message
        console.error('Update category error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update category'
      error.value = message
      console.error('Update category error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete blog category
   */
  const deleteCategory = async (id: string | number, token: string) => {
    try {
      isLoading.value = true
      error.value = null

      const { data: response, error: apiError } = await deleteCategoryApi(id)

      if (apiError || !response?.success) {
        const message = apiError?.message || response?.message || 'Failed to delete category'
        error.value = message
        console.error('Delete category error:', message)
        return null
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete category'
      error.value = message
      console.error('Delete category error:', message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  // ✅ Return semua fungsi dengan nama yang sama untuk backward compatibility
  return {
    isLoading,
    error,
    fetchBlogs,
    fetchBlogBySlug,
    createBlog: createBlogPost, // Alias untuk backward compatibility
    updateBlog: updateBlogPost, // Alias untuk backward compatibility
    deleteBlog: deleteBlogPost, // Alias untuk backward compatibility
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
