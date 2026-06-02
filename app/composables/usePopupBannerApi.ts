import type { PopupBanner } from "~/types/popupBanner";

type PopupBannerPayload = Partial<PopupBanner> | FormData;

export const usePopupBannerApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const handleRequest = async <T>(request: Promise<T>) => {
    try {
      const data = await request;
      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: err?.data || {
          message: err?.message || "An error occurred",
          errors: err?.data?.errors || {},
        },
      };
    }
  };

  const getPopupBanners = async (params?: {
    per_page?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
  }) => {
    return handleRequest(
      $fetch<{
        success: boolean;
        data: {
          popup_banners: PopupBanner[];
          pagination: any | null;
          sort: {
            sort_by: string;
            sort_direction: string;
          };
        };
      }>(`${baseURL}/popup-banners`, {
        method: "GET",
        headers: getHeaders(),
        query: params,
      }).then((res) => res),
    );
  };

  const getPopupBanner = async (id: number) => {
    return handleRequest(
      $fetch<{
        success: boolean;
        data: { popup_banner: PopupBanner };
      }>(`${baseURL}/popup-banners/${id}`, {
        method: "GET",
        headers: getHeaders(),
      }).then((res) => res),
    );
  };

  const createPopupBanner = async (payload: PopupBannerPayload) => {
    return handleRequest(
      $fetch<{
        success: boolean;
        data: { popup_banner: PopupBanner };
      }>(`${baseURL}/popup-banners`, {
        method: "POST",
        body: payload,
        headers: getHeaders(true),
      }).then((res) => res),
    );
  };

  const updatePopupBanner = async (
    id: number,
    payload: PopupBannerPayload,
  ) => {
    return handleRequest(
      $fetch<{
        success: boolean;
        data: { popup_banner: PopupBanner };
      }>(`${baseURL}/popup-banners/${id}`, {
        method: "POST",
        body: payload,
        headers: getHeaders(true),
      }).then((res) => res),
    );
  };

  const deletePopupBanner = async (id: number) => {
    return handleRequest(
      $fetch<{
        success: boolean;
        message: string;
      }>(`${baseURL}/popup-banners/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      }),
    );
  };

  const getRandomPopupBanner = async () => {
    return handleRequest(
      $fetch<{
        success: boolean;
        data: { popup_banner: PopupBanner | null };
      }>(`${baseURL}/popup-banner/random`, {
        method: "GET",
        headers: getHeaders(),
      }).then((res) => res),
    );
  };

  return {
    getPopupBanners,
    getPopupBanner,
    createPopupBanner,
    updatePopupBanner,
    deletePopupBanner,
    getRandomPopupBanner,
  };
};
