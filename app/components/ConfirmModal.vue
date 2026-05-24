<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-2 sm:p-4"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-[10px] w-full max-w-[554px]"
      @click.stop
    >
      <div class="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
        <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919]">
          {{ title }}
        </h2>
        <p class="text-sm sm:text-base text-[#1A1919]">
          {{ message }}
        </p>
        <div class="flex items-center gap-2 sm:gap-3">
          <button
            @click="handleClose"
            class="flex-1 border border-[#E9322B] text-[#E9322B] py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-[#F8F8F8] transition hover:cursor-pointer"
          >
            Batal
          </button>
          <button
            @click="handleConfirm"
            class="flex-1 bg-[#E9322B] text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-[#C4282B] transition hover:cursor-pointer"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Konfirmasi",
  message: "Apakah Anda yakin?",
  confirmText: "Konfirmasi",
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [];
}>();

const handleClose = () => {
  emit("update:modelValue", false);
};

const handleConfirm = () => {
  emit("confirm");
  handleClose();
};
</script>
