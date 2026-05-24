import type {
  MainBannersResponse,
  MainBannerResponse,
} from "~/types/mainBanner";

export const useMainBannerApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const getMainBanners = async (
    page: number = 1,
    perPage: number = 15,
    sortBy?: string,
    sortDirection: "asc" | "desc" = "asc",
    status?: string,
  ) => {
    try {
      const params: Record<string, any> = {
        page,
        per_page: perPage,
        ...(sortBy && { sort_by: sortBy }),
        sort_direction: sortDirection,
        ...(status && { status }),
      };

      const response = await $fetch<MainBannersResponse>(
        `${baseURL}/main-banners`,
        {
          method: "GET",
          params,
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

  const getActiveMainBanners = async () => {
    try {
      const response = await $fetch<MainBannersResponse>(
        `${baseURL}/main-banners/active`,
        {
          method: "GET",
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

  const getMainBanner = async (id: number) => {
    try {
      const response = await $fetch<MainBannerResponse>(
        `${baseURL}/main-banners/${id}`,
        {
          method: "GET",
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

  const createMainBanner = async (formData: FormData) => {
    try {
      const token = useCookie("auth_token");
      const headers: Record<string, string> = {
        Accept: "application/json",
      };
      if (token.value) {
        headers["Authorization"] = `Bearer ${token.value}`;
      }

      const response = await $fetch<MainBannerResponse>(
        `${baseURL}/main-banners`,
        {
          method: "POST",
          body: formData,
          headers,
        },
      );
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

  const updateMainBanner = async (id: number, formData: FormData) => {
    try {
      const token = useCookie("auth_token");
      const headers: Record<string, string> = {
        Accept: "application/json",
      };
      if (token.value) {
        headers["Authorization"] = `Bearer ${token.value}`;
      }

      formData.append("_method", "PUT");

      const response = await $fetch<MainBannerResponse>(
        `${baseURL}/main-banners/${id}`,
        {
          method: "POST",
          body: formData,
          headers,
        },
      );
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

  const deleteMainBanner = async (id: number) => {
    try {
      const response = await $fetch<{ success: boolean; message?: string }>(
        `${baseURL}/main-banners/${id}`,
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
    getMainBanners,
    getActiveMainBanners,
    getMainBanner,
    createMainBanner,
    updateMainBanner,
    deleteMainBanner,
  };
};
