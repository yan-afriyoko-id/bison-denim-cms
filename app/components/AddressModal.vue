<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-2 sm:p-4"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-[10px] w-full max-w-[766px] max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between px-4 sm:px-5 md:px-6 pt-5 sm:pt-6 md:pt-8"
      >
        <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919]">
          {{ editingAddress ? "Ubah Alamat" : "Alamat Baru" }}
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
                d="M18 6L6 18M6 6L18 18"
                stroke="#1A1919"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      <!-- Modal Content -->
      <form @submit.prevent="handleSubmit" class="py-4 sm:py-5 px-4 sm:px-6 md:px-8 space-y-4 sm:space-y-5 md:space-y-6">
        <!-- Tandai Sebagai -->
        <div>
          <label class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2 sm:mb-3">
            Tandai Sebagai:
          </label>
          <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              v-for="label in addressLabels"
              :key="label"
              type="button"
              @click="form.label = label"
              :class="[
                'px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg font-medium text-sm sm:text-base md:text-lg transition hover:cursor-pointer',
                form.label === label
                  ? 'border-[#E9322B] text-[#E9322B] bg-[#E9322B14]'
                  : 'border-[#E6E9F0] text-[#808080] hover:border-[#E9322B] hover:bg-[#E9322B14]',
              ]"
            >
              {{ label }}
            </button>
          </div>
        </div>

        <!-- Nama Penerima dan Nomor HP Penerima -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2">
              Nama Penerima:
            </label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E6E9F0] rounded-lg focus:outline-none focus:border-[#E9322B] text-sm sm:text-base md:text-lg"
              placeholder="Masukkan nama penerima"
              required
            />
          </div>

          <div>
            <label class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2">
              Nomor Hp Penerima
            </label>
            <input
              v-model="form.phone"
              type="text"
              class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E6E9F0] rounded-lg focus:outline-none focus:border-[#E9322B] text-sm sm:text-base md:text-lg"
              placeholder="Masukkan nomor HP"
              required
            />
          </div>
        </div>

        <!-- Wilayah Administratif -->
        <div>
          <label class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2">
            Wilayah Administratif
          </label>
          <input
            v-model="form.administrativeRegion"
            type="text"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E6E9F0] rounded-lg focus:outline-none focus:border-[#E9322B] text-sm sm:text-base md:text-lg"
            placeholder="Provinsi, Kota, Kecamatan, Kode pos"
          />
        </div>

        <!-- Alamat Lengkap -->
        <div>
          <label class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2">
            Alamat Lengkap dan Catatan untuk Kurir
          </label>
          <textarea
            v-model="form.fullAddress"
            rows="3"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E6E9F0] rounded-lg focus:outline-none focus:border-[#E9322B] resize-none text-sm sm:text-base md:text-lg"
            placeholder="Masukkan nama jalan, gedung, lantai, nomor, RT/RW, dan catatan untuk kurir (contoh: warna rumah, no. apartemen)"
            required
          ></textarea>
        </div>

        <!-- Koordinat Lokasi -->
        <div>
          <label class="block text-sm sm:text-base text-[#1A1919] font-medium mb-2">
            Koordinat Lokasi
          </label>
          <div class="flex items-center justify-center bg-[#F8F8F8] border border-dashed border-[#E6E9F0] rounded-md py-5 sm:py-6 md:py-7">
            <button
              type="button"
              class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E6E9F0] rounded-md text-[#ACACAC] hover:bg-[#F8F8F8] transition hover:cursor-pointer bg-white text-xs sm:text-sm md:text-[15px]"
            >
              <div class="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0">
                <svg
                  class="w-full h-full"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_703_8334)">
                    <path d="M9 9.75C11.4853 9.75 13.5 7.73528 13.5 5.25C13.5 2.76472 11.4853 0.75 9 0.75C6.51472 0.75 4.5 2.76472 4.5 5.25C4.5 7.73528 6.51472 9.75 9 9.75Z" stroke="#ACACAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 9.75V17.25" stroke="#ACACAC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_703_8334">
                      <rect width="18" height="18" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Pilih lokasi
            </button>
          </div>
        </div>
      </form>

      <!-- Modal Footer -->
      <div class="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 md:pb-8">
        <button
          type="button"
          @click="handleSubmit"
          class="w-full bg-[#E9322B] text-white py-2 sm:py-2.5 rounded-lg font-medium text-base sm:text-lg hover:bg-[#C4282B] transition hover:cursor-pointer"
        >
          Simpan Alamat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Address {
  id?: number;
  label: string;
  name: string;
  phone: string;
  fullAddress: string;
  administrativeRegion?: string;
  isPrimary: boolean;
}

interface Props {
  modelValue: boolean;
  editingAddress?: Address | null;
}

const props = withDefaults(defineProps<Props>(), {
  editingAddress: null,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  save: [address: Address];
}>();

const addressLabels = ["Rumah", "Kantor", "Apartement", "Kost"];

const form = ref<Address>({
  label: "",
  name: "",
  phone: "",
  fullAddress: "",
  administrativeRegion: "",
  isPrimary: false,
});

const resetForm = () => {
  form.value = {
    label: "",
    name: "",
    phone: "",
    fullAddress: "",
    administrativeRegion: "",
    isPrimary: false,
  };
};

// Watch for editingAddress changes to populate form
watch(
  () => props.editingAddress,
  (newAddress) => {
    if (newAddress) {
      form.value = {
        label: newAddress.label || "",
        name: newAddress.name || "",
        phone: newAddress.phone || "",
        fullAddress: newAddress.fullAddress || "",
        administrativeRegion: newAddress.administrativeRegion || "",
        isPrimary: newAddress.isPrimary || false,
      };
    } else {
      resetForm();
    }
  },
  { immediate: true, deep: true }
);

// Reset form when modal closes
watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) {
      resetForm();
    } else if (props.editingAddress) {
      // Populate form when modal opens with editing address
      form.value = {
        label: props.editingAddress.label || "",
        name: props.editingAddress.name || "",
        phone: props.editingAddress.phone || "",
        fullAddress: props.editingAddress.fullAddress || "",
        administrativeRegion: props.editingAddress.administrativeRegion || "",
        isPrimary: props.editingAddress.isPrimary || false,
      };
    }
  }
);

const handleClose = () => {
  emit("update:modelValue", false);
};

const handleSubmit = () => {
  const addressData: Address = {
    ...form.value,
    ...(props.editingAddress?.id && { id: props.editingAddress.id }),
  };
  emit("save", addressData);
  handleClose();
};
</script>
