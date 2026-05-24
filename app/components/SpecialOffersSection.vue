<template>
  <section class="bg-white">
    <div class="max-w-8xl mx-auto px-2 sm:px-4 md:px-11 py-12 md:py-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-5 text-[#1A1919]">
        Penawaran Spesial
      </h2>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-3 mb-7.5">
        <button
          v-for="filter in filters"
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="[
            'px-4 py-2 rounded-lg font-medium text-sm transition hover:cursor-pointer ',
            activeFilter === filter.id
              ? 'bg-[#E9322B] text-white'
              : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Banner and Products Grid -->
      <div class="relative">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-12">
          <!-- Banner -->
          <NuxtImg
            src="/assets/img/special-offers/banner.png"
            alt="Special Offers"
            width="364"
            height="436"
            class="w-full lg:w-91 h-auto lg:h-109 object-cover rounded-lg shrink-0"
            fit="cover"
          />
          <div class="flex-1 relative min-w-0">
            <!-- Mobile: Grid 2 columns -->
            <div class="grid grid-cols-2 lg:hidden gap-3 sm:gap-4">
              <Product
                v-for="product in products"
                :key="product.id"
                :name="product.name"
                :image="product.image"
                :price="product.price"
                :discountedPrice="product.discountedPrice"
                :rating="product.rating"
                :reviews="product.reviews"
                :discount="product.discount"
                :newArrival="product.newArrival"
                size="large"
              />
            </div>

            <!-- Desktop: Fixed layout with overflow -->
            <div class="hidden lg:flex gap-6 overflow-x-auto scroll-smooth pb-2">
              <Product
                v-for="product in products"
                :key="product.id"
                :name="product.name"
                :image="product.image"
                :price="product.price"
                :discountedPrice="product.discountedPrice"
                :rating="product.rating"
                :reviews="product.reviews"
                :discount="product.discount"
                :newArrival="product.newArrival"
                size="large"
                class="shrink-0"
              />
            </div>

            <!-- Next Button - Hidden on mobile, visible on desktop -->
            <NuxtLink
              :to="nextLink"
              class="hidden lg:flex w-10 h-10 absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full justify-center items-center shadow-[0px_4px_10px_0px_#0000000F] hover:cursor-pointer"
              aria-label="Next products"
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
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeFilter = ref(1);

const filters = [
  { id: 1, label: "Spesial Online" },
  { id: 2, label: "Weekend Special" },
  { id: 3, label: "Pasti Termurah" },
  { id: 4, label: "Beli 1 gratis 1" },
];

const nextLink = computed(() => {
  return `/products/special-offers?filter=${activeFilter.value}`;
});

const products = ref([
  {
    id: 1,
    name: "Manolo Neo Kabinet Sepatu 3 Tingkat",
    image: "/assets/img/special-offers/product-1.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: true,
  },
  {
    id: 2,
    name: "Douma Kabinet Sepatu 3+1 Tingkat Dengan Lemari",
    image: "/assets/img/special-offers/product-2.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: true,
  },
  {
    id: 3,
    name: "New Windsor Sofa Bed",
    image: "/assets/img/special-offers/product-3.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: true,
  },
  {
    id: 4,
    name: "Berlin Sofa Bed Fabric",
    image: "/assets/img/special-offers/product-4.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: true,
  },
]);
</script>

<style scoped>
/* Hide scrollbar for desktop carousel */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
