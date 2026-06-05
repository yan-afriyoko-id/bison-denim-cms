<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-[10px] w-full max-w-[766px] max-h-[90vh] overflow-y-auto px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-8"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between mb-4 sm:mb-5">
        <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919]">
          Pilih Opsi Pengiriman
        </h2>
        <button
          @click="handleClose"
          class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#F8F8F8] rounded-full transition hover:cursor-pointer shrink-0"
        >
          <div class="w-5 h-5 sm:w-6 sm:h-6">
            <svg
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                fill="black"
              />
            </svg>
          </div>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="space-y-2 sm:space-y-2.5">
        <!-- Kargo Option -->
        <button
          @click="selectOption('kargo')"
          :class="[
            'w-full p-2 sm:p-2.5 border rounded-md text-left transition hover:cursor-pointer',
            selectedOption === 'kargo'
              ? 'border-[#E9322B]'
              : 'border-[#E6E9F0] hover:border-[#E9322B]',
          ]"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-start gap-2 sm:gap-2.5 flex-1 min-w-0">
              <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                <svg
                  class="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 19C8.53043 19 9.03914 18.7893 9.41421 18.4142C9.78929 18.0391 10 17.5304 10 17C10 16.4696 9.78929 15.9609 9.41421 15.5858C9.03914 15.2107 8.53043 15 8 15C7.46957 15 6.96086 15.2107 6.58579 15.5858C6.21071 15.9609 6 16.4696 6 17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19ZM18 19C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17C20 16.4696 19.7893 15.9609 19.4142 15.5858C19.0391 15.2107 18.5304 15 18 15C17.4696 15 16.9609 15.2107 16.5858 15.5858C16.2107 15.9609 16 16.4696 16 17C16 17.5304 16.2107 18.0391 16.5858 18.4142C16.9609 18.7893 17.4696 19 18 19Z"
                    stroke="#8A8A8A"
                    stroke-width="1.5"
                    stroke-miterlimit="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.05 17H15V6.6C15 6.44087 14.9368 6.28826 14.8243 6.17574C14.7117 6.06321 14.5591 6 14.4 6H1M5.65 17H3.6C3.52121 17 3.44319 16.9845 3.37039 16.9543C3.29759 16.9242 3.23145 16.88 3.17574 16.8243C3.12002 16.7685 3.07583 16.7024 3.04567 16.6296C3.01552 16.5568 3 16.4788 3 16.4V11.5"
                    stroke="#8A8A8A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2 9H6"
                    stroke="#8A8A8A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 9H20.61C20.726 9.00003 20.8395 9.03367 20.9367 9.09685C21.034 9.16003 21.1108 9.25005 21.158 9.356L22.948 13.384C22.9821 13.4605 22.9998 13.5433 23 13.627V16.4C23 16.4788 22.9845 16.5568 22.9543 16.6296C22.9242 16.7024 22.88 16.7685 22.8243 16.8243C22.7685 16.88 22.7024 16.9242 22.6296 16.9543C22.5568 16.9845 22.4788 17 22.4 17H20.5M15 17H16"
                    stroke="#8A8A8A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div class="flex-1 flex flex-col gap-1 min-w-0">
                <span class="text-sm sm:text-base md:text-lg font-semibold text-[#1A1919]">
                  Kargo Rp209.500</span
                >
                <p class="text-xs sm:text-sm text-[#5f6368]">
                  Estimasi tiba 23 November - 28 November 2025.
                </p>
              </div>
            </div>
          </div>
        </button>

        <!-- Toko Option -->
        <button
          @click="selectOption('toko')"
          :class="[
            'w-full p-2 sm:p-2.5 border rounded-md text-left transition hover:cursor-pointer',
            selectedOption === 'toko'
              ? 'border-[#E9322B]'
              : 'border-[#E6E9F0] hover:border-[#E9322B]',
          ]"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-start gap-2 sm:gap-2.5 flex-1 min-w-0">
              <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                <svg
                  class="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 6.5V13.5C2.5 17.271 2.501 19.156 3.672 20.328C4.843 21.5 6.729 21.5 10.5 21.5H13.5C17.271 21.5 19.156 21.499 20.328 20.328C21.5 19.157 21.5 17.271 21.5 13.5V6.5M2.5 6.5H21.5M2.5 6.5L3.1 5.7C4.278 4.13 4.867 3.345 5.711 2.922C6.556 2.5 7.537 2.5 9.5 2.5H14.5C16.463 2.5 17.444 2.5 18.289 2.922C19.133 3.345 19.722 4.13 20.9 5.7L21.5 6.5M6 18H11M6 15H9"
                    stroke="#8A8A8A"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div class="flex-1 flex flex-col gap-1 min-w-0">
                <span class="text-sm sm:text-base md:text-lg font-semibold text-[#1A1919]"
                  >Toko Rp100.500</span
                >
                <p class="text-xs sm:text-sm text-[#5f6368]">
                  Estimasi tiba 23 November - 28 November 2025.
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  selectedOption?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectedOption: "kargo",
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:selectedOption": [option: string];
}>();

const localSelectedOption = ref(props.selectedOption);

const handleClose = () => {
  emit("update:modelValue", false);
};

const selectOption = (option: string) => {
  localSelectedOption.value = option;
  emit("update:selectedOption", option);
  handleClose();
};

watch(
  () => props.selectedOption,
  (newValue) => {
    localSelectedOption.value = newValue;
  }
);
</script>

