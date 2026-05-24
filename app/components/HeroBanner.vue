<template>
  <section class="relative mx-2 sm:mx-4 md:mx-0 overflow-hidden my-4">
    <!-- Carousel Container -->
    <div
      class="max-w-8xl relative aspect-[1424/405] w-full mx-auto"
    >
      <!-- Slides -->
      <TransitionGroup tag="div" name="carousel" class="w-full h-full relative">
        <div
          v-for="(slide, index) in slides"
          v-show="index === currentSlide"
          :key="index"
          class="absolute inset-0 w-full px-0 sm:px-6 md:px-8 lg:px-11 sm:py-3 md:py-4 lg:py-5"
        >
          <NuxtImg
            :src="slide.image"
            :alt="slide.title"
            class="w-full aspect-[1424/405] object-cover rounded-lg"
          />
        </div>
      </TransitionGroup>

      <!-- Navigation Arrows -->
      <button
        @click="previousSlide"
        class="w-6 sm:w-10 h-6 sm:h-10 absolute left-2 sm:left-8 md:left-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full flex justify-center items-center hover:cursor-pointer shadow-[0px_4px_10px_0px_#0000000F]"
        aria-label="Previous slide"
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
        @click="nextSlide"
        class="w-6 sm:w-10 h-6 sm:h-10 absolute right-2 sm:right-8 md:right-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full flex justify-center items-center hover:cursor-pointer shadow-[0px_4px_10px_0px_#0000000F]"
        aria-label="Next slide"
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

    <!-- Dots Indicator -->
    <div
      class="absolute bottom-2 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center"
    >
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="currentSlide = index"
        :class="[
          'w-[5px] h-[5px] rounded-full transition-all duration-300',
          index === currentSlide
            ? 'bg-white w-[7px] h-[7px]'
            : 'bg-[rgba(217,217,217,1)]',
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  title: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Nyaman dan Elegan di Setiap Sudut",
    image: "/assets/img/banner/banner-1.png",
  },
  {
    title: "Furniture Berkualitas Tinggi",
    image: "/assets/img/banner/banner-1.png",
  },
  {
    title: "Dapatkan Diskon Hingga 70%",
    image: "/assets/img/banner/banner-1.png",
  },
];

const currentSlide = ref(0);
let autoplayInterval: ReturnType<typeof setInterval>;

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

const nextSlide = () => {
  stopAutoplay();
  currentSlide.value = (currentSlide.value + 1) % slides.length;
  startAutoplay();
};

const previousSlide = () => {
  stopAutoplay();
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.5s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}

.carousel-enter-to,
.carousel-leave-from {
  opacity: 1;
}
</style>
