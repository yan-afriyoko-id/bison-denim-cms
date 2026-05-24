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
          Metode Pembayaran
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
        <!-- Transfer ke Virtual Account -->
        <div class="border border-[#E6E9F0] rounded-md overflow-hidden">
          <button
            @click="toggleSection('virtualAccount')"
            class="w-full flex items-center justify-between p-2 sm:p-2.5 hover:bg-[#F8F8F8] transition hover:cursor-pointer gap-2"
          >
            <div class="flex flex-col items-start gap-1 sm:gap-1.5 flex-1 min-w-0">
              <span class="text-base sm:text-lg text-[#1A1919]"
                >Transfer ke Virtual Account</span
              >
              <div
                v-if="!expandedSections.virtualAccount"
                class="flex items-center gap-1.5 sm:gap-2"
              >
                <NuxtImg
                  src="/assets/img/icon/bca.png"
                  alt="BCA"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <NuxtImg
                  src="/assets/img/icon/bni.png"
                  alt="BNI"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <NuxtImg
                  src="/assets/img/icon/bri.png"
                  alt="BRI"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <NuxtImg
                  src="/assets/img/icon/mandiri.png"
                  alt="Mandiri"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
              </div>
            </div>
            <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <svg
                class="w-full h-full transition-transform"
                :class="[
                  expandedSections.virtualAccount ? 'rotate-180' : '',
                ]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#1A1919"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>

          <div
            v-if="expandedSections.virtualAccount"
            class="px-2 sm:px-2.5 pb-2 sm:pb-2.5 space-y-1.5"
          >
            <!-- BCA -->
            <button
              @click="selectMethod('bca')"
              class="w-full flex items-center justify-between pl-2 sm:pl-2.5 pr-2 sm:pr-10 hover:bg-[#F8F8F8] rounded-sm transition hover:cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <NuxtImg
                  src="/assets/img/icon/bca.png"
                  alt="BCA"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <span class="text-sm sm:text-base text-[#1A1919]">Bank BCA</span>
              </div>
              <div
                :class="[
                  'w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition shrink-0',
                  localSelectedMethod === 'bca'
                    ? 'border-[#E9322B]'
                    : 'border-[#C1C1C1]',
                ]"
              >
                <div
                  v-if="localSelectedMethod === 'bca'"
                  class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E9322B]"
                ></div>
              </div>
            </button>

            <!-- Mandiri -->
            <button
              @click="selectMethod('mandiri')"
              class="w-full flex items-center justify-between pl-2 sm:pl-2.5 pr-2 sm:pr-10 hover:bg-[#F8F8F8] rounded-sm transition hover:cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <NuxtImg
                  src="/assets/img/icon/mandiri.png"
                  alt="Mandiri"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <span class="text-sm sm:text-base text-[#1A1919]">Bank Mandiri</span>
              </div>
              <div
                :class="[
                  'w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition shrink-0',
                  localSelectedMethod === 'mandiri'
                    ? 'border-[#E9322B]'
                    : 'border-[#C1C1C1]',
                ]"
              >
                <div
                  v-if="localSelectedMethod === 'mandiri'"
                  class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E9322B]"
                ></div>
              </div>
            </button>

            <!-- BNI -->
            <button
              @click="selectMethod('bni')"
              class="w-full flex items-center justify-between pl-2 sm:pl-2.5 pr-2 sm:pr-10 hover:bg-[#F8F8F8] rounded-sm transition hover:cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <NuxtImg
                  src="/assets/img/icon/bni.png"
                  alt="BNI"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <span class="text-sm sm:text-base text-[#1A1919]">Bank BNI</span>
              </div>
              <div
                :class="[
                  'w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition shrink-0',
                  localSelectedMethod === 'bni'
                    ? 'border-[#E9322B]'
                    : 'border-[#C1C1C1]',
                ]"
              >
                <div
                  v-if="localSelectedMethod === 'bni'"
                  class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E9322B]"
                ></div>
              </div>
            </button>

            <!-- BRI -->
            <button
              @click="selectMethod('bri')"
              class="w-full flex items-center justify-between pl-2 sm:pl-2.5 pr-2 sm:pr-10 hover:bg-[#F8F8F8] rounded-sm transition hover:cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <NuxtImg
                  src="/assets/img/icon/bri.png"
                  alt="BRI"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <span class="text-sm sm:text-base text-[#1A1919]">Bank BRI</span>
              </div>
              <div
                :class="[
                  'w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition shrink-0',
                  localSelectedMethod === 'bri'
                    ? 'border-[#E9322B]'
                    : 'border-[#C1C1C1]',
                ]"
              >
                <div
                  v-if="localSelectedMethod === 'bri'"
                  class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E9322B]"
                ></div>
              </div>
            </button>
          </div>
        </div>

        <!-- Uang Elektronik -->
        <div class="border border-[#E6E9F0] rounded-md overflow-hidden">
          <button
            @click="toggleSection('eMoney')"
            class="w-full flex items-center justify-between p-2 sm:p-2.5 hover:bg-[#F8F8F8] transition hover:cursor-pointer gap-2"
          >
            <div class="flex flex-col items-start gap-1 sm:gap-1.5 flex-1 min-w-0">
              <span class="text-base sm:text-lg text-[#1A1919]">Uang Elektronik</span>
              <div
                v-if="!expandedSections.eMoney"
                class="flex items-center gap-1.5 sm:gap-2"
              >
                <NuxtImg
                  src="/assets/img/icon/dana.png"
                  alt="Dana"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <NuxtImg
                  src="/assets/img/icon/gopay.png"
                  alt="GoPay"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
              </div>
            </div>
            <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <svg
                class="w-full h-full transition-transform"
                :class="[
                  expandedSections.eMoney ? 'rotate-180' : '',
                ]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#1A1919"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>

          <div
            v-if="expandedSections.eMoney"
            class="px-2 sm:px-2.5 pb-2 sm:pb-2.5 space-y-1.5"
          >
            <!-- Dana -->
            <button
              @click="selectMethod('dana')"
              class="w-full flex items-center justify-between pl-2 sm:pl-2.5 pr-2 sm:pr-10 hover:bg-[#F8F8F8] rounded-sm transition hover:cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <NuxtImg
                  src="/assets/img/icon/dana.png"
                  alt="Dana"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <span class="text-sm sm:text-base text-[#1A1919]">Dana</span>
              </div>
              <div
                :class="[
                  'w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition shrink-0',
                  localSelectedMethod === 'dana'
                    ? 'border-[#E9322B]'
                    : 'border-[#C1C1C1]',
                ]"
              >
                <div
                  v-if="localSelectedMethod === 'dana'"
                  class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E9322B]"
                ></div>
              </div>
            </button>
            <!-- GoPay -->
            <button
              @click="selectMethod('gopay')"
              class="w-full flex items-center justify-between pl-2 sm:pl-2.5 pr-2 sm:pr-10 hover:bg-[#F8F8F8] rounded-sm transition hover:cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <NuxtImg
                  src="/assets/img/icon/gopay.png"
                  alt="GoPay"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <span class="text-sm sm:text-base text-[#1A1919]">GoPay</span>
              </div>
              <div
                :class="[
                  'w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition shrink-0',
                  localSelectedMethod === 'gopay'
                    ? 'border-[#E9322B]'
                    : 'border-[#C1C1C1]',
                ]"
              >
                <div
                  v-if="localSelectedMethod === 'gopay'"
                  class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E9322B]"
                ></div>
              </div>
            </button>
          </div>
        </div>

        <!-- Bayar dengan QRIS -->
        <div class="border border-[#E6E9F0] rounded-md overflow-hidden">
          <button
            @click="toggleSection('qris')"
            class="w-full flex items-center justify-between p-2 sm:p-2.5 hover:bg-[#F8F8F8] transition hover:cursor-pointer gap-2"
          >
            <div class="flex flex-col items-start gap-1 sm:gap-1.5 flex-1 min-w-0">
              <span class="text-base sm:text-lg text-[#1A1919]">Bayar dengan QRIS</span>
              <NuxtImg
                v-if="!expandedSections.qris"
                src="/assets/img/icon/qris.png"
                alt="QRIS"
                width="32"
                height="32"
                class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
              />
            </div>
            <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
              <svg
                class="w-full h-full transition-transform"
                :class="[
                  expandedSections.qris ? 'rotate-180' : '',
                ]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#1A1919"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>

          <div v-if="expandedSections.qris" class="px-2 sm:px-2.5 pb-2 sm:pb-2.5">
            <button
              @click="selectMethod('qris')"
              class="w-full flex items-center justify-between pl-2 sm:pl-2.5 pr-2 sm:pr-10 hover:bg-[#F8F8F8] rounded-sm transition hover:cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <NuxtImg
                  src="/assets/img/icon/qris.png"
                  alt="QRIS"
                  width="32"
                  height="32"
                  class="w-6 h-6 sm:w-8 sm:h-8 object-cover shrink-0"
                />
                <span class="text-sm sm:text-base text-[#1A1919]">QRIS</span>
              </div>
              <div
                :class="[
                  'w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition shrink-0',
                  localSelectedMethod === 'qris'
                    ? 'border-[#E9322B]'
                    : 'border-[#C1C1C1]',
                ]"
              >
                <div
                  v-if="localSelectedMethod === 'qris'"
                  class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E9322B]"
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  selectedMethod?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectedMethod: "bca",
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:selectedMethod": [method: string];
}>();

const expandedSections = ref({
  virtualAccount: true,
  eMoney: false,
  qris: false,
});

const localSelectedMethod = ref(props.selectedMethod);

const handleClose = () => {
  emit("update:modelValue", false);
};

const toggleSection = (section: "virtualAccount" | "eMoney" | "qris") => {
  expandedSections.value[section] = !expandedSections.value[section];
};

const selectMethod = (method: string) => {
  localSelectedMethod.value = method;
  emit("update:selectedMethod", method);
};

watch(
  () => props.selectedMethod,
  (newValue) => {
    localSelectedMethod.value = newValue;
  },
  { immediate: true }
);
</script>

