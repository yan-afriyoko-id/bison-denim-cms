import type { OrdersResponse, OrderResponse } from '~/types/order'

export const useOrderApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  /**
   * Fetch all orders with filters
   */
  const getOrders = async (
    page: number = 1,
    perPage: number = 15,
    search?: string,
    status?: string
  ) => {
    try {
      const params: Record<string, any> = {
        page,
        per_page: perPage,
        ...(search && { search }),
        ...(status  && { status }),
      }

      const response = await $fetch<OrdersResponse>(`${baseURL}/orders`, {
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

  /**
   * Fetch single order by ID
   */
  const getOrder = async (id: number | string) => {
    try {
      const response = await $fetch<OrderResponse>(`${baseURL}/orders/${id}`, {
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

  /**
   * Fetch order by order number
   */
  const getOrderByNumber = async (orderNumber: string) => {
    try {
      const response = await $fetch<OrderResponse>(
        `${baseURL}/orders/order-number/${orderNumber}`,
        {
          method: 'GET',
          headers: getHeaders(),
        }
      )
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

  /**
   * Update payment status
   */
  const updatePaymentStatus = async (
    id: number | string,
    status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'REFUNDED'
  ) => {
    try {
      const response = await $fetch<OrderResponse>(
        `${baseURL}/orders/${id}/payment-status`,
        {
          method: 'PUT',
          body: { payment_status: status },
          headers: getHeaders(),
        }
      )
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

  /**
   * Update order status and resi number
   */
  const updateOrderStatus = async (
    id: number | string,
    status: 'PENDING' | 'PACKING' | 'DELIVERING' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED',
    resiNumber?: string | null
  ) => {
    try {
      const body: Record<string, any> = { status }
      if (resiNumber !== undefined) {
        body.courier_resi_number = resiNumber
      }

      const response = await $fetch<OrderResponse>(
        `${baseURL}/orders/${id}/status`,
        {
          method: 'PUT',
          body,
          headers: getHeaders(),
        }
      )
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
    getOrders,
    getOrder,
    getOrderByNumber,
    updatePaymentStatus,
    updateOrderStatus,
  }
}
