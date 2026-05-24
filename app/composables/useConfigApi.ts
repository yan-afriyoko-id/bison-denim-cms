import type {
  ConfigsResponse,
  ConfigResponse,
  ConfigUpdatePayload,
} from "~/types/config";

export const useConfigApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const getAllConfigs = async () => {
    try {
      const response = await $fetch<ConfigsResponse>(`${baseURL}/configs`, {
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

  const getConfig = async (key: string) => {
    try {
      const response = await $fetch<ConfigResponse>(
        `${baseURL}/configs/${key}`,
        {
          method: "GET",
          headers: getHeaders(),
        }
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

  const getPublicConfig = async (key: string) => {
    try {
      const response = await $fetch<ConfigResponse>(
        `${baseURL}/public-configs/${key}`,
        {
          method: "GET",
        }
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

  const updateConfig = async (
    key: string,
    data: ConfigUpdatePayload | FormData
  ) => {
    try {
      const isFormData =
        data instanceof FormData ||
        (data &&
          typeof data === "object" &&
          typeof (data as any).append === "function" &&
          typeof (data as any).get === "function");

      if (isFormData) {
        const formData = data as FormData;

        if (formData.has("file") && !formData.has("value")) {
          const file = formData.get("file");
          if (file instanceof File) {
            formData.delete("file");
            formData.append("value", file);
          }
        }

        const token = useCookie("auth_token");
        const headers: Record<string, string> = {
          Accept: "application/json",
        };
        if (token.value) {
          headers["Authorization"] = `Bearer ${token.value}`;
        }

        const response = await $fetch<ConfigResponse>(
          `${baseURL}/configs/${key}`,
          {
            method: "POST",
            body: formData,
            headers,
          }
        );
        return { data: response, error: null };
      } else if (data instanceof File) {
        const formData = new FormData();
        formData.append("value", data);

        const token = useCookie("auth_token");
        const headers: Record<string, string> = {
          Accept: "application/json",
        };
        if (token.value) {
          headers["Authorization"] = `Bearer ${token.value}`;
        }

        const response = await $fetch<ConfigResponse>(
          `${baseURL}/configs/${key}`,
          {
            method: "POST",
            body: formData,
            headers,
          }
        );
        return { data: response, error: null };
      } else {
        const response = await $fetch<ConfigResponse>(
          `${baseURL}/configs/${key}`,
          {
            method: "PUT",
            body: data,
            headers: getHeaders(),
          }
        );
        return { data: response, error: null };
      }
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

  return {
    getAllConfigs,
    getConfig,
    getPublicConfig,
    updateConfig,
  };
};
