export interface Province {
  id: number
  name: string
}

export interface City {
  id: number
  name: string
  zip_code: string
}

export interface ProvincesResponse {
  success: boolean
  message: string
  data: Province[]
}

export interface District {
  id: number
  name: string
}

export interface DistrictsResponse {
  success: boolean
  message: string
  data: District[]
}

export interface CitiesResponse {
  success: boolean
  message: string
  data: City[]
}

export const useShippingApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  const getProvinces = async () => {
    try {
      const response = await $fetch<ProvincesResponse>(`${baseURL}/shipping/provinces`, {
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

  const getCities = async (provinceId: number) => {
    try {
      const response = await $fetch<CitiesResponse>(`${baseURL}/shipping/cities`, {
        method: 'GET',
        params: {
          province_id: provinceId,
        },
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

  const getDistricts = async (cityId: number) => {
    try {
      const response = await $fetch<DistrictsResponse>(`${baseURL}/shipping/districts`, {
        method: 'GET',
        params: {
          city_id: cityId,
        },
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
    getProvinces,
    getCities,
    getDistricts,
  }
}
