<template>
  <section class="bg-gray-50">
    <div class="max-w-8xl mx-auto px-2 sm:px-4 md:px-11 py-12 md:py-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-5 text-[#1A1919]">
        Rekomendasi Untukmu
      </h2>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
        <button
          v-for="filter in filters"
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="[
            'px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition hover:cursor-pointer',
            activeFilter === filter.id
              ? 'bg-[#E9322B] text-white'
              : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Products -->
      <div class="relative">
        <!-- Mobile: Grid 2 columns -->
        <div class="grid grid-cols-2 lg:hidden gap-3 sm:gap-4">
        <Product
          v-for="product in products"
          :key="product.id"
          :name="product.name"
          :image="product.image"
          :price="product.price"
          :rating="product.rating"
          :reviews="product.reviews"
          :discount="product.discount"
          :discountedPrice="product.discountedPrice"
          :newArrival="product.newArrival"
          size="large"
        />
        </div>

        <!-- Desktop: Horizontal scroll -->
        <div class="hidden lg:flex gap-6 overflow-x-auto scroll-smooth pb-2">
          <Product
            v-for="product in products"
            :key="product.id"
            :name="product.name"
            :image="product.image"
            :price="product.price"
            :rating="product.rating"
            :reviews="product.reviews"
            :discount="product.discount"
            :discountedPrice="product.discountedPrice"
            :newArrival="product.newArrival"
            size="large"
            class="shrink-0"
          />
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

const products = ref([
  {
    id: 1,
    name: "Calicho-7 Sofa L Sectional Fabric Kanan",
    image: "/assets/img/recommended/product-1.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
  {
    id: 2,
    name: "Cooking Color Loyang Kue Muffin 6 Cup - Abu-abu",
    image: "/assets/img/recommended/product-2.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
  {
    id: 3,
    name: "Wolby Meja Lipat",
    image: "/assets/img/recommended/product-3.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
  {
    id: 4,
    name: "Douma Kabinet Sepatu 3+1 Tingkat Dengan Lemari",
    image: "/assets/img/recommended/product-4.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
  {
    id: 5,
    name: "Berlin Sofa Bed Fabric",
    image: "/assets/img/recommended/product-5.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
]);
</script>

<style scoped>
/* Hide scrollbar for desktop carousel */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
