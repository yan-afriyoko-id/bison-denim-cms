export interface MainBanner {
  id: number;
  title: string | null;
  image: string;
  link_url: string | null;
  sort_order: number;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  updated_at: string;
}

export interface MainBannersResponse {
  success: boolean;
  data: {
    banners: MainBanner[];
    pagination?: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
      from: number;
      to: number;
    };
  };
  message?: string;
}

export interface MainBannerResponse {
  success: boolean;
  data: {
    banner: MainBanner;
  };
  message?: string;
}

export interface MainBannerCreatePayload {
  title?: string;
  image: File;
  link_url?: string;
  sort_order?: number;
  status?: "ACTIVE" | "INACTIVE";
}

export interface MainBannerUpdatePayload {
  title?: string;
  image?: File;
  link_url?: string;
  sort_order?: number;
  status?: "ACTIVE" | "INACTIVE";
}
