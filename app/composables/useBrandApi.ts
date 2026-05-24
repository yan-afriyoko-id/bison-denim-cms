/**
 * Brand API composable
 * Handles all brand-related API calls
 */
import type {
  BrandsResponse,
  BrandResponse,
  BrandCreatePayload,
  BrandUpdatePayload,
} from "~/types/brand";

export const useBrandApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const getBrands = async (
    page: number = 1,
    perPage: number,
    sortBy?: string,
    sortDirection: "asc" | "desc" = "desc",
  ) => {
    try {
      const response = await $fetch<BrandsResponse>(`${baseURL}/brands`, {
        method: "GET",
        params: {
          page,
          per_page: perPage,
          ...(sortBy && { sort_by: sortBy }),
          sort_direction: sortDirection,
        },
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  const getAllBrands = async () => {
    try {
      const response = await $fetch<BrandsResponse>(`${baseURL}/brands/all`, {
        method: "GET",
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  const getActiveBrands = async () => {
    try {
      const response = await $fetch<BrandsResponse>(
        `${baseURL}/brands/active`,
        {
          method: "GET",
        },
      );
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  const getBrand = async (id: number) => {
    try {
      const response = await $fetch<BrandResponse>(`${baseURL}/brands/${id}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  const createBrand = async (data: BrandCreatePayload | FormData) => {
    try {
      const isFormData = data instanceof FormData;
      const token = useCookie("auth_token");
      let headers: Record<string, string> = {};

      if (isFormData) {
        headers["Accept"] = "application/json";
        if (token.value) {
          headers["Authorization"] = `Bearer ${token.value}`;
        }
      } else {
        headers = getHeaders();
      }

      const response = await $fetch<BrandResponse>(`${baseURL}/brands`, {
        method: "POST",
        body: data,
        headers,
      });
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
          errors: error.data?.errors || {},
        },
      };
    }
  };

  const updateBrand = async (
    id: number,
    data: BrandUpdatePayload | FormData,
  ) => {
    try {
      const isFormData = data instanceof FormData;
      const token = useCookie("auth_token");
      let headers: Record<string, string> = {};
      let requestBody: BrandUpdatePayload | FormData = data;
      let method: "PUT" | "POST" = "PUT";

      if (isFormData) {
        const formData = data as FormData;
        formData.append("_method", "PUT");
        requestBody = formData;
        method = "POST";

        headers["Accept"] = "application/json";
        if (token.value) {
          headers["Authorization"] = `Bearer ${token.value}`;
        }
      } else {
        headers = getHeaders();
      }

      const response = await $fetch<BrandResponse>(`${baseURL}/brands/${id}`, {
        method,
        body: requestBody,
        headers,
      });
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
          errors: error.data?.errors || {},
        },
      };
    }
  };

  const deleteBrand = async (id: number) => {
    try {
      const response = await $fetch<{ success: boolean; message?: string }>(
        `${baseURL}/brands/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        },
      );
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  return {
    getBrands,
    getAllBrands,
    getActiveBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
  };
};
