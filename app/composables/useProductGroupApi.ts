import type {
  ProductGroupsResponse,
  ProductGroupCreatePayload,
  ProductGroupResponse,
  ProductGroupUpdatePayload,
} from "~/types/product-group";

export const useProductGroupApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const fetchWithHandling = async <T>(url: string, options: any = {}) => {
    try {
      const response = await $fetch<T>(url, {
        ...options,
        headers: getHeaders(options.isFormData ?? false),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "Terjadi kesalahan",
          errors: error.errors || {},
        },
      };
    }
  };

  const getProductGroups = async (page = 1) => {
    return fetchWithHandling<ProductGroupsResponse>(
      `${baseURL}/product-groups?page=${page}`,
      { method: "GET" },
    );
  };

  const getProductGroup = async (id: number) => {
    return fetchWithHandling<ProductGroupResponse>(
      `${baseURL}/product-groups/${id}`,
      { method: "GET" },
    );
  };

  const getProductGroupByKey = async (key: string) => {
    return fetchWithHandling<ProductGroupResponse>(
      `${baseURL}/product-groups/key/${key}`,
      { method: "GET" },
    );
  };

  const createProductGroup = async (payload: ProductGroupCreatePayload) => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("key", payload.key);
    formData.append("status", payload.status);

    if (payload.sort !== undefined) {
      formData.append("sort", payload.sort.toString());
    }

    if (payload.image) {
      formData.append("image", payload.image);
    }

    return fetchWithHandling<ProductGroupResponse>(
      `${baseURL}/product-groups`,
      {
        method: "POST",
        body: formData,
        isFormData: true,
      },
    );
  };

  const updateProductGroup = async (
    id: number,
    payload: ProductGroupUpdatePayload & { image?: File | null },
  ) => {
    const formData = new FormData();
    formData.append("_method", "PUT"); // <-- Ini yang penting!
    formData.append("title", payload.title);
    formData.append("key", payload.key);
    formData.append("status", payload.status);

    if (payload.sort !== undefined) {
      formData.append("sort", payload.sort.toString());
    }

    if (payload.image) {
      formData.append("image", payload.image);
    }

    return fetchWithHandling<ProductGroupResponse>(
      `${baseURL}/product-groups/${id}`,
      {
        method: "POST", // <-- Ganti jadi POST
        body: formData,
        isFormData: true,
      },
    );
  };

  const deleteProductGroup = async (id: number) => {
    return fetchWithHandling<{ success: boolean; message: string }>(
      `${baseURL}/product-groups/${id}`,
      { method: "DELETE" },
    );
  };

  return {
    getProductGroups,
    getProductGroup,
    getProductGroupByKey,
    createProductGroup,
    updateProductGroup,
    deleteProductGroup,
  };
};
