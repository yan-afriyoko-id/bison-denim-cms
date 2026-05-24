<template>
  <section class="bg-white">
    <div class="max-w-8xl mx-auto px-2 sm:px-4 md:px-11 py-12 md:py-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-7.5 text-[#1A1919]">
        Kategori
      </h2>

      <!-- Relative wrapper for absolute positioning -->
      <div class="relative">
        <!-- Scroll container with overflow -->
        <div
          ref="containerRef"
          class="overflow-x-auto md:overflow-x-hidden pt-2 pb-4 px-2 sm:px-4 scroll-smooth"
          @scroll="updateScrollState"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <div
            ref="scrollContainer"
            class="flex gap-3 sm:gap-4 md:gap-5 transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${currentScroll}px)` }"
          >
            <NuxtLink
              v-for="category in categories"
              :key="category.id"
              :to="`/category/${category.slug || category.id}`"
              class="w-20 sm:w-24 md:w-55 text-center cursor-pointer hover:scale-105 transition shrink-0 shadow-[2px_4px_8px_0px_#0000000F] rounded-lg bg-white"
            >
              <div class="w-full aspect-[220/220] sm:aspect-[220/220] md:aspect-[220/220] overflow-hidden rounded-t-lg">
                <NuxtImg
                  :src="category.image"
                  :alt="category.name"
                  class="w-full h-full object-cover"
                  fit="cover"
                />
              </div>
              <p class="text-xs sm:text-sm md:text-md lg:text-lg font-medium text-[#1A1919] sm:mt-2.5 px-1 py-0.5">
                {{ category.name }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <!-- Navigation Buttons - Absolute positioned -->
        <button
          @click="handlePrev"
          :disabled="!canScrollPrev"
          class="hidden md:flex w-10 h-10 absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full justify-center items-center shadow-[0px_4px_10px_0px_#0000000F]"
          :class="
            canScrollPrev
              ? 'hover:cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          "
          aria-label="Previous category"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2625 20.7375L13.5375 15L19.2625 9.2625L17.5 7.5L10 15L17.5 22.5L19.2625 20.7375Z"
              fill="#292929"
            />
          </svg>
        </button>

        <button
          @click="handleNext"
          :disabled="!canScrollNext"
          class="hidden md:flex w-10 h-10 absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full justify-center items-center shadow-[0px_4px_10px_0px_#0000000F]"
          :class="
            canScrollNext
              ? 'hover:cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          "
          aria-label="Next category"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7375 20.7375L16.4625 15L10.7375 9.2625L12.5 7.5L20 15L12.5 22.5L10.7375 20.7375Z"
              fill="#292929"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = ref([
  {
    id: 1,
    name: "Lemari",
    image: "/assets/img/categories/lemari.png",
    slug: "lemari",
  },
  { id: 2, name: "Rak", image: "/assets/img/categories/rak.png", slug: "rak" },
  {
    id: 3,
    name: "Kursi",
    image: "/assets/img/categories/kursi.png",
    slug: "kursi",
  },
  {
    id: 4,
    name: "Laci",
    image: "/assets/img/categories/laci.png",
    slug: "laci",
  },
  {
    id: 5,
    name: "Meja",
    image: "/assets/img/categories/meja.png",
    slug: "meja",
  },
  {
    id: 6,
    name: "Sofa",
    image: "/assets/img/categories/sofa.png",
    slug: "sofa",
  },
  {
    id: 1,
    name: "Lemari",
    image: "/assets/img/categories/lemari.png",
    slug: "lemari",
  },
  { id: 2, name: "Rak", image: "/assets/img/categories/rak.png", slug: "rak" },
  {
    id: 3,
    name: "Kursi",
    image: "/assets/img/categories/kursi.png",
    slug: "kursi",
  },
  {
    id: 4,
    name: "Laci",
    image: "/assets/img/categories/laci.png",
    slug: "laci",
  },
  {
    id: 5,
    name: "Meja",
    image: "/assets/img/categories/meja.png",
    slug: "meja",
  },
  {
    id: 6,
    name: "Sofa",
    image: "/assets/img/categories/sofa.png",
    slug: "sofa",
  },
  {
    id: 1,
    name: "Lemari",
    image: "/assets/img/categories/lemari.png",
    slug: "lemari",
  },
  { id: 2, name: "Rak", image: "/assets/img/categories/rak.png", slug: "rak" },
  {
    id: 3,
    name: "Kursi",
    image: "/assets/img/categories/kursi.png",
    slug: "kursi",
  },
  {
    id: 4,
    name: "Laci",
    image: "/assets/img/categories/laci.png",
    slug: "laci",
  },
  {
    id: 5,
    name: "Meja",
    image: "/assets/img/categories/meja.png",
    slug: "meja",
  },
  {
    id: 6,
    name: "Sofa",
    image: "/assets/img/categories/sofa.png",
    slug: "sofa",
  },
]);

const containerRef = ref<HTMLElement | null>(null);
const scrollContainer = ref<HTMLElement | null>(null);
const currentScroll = ref(0);

// Calculate scroll state
const updateScrollState = () => {
  // This will be called on scroll if needed
};

const getMaxScroll = () => {
  if (!scrollContainer.value || !containerRef.value) return 0;

  const scrollWidth = scrollContainer.value.scrollWidth;
  const containerWidth =
    containerRef.value.clientWidth || containerRef.value.offsetWidth;
  const maxScroll = Math.max(0, scrollWidth - containerWidth);

  return maxScroll;
};

const canScrollPrev = computed(() => currentScroll.value > 0);

const canScrollNext = computed(() => {
  if (!scrollContainer.value || !containerRef.value) return false;

  const maxScroll = getMaxScroll();
  return currentScroll.value + 1 < maxScroll;
});

const handlePrev = () => {
  if (!scrollContainer.value || !containerRef.value) return;

  // Calculate item width dynamically
  const firstItem = scrollContainer.value.querySelector("a");
  if (!firstItem) return;

  const itemWidth = firstItem.offsetWidth;
  const gap = 12; // gap-3 = 12px on mobile, gap-4 = 16px on sm, gap-5 = 20px on md
  const scrollAmount = itemWidth + gap;

  currentScroll.value = Math.max(0, currentScroll.value - scrollAmount);
};

const handleNext = () => {
  if (!scrollContainer.value || !containerRef.value) return;

  // Calculate item width dynamically
  const firstItem = scrollContainer.value.querySelector("a");
  if (!firstItem) return;

  const itemWidth = firstItem.offsetWidth;
  const gap = 12; // gap-3 = 12px on mobile, gap-4 = 16px on sm, gap-5 = 20px on md
  const scrollAmount = itemWidth + gap;
  const maxScroll = getMaxScroll();

  currentScroll.value = Math.min(maxScroll, currentScroll.value + scrollAmount);
};

// Update scroll state on resize
const handleResize = () => {
  if (!scrollContainer.value || !containerRef.value) return;

  const maxScroll = getMaxScroll();

  // Ensure current scroll doesn't exceed max
  if (currentScroll.value > maxScroll) {
    currentScroll.value = Math.max(0, maxScroll);
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  // Initial check after DOM is ready
  nextTick(() => {
    handleResize();
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* Hide scrollbar for mobile carousel */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
