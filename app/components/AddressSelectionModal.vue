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
        <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919]">Pilih Alamat</h2>
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
      <div class="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
        <div
          v-for="(address, index) in addresses"
          :key="index"
          @click="selectAddressIndex(index)"
          :class="[
            'border rounded-lg cursor-pointer transition',
            selectedIndex === index
              ? 'border-[#E9322B]'
              : 'border-[#E6E9F0] hover:border-[#E9322B]',
          ]"
        >
          <div class="px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 md:pt-5">
            <div class="flex items-start justify-between mb-2 sm:mb-2.5">
              <div class="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <span class="text-base sm:text-lg font-semibold text-[#1A1919]">{{
                  address.label
                }}</span>
                <span
                  v-if="address.isPrimary"
                  class="border text-[#E9322B] text-xs px-2 py-1 rounded"
                >
                  Utama
                </span>
              </div>
            </div>
            <div class="mb-1 flex gap-1 items-center flex-wrap">
              <p class="text-sm sm:text-base font-medium text-[#1A1919]">{{ address.name }}</p>
              <div class="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0">
                <svg
                  class="w-full h-full"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 4.37521C7.36003 4.37521 7.69954 4.44357 8.01855 4.58029C8.33757 4.71701 8.61556 4.90386 8.85254 5.14084C9.08952 5.37782 9.27865 5.65809 9.41992 5.98166C9.5612 6.30523 9.62956 6.64474 9.625 7.00021C9.625 7.3648 9.55664 7.70432 9.41992 8.01877C9.2832 8.33322 9.09635 8.61122 8.85938 8.85275C8.6224 9.09429 8.34212 9.28342 8.01855 9.42014C7.69499 9.55685 7.35547 9.62521 7 9.62521C6.63542 9.62521 6.2959 9.55685 5.98145 9.42014C5.66699 9.28342 5.389 9.09657 5.14746 8.85959C4.90592 8.62261 4.7168 8.34461 4.58008 8.0256C4.44336 7.70659 4.375 7.3648 4.375 7.00021C4.375 6.64019 4.44336 6.30067 4.58008 5.98166C4.7168 5.66265 4.90365 5.38465 5.14062 5.14767C5.3776 4.9107 5.6556 4.72157 5.97461 4.58029C6.29362 4.43902 6.63542 4.37066 7 4.37521Z"
                    fill="#ACACAC"
                  />
                </svg>
              </div>
              <p class="text-xs sm:text-sm text-[#7B7B7B]">{{ address.phone }}</p>
            </div>
            <p class="text-xs sm:text-sm text-[#7B7B7B] mb-4 sm:mb-5">{{ address.fullAddress }}</p>
          </div>
          <div class="pt-4 sm:pt-5 border-t border-[#E6E9F0]">
            <div class="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5">
              <button
                @click.stop="$emit('edit', index)"
                class="text-xs sm:text-sm md:text-base text-[#7B7B7B] bg-[#F8F8F8] px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium hover:underline hover:cursor-pointer"
              >
                Ubah
              </button>
              <button
                @click.stop="$emit('delete', index)"
                class="text-xs sm:text-sm md:text-base text-[#E9322B] px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium hover:underline hover:cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex gap-2 sm:gap-3 pt-4 sm:pt-5 border-t border-[#E6E9F0]">
        <button
          @click="$emit('add')"
          class="flex-1 bg-[#F8F8F8] text-[#7B7B7B] py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base md:text-lg hover:bg-[#E6E9F0] transition hover:cursor-pointer"
        >
          +Alamat
        </button>
        <button
          @click="handleSelect"
          class="flex-2 bg-[#E9322B] text-white py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base md:text-lg hover:bg-[#C4282B] transition hover:cursor-pointer"
        >
          Pilih Alamat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Address {
  label: string;
  name: string;
  phone: string;
  fullAddress: string;
  isPrimary: boolean;
}

interface Props {
  modelValue: boolean;
  addresses: Address[];
  selectedIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  selectedIndex: 0,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:selectedIndex": [index: number];
  select: [index: number];
  edit: [index: number];
  delete: [index: number];
  add: [];
}>();

const localSelectedIndex = ref(props.selectedIndex);

const handleClose = () => {
  emit("update:modelValue", false);
};

const selectAddressIndex = (index: number) => {
  localSelectedIndex.value = index;
  emit("update:selectedIndex", index);
};

const handleSelect = () => {
  emit("select", localSelectedIndex.value);
  handleClose();
};

watch(
  () => props.selectedIndex,
  (newValue) => {
    localSelectedIndex.value = newValue;
  }
);
</script>

