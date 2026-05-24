/**
 * Blog helper utilities
 * Provides default values and data transformation for blog data
 */
import type { Blog, CategoryBlog } from '~/types/blog'

/**
 * Normalize blog data with default values
 * Ensures all required fields have values even if backend doesn't provide them
 */
export const normalizeBlog = (blog: any): Blog => {
  if (!blog) {
    return getDefaultBlog()
  }

  return {
    id: blog.id || 0,
    title: blog.title || 'Untitled Blog',
    slug: blog.slug || '',
    short_desc: blog.short_desc || blog.shortDesc || null,
    long_desc: blog.long_desc || blog.longDesc || null,
    cover: blog.cover || null,
    cover_url: blog.cover_url || blog.coverUrl || blog.featured_image || blog.featuredImage || null,
    fk_category: blog.fk_category || blog.fkCategory || blog.category_id || blog.categoryId || null,
    category: blog.category ? normalizeCategory(blog.category) : null,
    status: blog.status !== undefined ? blog.status : 1,
    hot_news: blog.hot_news !== undefined ? Boolean(blog.hot_news || blog.hotNews) : false,
    meta_title: blog.meta_title || blog.metaTitle || blog.title || null,
    meta_description: blog.meta_description || blog.metaDescription || blog.short_desc || null,
    views: blog.views || 0,
    created_at: blog.created_at || blog.createdAt || blog.created_date || new Date().toISOString(),
    updated_at: blog.updated_at || blog.updatedAt || new Date().toISOString(),
  }
}

/**
 * Normalize category blog data with default values
 */
export const normalizeCategory = (category: any): CategoryBlog => {
  if (!category) {
    return getDefaultCategory()
  }

  return {
    id: category.id || 0,
    name: category.name || 'Uncategorized',
    slug: category.slug || '',
    description: category.description || null,
    status: category.status !== undefined ? category.status : true,
    created_at: category.created_at || category.createdAt || null,
    updated_at: category.updated_at || category.updatedAt || null,
  }
}

/**
 * Get default blog object
 */
export const getDefaultBlog = (): Blog => {
  return {
    id: 0,
    title: 'Untitled Blog',
    slug: '',
    short_desc: null,
    long_desc: null,
    cover: null,
    cover_url: null,
    fk_category: null,
    category: null,
    status: 1,
    hot_news: false,
    meta_title: null,
    meta_description: null,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

/**
 * Get default category object
 */
export const getDefaultCategory = (): CategoryBlog => {
  return {
    id: 0,
    name: 'Uncategorized',
    slug: '',
    description: null,
    status: true,
    created_at: null,
    updated_at: null,
  }
}

/**
 * Extract tags from blog (if tags field exists, otherwise generate from category)
 */
export const extractBlogTags = (blog: Blog | any): string[] => {
  // If blog has tags field, use it
  if (blog?.tags && Array.isArray(blog.tags)) {
    return blog.tags
  }

  // Otherwise, generate tags from category name
  const tags: string[] = []
  if (blog?.category?.name) {
    tags.push(blog.category.name)
  }

  // Add hot_news tag if applicable
  if (blog?.hot_news || blog?.hotNews) {
    tags.push('Hot News')
  }

  return tags.length > 0 ? tags : ['Blog']
}

/**
 * Format blog date for display
 */
export const formatBlogDate = (date: string | null | undefined): string => {
  if (!date) {
    return new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  try {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}

