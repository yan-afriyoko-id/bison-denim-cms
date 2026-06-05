<template>
  <section class="bg-gray-50">
    <div class="max-w-8xl mx-auto px-2 sm:px-4 md:px-11 py-12 md:py-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-[#1A1919]">
        Lebih Banyak Diminati
      </h2>

      <!-- Disclaimer -->
      <p class="text-sm sm:text-base md:text-lg text-[#5f6368] mb-6 sm:mb-8 md:mb-10">
        *Perbedaan harga mungkin terjadi, harga terbaru tertera pada halaman
        detail produk
      </p>

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
          :discountedPrice="product.discountedPrice"
          :rating="product.rating"
          :reviews="product.reviews"
          :discount="product.discount"
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
            :discountedPrice="product.discountedPrice"
            :rating="product.rating"
            :reviews="product.reviews"
            :discount="product.discount"
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
const products = ref([
  {
    id: 1,
    name: "Bison Denim Tas Messenger Kulit Premium",
    image: "/assets/img/more-products/product-1.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
  {
    id: 2,
    name: "Bison Denim Card Holder Kulit Asli",
    image: "/assets/img/more-products/product-2.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
  {
    id: 3,
    name: "Bison Denim Tas Laptop Kulit Genuine Leather",
    image: "/assets/img/more-products/product-3.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
  {
    id: 4,
    name: "Bison Denim Dompet Wanita Kulit Sapi",
    image: "/assets/img/more-products/product-4.png",
    price: "Rp 74.500",
    discountedPrice: "Rp 54.500",
    rating: 4.8,
    reviews: 57,
    discount: "25",
    newArrival: false,
  },
  {
    id: 5,
    name: "Bison Denim Tas Tote Bag Kulit Premium",
    image: "/assets/img/more-products/product-5.png",
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
