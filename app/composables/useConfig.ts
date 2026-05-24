export const useConfig = () => {
  const {
    getAllConfigs,
    getConfig: getConfigApi,
    getPublicConfig: getPublicConfigApi,
    updateConfig: updateConfigApi,
  } = useConfigApi();

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Fetch all configs
   */
  const fetchAllConfigs = async (token: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const { data: response, error: apiError } = await getAllConfigs();

      if (apiError) {
        const message = apiError?.message || "Failed to fetch configs";
        error.value = message;
        console.error("Fetch configs error:", message);
        return null;
      }

      if (!response) {
        error.value = "No response from server";
        return null;
      }

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch configs";
      error.value = message;
      console.error("Fetch configs error:", message);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch single config by key
   */
  const fetchConfig = async (key: string, token: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const { data: response, error: apiError } = await getConfigApi(key);

      if (apiError) {
        const message = apiError?.message || "Failed to fetch config";
        error.value = message;
        console.error("Fetch config error:", message);
        return null;
      }

      if (!response || !response.success) {
        const message = response?.message || "Failed to fetch config";
        error.value = message;
        console.error("Fetch config error:", message);
        return null;
      }

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch config";
      error.value = message;
      console.error("Fetch config error:", message);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch public config by key
   */
  const fetchPublicConfig = async (key: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const { data: response, error: apiError } = await getPublicConfigApi(key);

      if (apiError) {
        const message = apiError?.message || "Failed to fetch public config";
        error.value = message;
        console.error("Fetch public config error:", message);
        return null;
      }

      if (!response || !response.success) {
        const message = response?.message || "Failed to fetch public config";
        error.value = message;
        console.error("Fetch public config error:", message);
        return null;
      }

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch public config";
      error.value = message;
      console.error("Fetch public config error:", message);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Update config
   */
  const updateConfig = async (key: string, data: any, token: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const { data: response, error: apiError } = await updateConfigApi(
        key,
        data
      );

      if (apiError || !response?.success) {
        const message =
          apiError?.message || response?.message || "Failed to update config";
        error.value = message;
        console.error("Update config error:", message);
        return null;
      }

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update config";
      error.value = message;
      console.error("Update config error:", message);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    fetchAllConfigs,
    fetchConfig,
    fetchPublicConfig,
    updateConfig,
  };
};
