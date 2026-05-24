/**
 * Blog API composable
 * Handles all blog-related API calls
 */
import type { BlogsResponse, BlogResponse, BlogCreatePayload, BlogUpdatePayload, CategoryBlogCreatePayload, CategoryBlogUpdatePayload } from '~/types/blog'

export const useBlogApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  const getBlogs = async (filters?: {
    page?: number
    per_page?: number
    category?: string | number
    status?: 'published' | 'draft'
    search?: string
  }) => {
    try {
      const params: Record<string, any> = {}
      if (filters?.page) params.page = filters.page
      if (filters?.per_page) params.per_page = filters.per_page
      if (filters?.category) params.category = filters.category
      if (filters?.status) params.status = filters.status
      if (filters?.search) params.search = filters.search

      const response = await $fetch<BlogsResponse>(`${baseURL}/blogs`, {
        method: 'GET',
        params,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getBlogBySlug = async (slug: string) => {
    try {
      // Try public endpoint first (if available)
      const response = await $fetch<BlogResponse>(`${baseURL}/blogs/slug/${slug}`, {
        method: 'GET',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      // If auth required, try using filter endpoint
      try {
        const filterResponse = await $fetch<BlogsResponse>(`${baseURL}/blogs/filter`, {
          method: 'GET',
          params: {
            search: slug,
            per_page: 1,
          },
          headers: getHeaders(),
        })
        
        if (filterResponse?.success && filterResponse.data) {
          const blogs = Array.isArray(filterResponse.data) 
            ? filterResponse.data 
            : filterResponse.data.blogs || []
          const blog = blogs.find((b: any) => b.slug === slug)
          
          if (blog) {
            return {
              data: {
                success: true,
                data: { blog },
              },
              error: null,
            }
          }
        }
      } catch (filterError) {
        // Ignore filter error, return original error
      }
      
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getActiveBlogs = async () => {
    try {
      const response = await $fetch<BlogsResponse>(`${baseURL}/blogs/active`, {
        method: 'GET',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getHotNews = async () => {
    try {
      const response = await $fetch<BlogsResponse>(`${baseURL}/blogs/hot-news`, {
        method: 'GET',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const filterBlogs = async (filters?: {
    search?: string
    category?: string | number
    status?: 'published' | 'draft' | 1 | 0
    hot_news?: boolean | 1 | 0
    sort_by?: string
    order?: 'asc' | 'desc'
    per_page?: number
    page?: number
  }) => {
    try {
      const params: Record<string, any> = {}
      if (filters?.search) params.search = filters.search
      if (filters?.category) params.category = filters.category
      if (filters?.status !== undefined) params.status = filters.status
      if (filters?.hot_news !== undefined) params.hot_news = filters.hot_news
      if (filters?.sort_by) params.sort_by = filters.sort_by
      if (filters?.order) params.order = filters.order
      if (filters?.per_page) params.per_page = filters.per_page
      if (filters?.page) params.page = filters.page

      const response = await $fetch<BlogsResponse>(`${baseURL}/blogs/filter`, {
        method: 'GET',
        params,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const createBlog = async (data: BlogCreatePayload) => {
    try {
      const formData = new FormData()
      if (data.cover instanceof File) formData.append('cover', data.cover)
      formData.append('title', data.title)
      formData.append('short_desc', data.short_desc || '')
      formData.append('long_desc', data.long_desc || '')
      if (data.fk_category) formData.append('fk_category', data.fk_category.toString())
      formData.append('slug', data.slug)
      formData.append('status', data.status === 'published' || data.status === 1 ? '1' : '0')
      formData.append('hot_news', data.hot_news ? '1' : '0')
      formData.append('meta_title', data.meta_title || data.title)
      formData.append('meta_description', data.meta_description || data.short_desc || '')

      const headers: Record<string, string> = {
        'Accept': 'application/json',
      }
      const token = useCookie('auth_token')
      if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`
      }

      const response = await $fetch<BlogResponse>(`${baseURL}/blogs`, {
        method: 'POST',
        body: formData,
        headers,
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.data?.errors || {},
        },
      }
    }
  }

  const updateBlog = async (id: string | number, data: BlogUpdatePayload) => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      if (data.cover instanceof File) formData.append('cover', data.cover)
      if (data.title) formData.append('title', data.title)
      if (data.short_desc !== undefined) formData.append('short_desc', data.short_desc)
      if (data.long_desc !== undefined) formData.append('long_desc', data.long_desc)
      if (data.fk_category) formData.append('fk_category', data.fk_category.toString())
      if (data.slug) formData.append('slug', data.slug)
      if (data.status !== undefined) {
        formData.append('status', data.status === 'published' || data.status === 1 ? '1' : '0')
      }
      if (data.hot_news !== undefined) formData.append('hot_news', data.hot_news ? '1' : '0')
      if (data.meta_title) formData.append('meta_title', data.meta_title)
      if (data.meta_description) formData.append('meta_description', data.meta_description || '')

      const headers: Record<string, string> = {
        'Accept': 'application/json',
      }
      const token = useCookie('auth_token')
      if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`
      }

      const response = await $fetch<BlogResponse>(`${baseURL}/blogs/${id}`, {
        method: 'POST',
        body: formData,
        headers,
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.data?.errors || {},
        },
      }
    }
  }

  const deleteBlog = async (id: string | number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>(`${baseURL}/blogs/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getCategories = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        data?: any[]
        message?: string
      }>(`${baseURL}/category-blogs`, {
        method: 'GET',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getActiveCategories = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        data?: any[]
        message?: string
      }>(`${baseURL}/category-blogs/active`, {
        method: 'GET',
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const createCategory = async (data: CategoryBlogCreatePayload) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data?: any
        errors?: Record<string, string[]>
      }>(`${baseURL}/category-blogs`, {
        method: 'POST',
        body: {
          name: data.name,
          slug: data.slug,
          description: data.description || '',
          status: data.status !== undefined ? data.status : true,
        },
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.data?.errors || {},
        },
      }
    }
  }

  const updateCategory = async (id: string | number, data: CategoryBlogUpdatePayload) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data?: any
        errors?: Record<string, string[]>
      }>(`${baseURL}/category-blogs/${id}`, {
        method: 'PUT',
        body: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          status: data.status,
        },
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.data?.errors || {},
        },
      }
    }
  }

  const deleteCategory = async (id: string | number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>(`${baseURL}/category-blogs/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getAllBlogs = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        data?: {
          blogs: Array<{
            id: number
            title: string
            slug: string
            short_desc?: string | null
            long_desc?: string | null
            cover?: string | null
            status?: number
            hot_news?: boolean
            fk_category?: number | null
            category?: {
              id: number
              name: string
              slug: string
            } | null
            created_at?: string
            updated_at?: string
          }>
        }
      }>(`${baseURL}/blogs/all`, {
        method: 'GET',
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  return {
    getBlogs,
    getAllBlogs,
    getBlogBySlug,
    getActiveBlogs,
    getHotNews,
    getActiveCategories,
    filterBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}

