/**
 * Category Product API composable
 * Handles all category product-related API calls
 */

interface CategoryProduct {
  id: number
  fk_product_id: number
  fk_category_id: number
  created_at?: string
  updated_at?: string
  fk_product?: {
    id: number
    name: string
    slug: string
  }
  fk_category?: {
    id: number
    taxonomy_name: string
    taxonomy_slug: string
  }
}

interface CategoryProductsResponse {
  success: boolean
  message: string
  data: CategoryProduct[]
  total?: number
}

interface CategoryProductResponse {
  success: boolean
  message: string
  data: CategoryProduct
}

interface CategoryProductCreatePayload {
  fk_product_id: number
  fk_category_id: number
}

interface CategoryProductUpdatePayload {
  fk_product_id?: number
  fk_category_id?: number
}

export const useCategoryProductApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  const getCategoryProducts = async () => {
    try {
      const response = await $fetch<CategoryProductsResponse>(`${baseURL}/category-products`, {
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

  const getCategoryProduct = async (id: number) => {
    try {
      const response = await $fetch<CategoryProductResponse>(`${baseURL}/category-products/${id}`, {
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

  const getCategoryProductsByProduct = async (productId: number) => {
    try {
      const response = await $fetch<CategoryProductsResponse>(`${baseURL}/category-products/product/${productId}`, {
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

  const createCategoryProduct = async (payload: CategoryProductCreatePayload) => {
    try {
      const response = await $fetch<CategoryProductResponse>(`${baseURL}/category-products`, {
        method: 'POST',
        headers: getHeaders(),
        body: payload,
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.errors || {},
        },
      }
    }
  }

  const updateCategoryProduct = async (id: number, payload: CategoryProductUpdatePayload) => {
    try {
      const response = await $fetch<CategoryProductResponse>(`${baseURL}/category-products/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: payload,
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.errors || {},
        },
      }
    }
  }

  const deleteCategoryProduct = async (id: number) => {
    try {
      const response = await $fetch<{ success: boolean; message: string }>(`${baseURL}/category-products/${id}`, {
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

  const attachCategories = async (productId: number, categoryIds: number[]) => {
    try {
      const response = await $fetch<CategoryProductsResponse>(`${baseURL}/category-products/attach`, {
        method: 'POST',
        headers: getHeaders(),
        body: {
          fk_product_id: productId,
          category_ids: categoryIds,
        },
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.errors || {},
        },
      }
    }
  }

  const detachCategories = async (productId: number, categoryIds: number[]) => {
    try {
      const response = await $fetch<{ success: boolean; message: string }>(`${baseURL}/category-products/detach`, {
        method: 'POST',
        headers: getHeaders(),
        body: {
          fk_product_id: productId,
          category_ids: categoryIds,
        },
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
          errors: error.errors || {},
        },
      }
    }
  }

  return {
    getCategoryProducts,
    getCategoryProduct,
    getCategoryProductsByProduct,
    createCategoryProduct,
    updateCategoryProduct,
    deleteCategoryProduct,
    attachCategories,
    detachCategories,
  }
}
