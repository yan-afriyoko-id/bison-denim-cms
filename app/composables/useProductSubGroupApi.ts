export const useProductSubGroupApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const fetchWithHandling = async (url: string, options: any = {}) => {
    try {
      const response = await $fetch(url, {
        ...options,
        headers: getHeaders(),
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

  const getSubGroups = async (groupId: string | number) => {
    return fetchWithHandling(
      `${baseURL}/product-groups/${groupId}/sub-groups`,
      { method: "GET" },
    );
  };

  const getSubGroup = async (
    groupId: string | number,
    subGroupId: string | number,
  ) => {
    return fetchWithHandling(
      `${baseURL}/product-groups/${groupId}/sub-groups/${subGroupId}`,
      { method: "GET" },
    );
  };

  const createSubGroup = async (
    groupId: string | number,
    payload: {
      title: string;
      sort?: number;
      status: "ACTIVE" | "INACTIVE";
    },
  ) => {
    return fetchWithHandling(
      `${baseURL}/product-groups/${groupId}/sub-groups`,
      {
        method: "POST",
        body: payload,
      },
    );
  };

  const updateSubGroup = async (
    groupId: string | number,
    subGroupId: string | number,
    payload: {
      title?: string;
      sort?: number;
      status?: "ACTIVE" | "INACTIVE";
    },
  ) => {
    return fetchWithHandling(
      `${baseURL}/product-groups/${groupId}/sub-groups/${subGroupId}`,
      {
        method: "PUT",
        body: payload,
      },
    );
  };

  const deleteSubGroup = async (
    groupId: string | number,
    subGroupId: string | number,
  ) => {
    return fetchWithHandling(
      `${baseURL}/product-groups/${groupId}/sub-groups/${subGroupId}`,
      { method: "DELETE" },
    );
  };

  const addProducts = async (
    groupId: string | number,
    subGroupId: string | number,
    productIds: number[],
  ) => {
    return fetchWithHandling(
      `${baseURL}/product-groups/${groupId}/sub-groups/${subGroupId}/products`,
      {
        method: "POST",
        body: { product_ids: productIds },
      },
    );
  };

  const removeProduct = async (
    groupId: string | number,
    subGroupId: string | number,
    productId: number,
  ) => {
    return fetchWithHandling(
      `${baseURL}/product-groups/${groupId}/sub-groups/${subGroupId}/products/${productId}`,
      { method: "DELETE" },
    );
  };

  return {
    getSubGroups,
    getSubGroup,
    createSubGroup,
    updateSubGroup,
    deleteSubGroup,
    addProducts,
    removeProduct,
  };
};
