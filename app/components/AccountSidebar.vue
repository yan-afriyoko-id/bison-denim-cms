<template>
  <aside class="w-full lg:w-64 shrink-0">
    <!-- Mobile: Horizontal Scroll Navigation -->
    <div class="lg:hidden bg-white border-b border-[#E6E9F0]">
      <nav class="flex gap-2 px-4 py-3 overflow-x-auto scroll-smooth" style="scrollbar-width: none; -ms-overflow-style: none;">
        <NuxtLink
          to="/account"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition whitespace-nowrap shrink-0"
          :class="
            $route.path === '/account'
              ? 'bg-[#E9322B] text-white'
              : 'bg-[#F8F8F8] text-[#1A1919] hover:bg-[#E6E9F0]'
          "
        >
          <div class="w-4 h-4 shrink-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
                :stroke="$route.path === '/account' ? '#FFFFFF' : '#1A1919'"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
                :stroke="$route.path === '/account' ? '#FFFFFF' : '#1A1919'"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span>Informasi Umum</span>
        </NuxtLink>

        <NuxtLink
          to="/account/addresses"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition whitespace-nowrap shrink-0"
          :class="
            $route.path === '/account/addresses'
              ? 'bg-[#E9322B] text-white'
              : 'bg-[#F8F8F8] text-[#1A1919] hover:bg-[#E6E9F0]'
          "
        >
          <div class="w-4 h-4 shrink-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.0001V17.5001M15 6.5001V20.5001M5.253 4.1961L4.026 4.9081C3.037 5.4811 2.543 5.7681 2.272 6.2451C2 6.7221 2 7.3021 2 8.4641V16.6281C2 18.1541 2 18.9181 2.342 19.3421C2.57 19.6241 2.889 19.8141 3.242 19.8771C3.772 19.9721 4.422 19.5951 5.72 18.8421C6.602 18.3311 7.45 17.7991 8.505 17.9441C8.985 18.0091 9.442 18.2371 10.358 18.6921L14.171 20.5881C14.996 20.9981 15.004 21.0001 15.921 21.0001H18C19.886 21.0001 20.828 21.0001 21.414 20.4011C22 19.8031 22 18.8391 22 16.9111V10.1711C22 8.2441 22 7.2811 21.414 6.6811C20.828 6.0831 19.886 6.0831 18 6.0831H15.921C15.004 6.0831 14.996 6.0811 14.171 5.6711L10.84 4.0151C9.449 3.3231 8.753 2.9771 8.012 3.0001C7.271 3.0231 6.6 3.4151 5.253 4.1961Z"
                :stroke="
                  $route.path === '/account/addresses' ? '#FFFFFF' : '#1A1919'
                "
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span>Alamat</span>
        </NuxtLink>

        <NuxtLink
          to="/account/orders"
          class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition whitespace-nowrap shrink-0"
          :class="
            $route.path === '/account/orders'
              ? 'bg-[#E9322B] text-white'
              : 'bg-[#F8F8F8] text-[#1A1919] hover:bg-[#E6E9F0]'
          "
        >
          <div class="w-4 h-4 shrink-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 4H7C5.89543 4 5 4.89543 5 6V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6C19 4.89543 18.1046 4 17 4Z"
                :stroke="$route.path === '/account/orders' ? '#FFFFFF' : '#1A1919'"
              />
              <path
                d="M9 9H15M9 13H15M9 17H13"
                :stroke="$route.path === '/account/orders' ? '#FFFFFF' : '#1A1919'"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <span>Pesanan</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Desktop: Vertical Sidebar -->
    <div class="hidden lg:block bg-white border-r border-[#E6E9F0] px-5.5 py-10 h-full">
      <nav class="flex flex-col gap-5">
        <NuxtLink
          to="/account"
          class="flex items-center gap-2.5 font-medium transition text-base"
          :class="
            $route.path === '/account'
              ? 'text-[#E9322B]'
              : 'text-[#1A1919]'
          "
        >
          <div class="w-6 h-6 shrink-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
                :stroke="$route.path === '/account' ? '#E9322B' : '#1A1919'"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
                :stroke="$route.path === '/account' ? '#E9322B' : '#1A1919'"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span>Informasi Umum</span>
        </NuxtLink>

        <NuxtLink
          to="/account/addresses"
          class="flex items-center gap-2.5 font-medium transition text-base"
          :class="
            $route.path === '/account/addresses'
              ? 'text-[#E9322B]'
              : 'text-[#1A1919]'
          "
        >
          <div class="w-6 h-6 shrink-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.0001V17.5001M15 6.5001V20.5001M5.253 4.1961L4.026 4.9081C3.037 5.4811 2.543 5.7681 2.272 6.2451C2 6.7221 2 7.3021 2 8.4641V16.6281C2 18.1541 2 18.9181 2.342 19.3421C2.57 19.6241 2.889 19.8141 3.242 19.8771C3.772 19.9721 4.422 19.5951 5.72 18.8421C6.602 18.3311 7.45 17.7991 8.505 17.9441C8.985 18.0091 9.442 18.2371 10.358 18.6921L14.171 20.5881C14.996 20.9981 15.004 21.0001 15.921 21.0001H18C19.886 21.0001 20.828 21.0001 21.414 20.4011C22 19.8031 22 18.8391 22 16.9111V10.1711C22 8.2441 22 7.2811 21.414 6.6811C20.828 6.0831 19.886 6.0831 18 6.0831H15.921C15.004 6.0831 14.996 6.0811 14.171 5.6711L10.84 4.0151C9.449 3.3231 8.753 2.9771 8.012 3.0001C7.271 3.0231 6.6 3.4151 5.253 4.1961Z"
                :stroke="
                  $route.path === '/account/addresses' ? '#E9322B' : '#1A1919'
                "
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span>Alamat Pengiriman</span>
        </NuxtLink>

        <NuxtLink
          to="/account/orders"
          class="flex items-center gap-2.5 font-medium transition text-base"
          :class="
            $route.path === '/account/orders'
              ? 'text-[#E9322B]'
              : 'text-[#1A1919]'
          "
        >
          <div class="w-6 h-6 shrink-0">
            <svg
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 4H7C5.89543 4 5 4.89543 5 6V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6C19 4.89543 18.1046 4 17 4Z"
                :stroke="$route.path === '/account/orders' ? '#E9322B' : '#1A1919'"
              />
              <path
                d="M9 9H15M9 13H15M9 17H13"
                :stroke="$route.path === '/account/orders' ? '#E9322B' : '#1A1919'"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <span>Pesanan Saya</span>
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Component untuk sidebar navigasi account
// Menggunakan $route dari template untuk reactive route detection
</script>
image.png
