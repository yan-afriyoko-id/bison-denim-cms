<template>
  <aside class="w-full lg:w-64 shrink-0">
    <!-- Mobile: Horizontal Scroll Navigation -->
    <div class="lg:hidden bg-white border-b border-[#E6E9F0]">
      <nav class="flex gap-2 px-4 py-3 overflow-x-auto scroll-smooth" style="scrollbar-width: none; -ms-overflow-style: none;">
        <NuxtLink
          to="/privacy-policy"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition whitespace-nowrap shrink-0"
          :class="
            $route.path === '/privacy-policy'
              ? 'bg-[#E9322B] text-white'
              : 'bg-[#F8F8F8] text-[#1A1919] hover:bg-[#E6E9F0]'
          "
        >
          <span>Privacy Policy</span>
        </NuxtLink>

        <NuxtLink
          to="/terms-and-conditions"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition whitespace-nowrap shrink-0"
          :class="
            $route.path === '/terms-and-conditions'
              ? 'bg-[#E9322B] text-white'
              : 'bg-[#F8F8F8] text-[#1A1919] hover:bg-[#E6E9F0]'
          "
        >
          <span>Terms & Conditions</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Desktop: Vertical Sidebar -->
    <div class="hidden lg:block bg-white border-r border-[#E6E9F0] px-5.5 py-10 h-full">
      <nav class="flex flex-col gap-5">
        <NuxtLink
          to="/privacy-policy"
          class="font-medium transition text-base"
          :class="
            $route.path === '/privacy-policy'
              ? 'text-[#E9322B]'
              : 'text-[#1A1919]'
          "
        >
          Privacy Policy
        </NuxtLink>

        <NuxtLink
          to="/terms-and-conditions"
          class="font-medium transition text-base"
          :class="
            $route.path === '/terms-and-conditions'
              ? 'text-[#E9322B]'
              : 'text-[#1A1919]'
          "
        >
          Terms & Conditions
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Component untuk sidebar navigasi policy pages
</script>

