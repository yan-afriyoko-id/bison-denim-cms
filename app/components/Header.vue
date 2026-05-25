<template>
  <header class="sticky top-0 z-50 bg-white border-b border-[#E6E9F0]">
    <div class="bg-[#C4282B] flex justify-center items-center gap-1.5 sm:gap-2.5 py-1.5 sm:py-2.5 px-2">
      <svg
        class="w-3.5 h-3.5 sm:w-4 sm:h-4"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 3V4H9.5V11.5H6.422C6.199 10.6405 5.426 10 4.5 10C3.574 10 2.801 10.6405 2.578 11.5H2V9H1V12.5H2.578C2.801 13.3595 3.574 14 4.5 14C5.426 14 6.199 13.3595 6.422 12.5H10.578C10.801 13.3595 11.574 14 12.5 14C13.426 14 14.199 13.3595 14.422 12.5H16V8.422L15.9685 8.3435L14.9685 5.3435L14.86 5H10.5V3H0ZM0.5 5V6H5V5H0.5ZM10.5 6H14.1405L15 8.5625V11.5H14.422C14.199 10.6405 13.426 10 12.5 10C11.574 10 10.801 10.6405 10.578 11.5H10.5V6ZM1 7V8H4V7H1ZM4.5 11C5.0585 11 5.5 11.4415 5.5 12C5.5 12.5585 5.0585 13 4.5 13C3.9415 13 3.5 12.5585 3.5 12C3.5 11.4415 3.9415 11 4.5 11ZM12.5 11C13.0585 11 13.5 11.4415 13.5 12C13.5 12.5585 13.0585 13 12.5 13C11.9415 13 11.5 12.5585 11.5 12C11.5 11.4415 11.9415 11 12.5 11Z"
          fill="white"
        />
      </svg>

      <p class="text-[10px] sm:text-xs md:text-sm text-white text-center">
        <span class="hidden sm:inline font-normal">Free Shipping JABODETABEK pembelanjaan Rp75.000+</span>
        <span class="sm:hidden font-normal">Free Shipping JABODETABEK Rp75.000+</span>
      </p>
    </div>
    <div class="max-w-8xl mx-auto px-4 md:px-[31px] py-3 sm:py-4 md:py-5">
      <div class="flex items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-[77px]">
        <!-- Logo Section - Hidden on mobile -->
        <NuxtLink to="/" class="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0">
          <NuxtImg 
            :src="logoUrl" 
            alt="Bison Denim Logo" 
            width="144" 
            height="46"
            class="w-24 sm:w-32 md:w-36 h-auto"
          />
        </NuxtLink>

        <!-- Center: Search Section -->
        <div class="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 flex-1 justify-center max-w-5xl min-w-0">
          <!-- Hamburger Button - Mobile Only -->
          <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="xl:hidden flex items-center justify-center bg-white border border-[#E6E9F0] px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 rounded-lg hover:cursor-pointer shrink-0"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5"
                stroke="#808080"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <!-- Kategori Button -->
          <button
            @click="isCategoryOpen = !isCategoryOpen"
            class="flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-white border border-[#E6E9F0] px-2 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg whitespace-nowrap hover:cursor-pointer shrink-0"
          >
            <span
              class="font-medium text-[rgba(26, 25, 25, 1)] hidden sm:inline text-sm md:text-base"
              >Kategori</span
            >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.75 9.75C7.14782 9.75 7.52936 9.90804 7.81066 10.1893C8.09196 10.4706 8.25 10.8522 8.25 11.25V14.25C8.25 14.6478 8.09196 15.0294 7.81066 15.3107C7.52936 15.592 7.14782 15.75 6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25C2.25 10.8522 2.40804 10.4706 2.68934 10.1893C2.97064 9.90804 3.35218 9.75 3.75 9.75H6.75ZM14.25 9.75C14.6478 9.75 15.0294 9.90804 15.3107 10.1893C15.592 10.4706 15.75 10.8522 15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H11.25C10.8522 15.75 10.4706 15.592 10.1893 15.3107C9.90804 15.0294 9.75 14.6478 9.75 14.25V11.25C9.75 10.8522 9.90804 10.4706 10.1893 10.1893C10.4706 9.90804 10.8522 9.75 11.25 9.75H14.25ZM6.75 2.25C7.14782 2.25 7.52936 2.40804 7.81066 2.68934C8.09196 2.97064 8.25 3.35218 8.25 3.75V6.75C8.25 7.14782 8.09196 7.52936 7.81066 7.81066C7.52936 8.09196 7.14782 8.25 6.75 8.25H3.75C3.35218 8.25 2.97064 8.09196 2.68934 7.81066C2.40804 7.52936 2.25 7.14782 2.25 6.75V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75ZM14.25 2.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V6.75C15.75 7.14782 15.592 7.52936 15.3107 7.81066C15.0294 8.09196 14.6478 8.25 14.25 8.25H11.25C10.8522 8.25 10.4706 8.09196 10.1893 7.81066C9.90804 7.52936 9.75 7.14782 9.75 6.75V3.75C9.75 3.35218 9.90804 2.97064 10.1893 2.68934C10.4706 2.40804 10.8522 2.25 11.25 2.25H14.25Z"
                fill="#808080"
              />
            </svg>
          </button>

          <!-- Search Bar -->
          <div
            class="flex-1 flex items-center border border-[#E6E9F0] rounded-lg px-1 sm:px-1.5 md:px-2 min-w-0 max-w-[180px] sm:max-w-none"
          >
            <input
              type="text"
              placeholder="Cari Produk"
              class="flex-1 outline-none px-1.5 sm:px-2 md:px-2.5 py-1.5 sm:py-2 md:py-2.5 lg:py-3.5 h-full placeholder:text-[#808080] text-xs sm:text-sm md:text-base min-w-0"
            />
            <!-- Search Button -->
            <button
              @click="handleSearch"
              class="bg-[#E9322B] w-8 h-7 sm:w-9 sm:h-8 md:w-11.5 md:h-9 flex justify-center items-center text-white rounded-lg transition shrink-0 hover:cursor-pointer"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.375 2.16699C9.90667 2.16712 8.45964 2.51839 7.15464 3.19149C5.84965 3.8646 4.72455 4.84003 3.8732 6.03639C3.02186 7.23276 2.46896 8.61537 2.26063 10.0689C2.0523 11.5224 2.19459 13.0046 2.67562 14.392C3.15666 15.7793 3.96248 17.0315 5.02587 18.044C6.08926 19.0566 7.37938 19.8002 8.78859 20.2127C10.1978 20.6253 11.6852 20.6949 13.1268 20.4156C14.5684 20.1364 15.9223 19.5165 17.0755 18.6077L21.0319 22.564C21.2362 22.7613 21.5098 22.8705 21.7939 22.8681C22.0779 22.8656 22.3496 22.7517 22.5505 22.5508C22.7514 22.3499 22.8653 22.0782 22.8678 21.7942C22.8702 21.5101 22.761 21.2365 22.5637 21.0322L18.6074 17.0758C19.6777 15.718 20.3441 14.0863 20.5304 12.3674C20.7167 10.6485 20.4152 8.91185 19.6606 7.35626C18.906 5.80067 17.7287 4.48896 16.2634 3.57124C14.7981 2.65352 13.104 2.16688 11.375 2.16699ZM4.33336 11.3753C4.33336 9.50776 5.07525 7.71668 6.39582 6.39612C7.71639 5.07555 9.50747 4.33366 11.375 4.33366C13.2426 4.33366 15.0337 5.07555 16.3542 6.39612C17.6748 7.71668 18.4167 9.50776 18.4167 11.3753C18.4167 13.2429 17.6748 15.034 16.3542 16.3545C15.0337 17.6751 13.2426 18.417 11.375 18.417C9.50747 18.417 7.71639 17.6751 6.39582 16.3545C5.07525 15.034 4.33336 13.2429 4.33336 11.3753Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <div class="flex shrink-0">
            <!-- Shopping Cart -->
            <button class="px-2 sm:px-3 md:px-5 lg:px-7.5 rounded-lg transition hover:cursor-pointer">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 md:w-[26px] md:h-[26px]"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4H6.25L8.6875 17.8125H21.6875M8.6875 14.5625H21.3544C21.4483 14.5626 21.5394 14.5301 21.6121 14.4705C21.6848 14.411 21.7346 14.3281 21.753 14.236L23.2155 6.92348C23.2273 6.86451 23.2259 6.80366 23.2113 6.74532C23.1967 6.68698 23.1694 6.6326 23.1313 6.5861C23.0931 6.53961 23.0451 6.50216 22.9908 6.47646C22.9364 6.45077 22.877 6.43746 22.8169 6.4375H7.0625M10.3125 21.0625C10.3125 21.5112 9.94873 21.875 9.5 21.875C9.05127 21.875 8.6875 21.5112 8.6875 21.0625C8.6875 20.6138 9.05127 20.25 9.5 20.25C9.94873 20.25 10.3125 20.6138 10.3125 21.0625ZM21.6875 21.0625C21.6875 21.5112 21.3237 21.875 20.875 21.875C20.4263 21.875 20.0625 21.5112 20.0625 21.0625C20.0625 20.6138 20.4263 20.25 20.875 20.25C21.3237 20.25 21.6875 20.6138 21.6875 21.0625Z"
                  stroke="#1A1919"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <!-- Separator -->
            <div class="hidden xl:block h-6.5 w-px bg-[#E6E9F0]"></div>
          </div>
        </div>

        <!-- Right: Auth Buttons -->
        <div class="hidden xl:flex items-center gap-2 sm:gap-2.5 shrink-0">
          <!-- Login Button -->
          <NuxtLink
            to="/login"
            class="border border-[#E9322B] bg-white text-[#E9322B] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-[11.5px] rounded-lg font-medium whitespace-nowrap text-sm sm:text-base"
          >
            Masuk
          </NuxtLink>

          <!-- Register Button -->
          <NuxtLink
            to="/register"
            class="bg-[#E9322B] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-[11.5px] rounded-lg hover:cursor-pointer font-medium whitespace-nowrap text-sm sm:text-base"
          >
            Daftar
          </NuxtLink>
        </div>
      </div>

      <!-- Secondary Navigation: Category List -->
      <div v-if="isCategoryOpen" class="pt-4 sm:pt-5">
        <nav class="flex items-center gap-4 sm:gap-6 md:gap-10 overflow-x-auto justify-start sm:justify-center pb-2">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="category.href"
            @click="isCategoryOpen = false"
            class="font-medium text-sm sm:text-base text-[#1A1919] hover:cursor-pointer transition whitespace-nowrap"
          >
            {{ category.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="xl:hidden fixed inset-0 bg-black/40 z-[60] transition-opacity"
    ></div>

    <!-- Mobile Sidebar -->
    <aside
      :class="[
        'xl:hidden fixed top-0 left-0 bottom-0 h-full w-[85%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Sidebar Header with Close Button -->
        <div class="flex items-center justify-between p-4 border-b border-[#E6E9F0]">
          <NuxtLink to="/" @click="isSidebarOpen = false" class="flex items-center gap-2 sm:gap-3">
            <NuxtImg 
              :src="logoUrl" 
              alt="Bison Denim Logo" 
              width="144" 
              height="46"
              class="w-32 md:w-36 h-auto"
            />
          </NuxtLink>
          <button
            @click="isSidebarOpen = false"
            class="p-2 hover:bg-[#F8F8F8] rounded-lg transition"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#1A1919"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- Sidebar Content -->
        <div class="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-8">
          <!-- Login Button -->
          <NuxtLink
            to="/login"
            @click="isSidebarOpen = false"
            class="w-full border border-[#E9322B] bg-white text-[#E9322B] px-5 py-3 rounded-lg font-medium text-center text-base hover:bg-[#F8F8F8] transition"
          >
            Masuk
          </NuxtLink>

          <!-- Register Button -->
          <NuxtLink
            to="/register"
            @click="isSidebarOpen = false"
            class="w-full bg-[#E9322B] text-white px-5 py-3 rounded-lg font-medium text-center text-base hover:bg-[#D0282B] transition"
          >
            Daftar
          </NuxtLink>
        </div>
      </div>
    </aside>
  </header>
</template>

<script setup lang="ts">
const router = useRouter();
const cartCount = ref(0);
const isCategoryOpen = ref(false);
const isSidebarOpen = ref(false);
const logoUrl = ref("/assets/img/images.png");

const handleSearch = () => {
  router.push("/products");
};

const categories = [
  { id: 1, name: "Tas", href: "/category/tas" },
  { id: 2, name: "Dompet", href: "/category/dompet" },
  { id: 3, name: "Ikat Pinggang", href: "/category/ikat-pinggang" },
  { id: 4, name: "Aksesoris", href: "/category/aksesoris" },
  { id: 5, name: "Pakaian Pria", href: "/category/pakaian-pria" },
  { id: 6, name: "Pakaian Wanita", href: "/category/pakaian-wanita" },
  { id: 7, name: "Sepatu", href: "/category/sepatu" },
  { id: 8, name: "Jam Tangan", href: "/category/jam-tangan" },
];

const loadLogo = async () => {
  try {
    const { fetchPublicConfig } = useConfig();

    const res = await fetchPublicConfig("store_logo_website");
    if (!res) return;
    
    const configData = res?.data?.config || res?.data;
    if (configData) {
      const data = configData as any;

      if (data.value_image) {
        logoUrl.value = data.value_image;
      }
    }
  } catch (error) {
    console.error("Failed to load logo from config:", error);
  }
};

// Prevent body scroll when sidebar is open
watch(isSidebarOpen, (newValue) => {
  if (process.client) {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});

onMounted(() => {
  loadLogo();
});

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = '';
  }
});
</script>
