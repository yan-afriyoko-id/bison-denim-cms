<template>
  <section class="bg-white">
    <div class="max-w-8xl mx-auto px-2 sm:px-4 md:px-11 py-12 md:py-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-5 text-[#1A1919]">
        Ide dan Inspirasi
      </h2>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-3 mb-10">
        <button
          v-for="filter in filters"
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="[
            'px-4 py-2 rounded-lg font-medium text-sm transition hover:cursor-pointer',
            activeFilter === filter.id
              ? 'bg-[#E9322B] text-white'
              : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Main Content: Banner and Carousel -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-12.5">
        <!-- Left: Main Banner -->
        <NuxtImg
          src="/assets/img/inspirations/banner.png"
          alt="Inspiration"
          width="524"
          height="466"
          class="w-full lg:w-131 h-auto lg:h-116.5 object-cover rounded-xl shrink-0"
          fit="cover"
        />

        <!-- Right: Carousel -->
        <div class="flex-1 flex flex-col justify-between min-w-0">
          <div class="relative min-w-0">
            <!-- Mobile: Native scroll -->
            <div
              class="lg:hidden overflow-x-auto scroll-smooth pt-2 pb-4 px-2 -mx-2"
              style="scrollbar-width: none; -ms-overflow-style: none;"
            >
              <div class="flex gap-4">
                <div
                  v-for="item in carouselItems"
                  :key="item.id"
                  class="w-[200px] sm:w-[240px] shrink-0 bg-white rounded-lg overflow-hidden shadow-[2px_4px_8px_0px_#0000000F] cursor-pointer hover:scale-105 transition"
                >
                  <NuxtImg
                    :src="item.image"
                    :alt="item.name"
                    width="270"
                    height="270"
                    class="w-full h-[200px] sm:h-[240px] object-cover"
                    fit="cover"
                  />
                  <p
                    class="text-center text-sm sm:text-base font-medium text-black pt-2.5 h-14 sm:h-16"
                  >
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Desktop: Custom scroll with buttons -->
            <div
              ref="containerRef"
              class="hidden lg:block overflow-x-hidden pt-2 pb-4 px-4"
              @scroll="updateScrollState"
            >
              <div
                ref="scrollContainer"
                class="flex gap-5 transition-transform duration-300 ease-in-out"
                :style="{ transform: `translateX(-${currentScroll}px)` }"
              >
                <div
                  v-for="item in carouselItems"
                  :key="item.id"
                  class="w-[270px] shrink-0 bg-white rounded-lg overflow-hidden shadow-[2px_4px_8px_0px_#0000000F] cursor-pointer hover:scale-105 transition"
                >
                  <NuxtImg
                    :src="item.image"
                    :alt="item.name"
                    width="270"
                    height="270"
                    class="w-full h-[270px] object-cover"
                    fit="cover"
                  />
                  <p
                    class="text-center text-lg font-medium text-black pt-2.5 h-16"
                  >
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons - Desktop only -->
            <button
              @click="handlePrev"
              :disabled="!canScrollPrev"
              class="hidden lg:flex w-10 h-10 absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full justify-center items-center shadow-[0px_4px_10px_0px_#0000000F]"
              :class="
                canScrollPrev
                  ? 'hover:cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              "
              aria-label="Previous"
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
              class="hidden lg:flex w-10 h-10 absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full justify-center items-center shadow-[0px_4px_10px_0px_#0000000F]"
              :class="
                canScrollNext
                  ? 'hover:cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              "
              aria-label="Next"
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

          <!-- Button Below Carousel -->
          <div class="flex mt-4 lg:mt-0">
            <button
              class="bg-[#E9322B] text-white text-base sm:text-lg py-3.5 sm:py-4.5 rounded-lg font-medium hover:bg-[#D32A24] transition w-full hover:cursor-pointer"
            >
              Lihat Inspirasi Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeFilter = ref(1);

const filters = [
  { id: 1, label: "Style Terbaru" },
  { id: 2, label: "Koleksi Kulit" },
  { id: 3, label: "Casual Look" },
  { id: 4, label: "Inspirasi Fashion" },
  { id: 5, label: "Inspirasi Fashion" },
];

const carouselItems = ref([
  {
    id: 1,
    name: "Tas Selempang",
    image: "/assets/img/inspirations/product-1.png",
  },
  {
    id: 2,
    name: "Dompet Kulit",
    image: "/assets/img/inspirations/product-2.png",
  },
  {
    id: 3,
    name: "Ikat Pinggang",
    image: "/assets/img/inspirations/product-3.png",
  },
  {
    id: 4,
    name: "Tas Selempang",
    image: "/assets/img/inspirations/product-1.png",
  },
  {
    id: 5,
    name: "Dompet Kulit",
    image: "/assets/img/inspirations/product-2.png",
  },
  {
    id: 6,
    name: "Ikat Pinggang",
    image: "/assets/img/inspirations/product-3.png",
  },
  {
    id: 7,
    name: "Tas Selempang",
    image: "/assets/img/inspirations/product-1.png",
  },
  {
    id: 8,
    name: "Dompet Kulit",
    image: "/assets/img/inspirations/product-2.png",
  },
  {
    id: 9,
    name: "Ikat Pinggang",
    image: "/assets/img/inspirations/product-3.png",
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
  const firstItem = scrollContainer.value.querySelector("div");
  if (!firstItem) return;

  const itemWidth = firstItem.offsetWidth;
  const gap = 20; // gap-5 = 20px
  const scrollAmount = itemWidth + gap;

  currentScroll.value = Math.max(0, currentScroll.value - scrollAmount);
};

const handleNext = () => {
  if (!scrollContainer.value || !containerRef.value) return;

  // Calculate item width dynamically
  const firstItem = scrollContainer.value.querySelector("div");
  if (!firstItem) return;

  const itemWidth = firstItem.offsetWidth;
  const gap = 20; // gap-5 = 20px
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
