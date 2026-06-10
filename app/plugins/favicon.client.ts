export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || "http://localhost:8000/api";
  const defaultFavicon = "/assets/img/images.png";

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

  const loadFavicon = async () => {
    try {
      const response = await $fetch<any>(`${apiBase}/public-configs/store_favicon`);
      const configData = response?.data;
      const faviconUrl =
        configData?.value_image ||
        (typeof configData?.value === "string" ? configData.value : "") ||
        defaultFavicon;

      updateFavicon(faviconUrl);
    } catch (error) {
      console.error("Failed to load favicon:", error);
      updateFavicon(defaultFavicon);
    }
  };

  await loadFavicon();
  window.addEventListener("app-settings-updated", loadFavicon);
});
