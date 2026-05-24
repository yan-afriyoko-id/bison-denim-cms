/**
 * Blog types
 * Based on BlogResource from backend
 */

export interface CategoryBlog {
  id: number
  name: string
  slug: string
  description?: string
  status: boolean | 1 | 0
  created_at?: string
  updated_at?: string
}

export interface Blog {
  id: number
  title: string
  slug: string
  short_desc?: string
  long_desc?: string
  cover?: string | null
  cover_url?: string | null
  fk_category?: number
  category?: CategoryBlog
  status: 'published' | 'draft' | 1 | 0
  hot_news: boolean | 1 | 0
  meta_title?: string
  meta_description?: string
  views?: number
  created_at: string
  updated_at: string
}

export interface BlogResponse {
  success: boolean
  message?: string
  data: {
    blog: Blog
  }
}

export interface BlogsResponse {
  success: boolean
  message?: string
  data: Blog[] | {
    blogs: Blog[]
    pagination?: {
      current_page: number
      per_page: number
      total: number
      last_page: number
    }
  }
}

export interface BlogCreatePayload {
  title: string
  slug: string
  short_desc?: string
  long_desc?: string
  cover?: File
  fk_category?: number
  category_id?: number
  status?: 'published' | 'draft' | 1 | 0
  hot_news?: boolean
  meta_title?: string
  meta_description?: string
}

export interface BlogUpdatePayload extends Partial<BlogCreatePayload> {}

export interface CategoryBlogCreatePayload {
  name: string
  slug: string
  description?: string
  status?: boolean
}

export interface CategoryBlogUpdatePayload extends Partial<CategoryBlogCreatePayload> {}

