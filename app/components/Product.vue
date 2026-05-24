<template>
  <div
    :class="[
      'rounded-lg overflow-hidden shadow-[2px_4px_8px_0px_#0000000F] transition group hover:cursor-pointer',
      size === 'large' 
        ? 'w-full lg:w-[268px]' 
        : 'w-full lg:w-59.5',
    ]"
  >
    <!-- Image Container -->
    <div
      :class="[
        'overflow-hidden w-full',
        size === 'large' 
          ? 'aspect-square' 
          : 'aspect-square',
      ]"
    >
      <NuxtImg
        :src="image || '/placeholder.svg'"
        :alt="name"
        :class="[
          'w-full h-full object-cover group-hover:scale-110 transition',
        ]"
        fit="cover"
      />
    </div>

    <!-- Content -->
    <div
      :class="[
        'p-2 sm:p-2.5 md:p-3.5 flex flex-col justify-between',
      ]"
    >
      <div>
        <!-- Product Name -->
        <h3 class="font-medium text-[#848484] mb-2 sm:mb-2.5 md:mb-3.5 line-clamp-2 text-xs sm:text-sm min-h-[32px] sm:min-h-[40px] md:min-h-13">
          {{ name }}
        </h3>

        <!-- Price Section -->
        <div class="flex gap-1 sm:gap-1.5 flex-col">
          <!-- Original Price -->
          <div class="flex items-center gap-1.5 sm:gap-2.5">
            <p
              class="text-[10px] sm:text-xs md:text-sm font-medium text-[#C1C1C1]"
              :class="{ 'line-through': discount }"
            >
              {{ price }}
            </p>
            <div
              v-if="discount"
              class="bg-[#E9322B] rounded-full w-7 h-4 sm:w-8.5 sm:h-5 flex items-center justify-center text-white text-[8px] sm:text-[10px] font-medium"
            >
              {{ discount }}%
            </div>
          </div>
          <!-- Discounted Price -->
          <div class="flex items-center gap-2.5">
            <p class="text-sm sm:text-base md:text-xl font-semibold text-[#1A1919]">
              {{ discountedPrice }}
            </p>
          </div>
        </div>
      </div>

      <!-- Rating and New Arrival -->
      <div class="flex justify-between items-center mt-2 sm:mt-2.5">
        <!-- Rating -->
        <div class="flex items-center gap-0.5 sm:gap-1">
          <svg
            class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-[15px] md:h-[15px]"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.64062 13.125L4.65625 8.73437L1.25 5.78125L5.75 5.39062L7.5 1.25L9.25 5.39062L13.75 5.78125L10.3438 8.73437L11.3594 13.125L7.5 10.7969L3.64062 13.125Z"
              fill="#FFCC00"
            />
          </svg>
          <p class="text-[10px] sm:text-xs md:text-sm text-[#1A1919]">{{ rating }}</p>
          <div class="w-[0.6px] h-3 sm:h-4 md:h-[16px] bg-[#E6E9F0]"></div>
          <p class="text-[10px] sm:text-xs md:text-sm text-[#C7C7C7]">({{ reviews }})</p>
        </div>

        <div v-if="newArrival" class="flex gap-[2px] sm:gap-[3px] items-center">
          <svg
            class="w-3 h-3 sm:w-4 sm:h-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00016 14.5955C4.31816 14.5955 1.3335 11.6109 1.3335 7.92887C1.3335 4.24687 4.31816 1.26221 8.00016 1.26221C11.6822 1.26221 14.6668 4.24754 14.6668 7.92887C14.6668 11.6102 11.6822 14.5955 8.00016 14.5955ZM8.00016 4.59554C7.82335 4.59554 7.65378 4.66578 7.52876 4.7908C7.40373 4.91583 7.3335 5.0854 7.3335 5.26221V8.59554C7.3335 8.77235 7.40373 8.94192 7.52876 9.06695C7.65378 9.19197 7.82335 9.26221 8.00016 9.26221C8.17697 9.26221 8.34654 9.19197 8.47157 9.06695C8.59659 8.94192 8.66683 8.77235 8.66683 8.59554V5.26221C8.66683 5.0854 8.59659 4.91583 8.47157 4.7908C8.34654 4.66578 8.17697 4.59554 8.00016 4.59554ZM8.00016 11.2622C8.17697 11.2622 8.34654 11.192 8.47157 11.0669C8.59659 10.9419 8.66683 10.7724 8.66683 10.5955C8.66683 10.4187 8.59659 10.2492 8.47157 10.1241C8.34654 9.99911 8.17697 9.92887 8.00016 9.92887C7.82335 9.92887 7.65378 9.99911 7.52876 10.1241C7.40373 10.2492 7.3335 10.4187 7.3335 10.5955C7.3335 10.7724 7.40373 10.9419 7.52876 11.0669C7.65378 11.192 7.82335 11.2622 8.00016 11.2622Z"
              fill="#E9322B"
            />
          </svg>

          <p class="text-[10px] sm:text-xs md:text-[13px] font-medium text-[#E9322B]">New Arrival</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  image?: string;
  price: string;
  discountedPrice?: string;
  rating?: number;
  reviews?: number;
  discount?: string;
  newArrival?: boolean;
  size?: "small" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  image: "/placeholder.svg",
  rating: 0,
  reviews: 0,
  discount: undefined,
  discountedPrice: undefined,
  newArrival: false,
  size: "small",
});
</script>

<style scoped></style>
