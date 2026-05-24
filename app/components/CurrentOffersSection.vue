<template>
  <section class="bg-gray-50">
    <div class="max-w-8xl mx-auto px-2 sm:px-4 md:px-11 py-12 md:py-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-7.5 text-[#1A1919]">
        Current Offers & Deals
      </h2>

      <!-- Promotional Grid -->
      <div class="space-y-6">
        <!-- Large Banners Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Large Banner 1: Lemari Hemat Hingga 60% -->

          <NuxtImg
            src="/assets/img/offers-deals/offers-1.png"
            alt="Lemari Hemat Hingga 60%"
            width="704"
            height="248"
            class="w-full h-full object-cove rounded-lg aspect-704/248"
            fit="cover"
          />

          <!-- Large Banner 2: Beli 1 Gratis 1 -->
          <NuxtImg
            src="/assets/img/offers-deals/offers-2.png"
            alt="Beli 1 Gratis 1"
            width="704"
            height="248"
            class="w-full h-full object-cover rounded-lg aspect-704/248"
            fit="cover"
          />
        </div>

        <!-- Small Banners Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Small Banner 1: Produk Paling Dicari -->

          <NuxtImg
            src="/assets/img/offers-deals/offers-3.png"
            alt="Produk Paling Dicari"
            width="464"
            height="248"
            class="w-full h-full object-cover rounded-lg aspect-464/248"
            fit="cover"
          />

          <!-- Small Banner 2: Best Deals -->
          <NuxtImg
            src="/assets/img/offers-deals/offers-4.png"
            alt="Best Deals"
            width="464"
            height="248"
            class="w-full h-full object-cover rounded-lg aspect-464/248"
            fit="cover"
          />

          <!-- Small Banner 3: New Arrivals -->
          <NuxtImg
            src="/assets/img/offers-deals/offers-5.png"
            alt="New Arrivals"
            width="464"
            height="248"
            class="w-full h-full object-cover rounded-lg aspect-464/248"
            fit="cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// CurrentOffersSection component
</script>
