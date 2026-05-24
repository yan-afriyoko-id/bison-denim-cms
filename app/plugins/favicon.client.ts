export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || "http://localhost:8000/api";
  const defaultFavicon = "/assets/img/favicon.png";

  const getFaviconType = (url: string): string => {
    if (!url) return "image/x-icon";

    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes(".svg") || lowerUrl.includes("image/svg")) {
      return "image/svg+xml";
    }

    if (lowerUrl.includes(".png")) {
      return "image/png";
    }

    if (lowerUrl.includes(".ico")) {
      return "image/x-icon";
    }

    return "image/x-icon";
  };

  const updateFavicon = (faviconUrl: string) => {
    const faviconType = getFaviconType(faviconUrl);

    const cacheBuster = faviconUrl.includes("?") ? "&" : "?";
    const faviconUrlWithCache = `${faviconUrl}${cacheBuster}_t=${Date.now()}`;

    const existingLinks = document.querySelectorAll(
      'link[rel="icon"], link[rel="apple-touch-icon"]',
    );
    existingLinks.forEach((link) => link.remove());

    const linkIcon = document.createElement("link");
    linkIcon.rel = "icon";
    linkIcon.type = faviconType;
    linkIcon.href = faviconUrlWithCache;
    document.head.appendChild(linkIcon);

    const linkApple = document.createElement("link");
    linkApple.rel = "apple-touch-icon";
    linkApple.href = faviconUrlWithCache;
    document.head.appendChild(linkApple);

    useHead({
      link: [
        {
          rel: "icon",
          type: faviconType,
          href: faviconUrlWithCache,
          key: "favicon-icon",
        },
        {
          rel: "apple-touch-icon",
          href: faviconUrlWithCache,
          key: "favicon-apple",
        },
      ],
    });
  };

  try {
    const response = await $fetch(`${apiBase}/public-configs/store_favicon`, {
      method: "GET",
    });

    if (response && response.success) {
      const configData = response?.data?.config || response?.data;
      if (configData) {
        const faviconUrl = configData.value_image || configData.value;
        if (faviconUrl) {
          updateFavicon(faviconUrl);
          return;
        }
      }
    }

    updateFavicon(defaultFavicon);
  } catch (error) {
    console.error("Failed to load favicon from config:", error);
    updateFavicon(defaultFavicon);
  }
});
