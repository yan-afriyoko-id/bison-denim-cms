<template>
  <div
    id="variantModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="variantModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5
            class="modal-title d-flex align-items-center"
            id="variantModalLabel"
          >
            <i class="bi bi-box-seam me-2"></i>
            {{
              editingVariantIndex !== null ? "Edit Variant" : "Add New Variant"
            }}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handleCancel"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Tab Navigation -->
          <ul class="nav nav-tabs mb-4" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="attributes-tab"
                data-bs-toggle="tab"
                data-bs-target="#attributes-pane"
                type="button"
                role="tab"
              >
                <i class="bi bi-tags me-1"></i>Attributes
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="details-tab"
                data-bs-toggle="tab"
                data-bs-target="#details-pane"
                type="button"
                role="tab"
              >
                <i class="bi bi-info-circle me-1"></i>Details
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="stock-tab"
                data-bs-toggle="tab"
                data-bs-target="#stock-pane"
                type="button"
                role="tab"
              >
                <i class="bi bi-shop me-1"></i>Stock
              </button>
            </li>
          </ul>

          <!-- Tab Content -->
          <div class="tab-content">
            <!-- Attributes Tab -->
            <div
              class="tab-pane fade show active"
              id="attributes-pane"
              role="tabpanel"
            >
              <div class="row g-3">
                <div class="col-12">
                  <div
                    v-if="selectedAttributes.length === 0"
                    class="text-muted small"
                  >
                    No attributes available.
                  </div>

                  <div v-else class="row g-3">
                    <div
                      v-for="selectedAttr in selectedAttributes"
                      :key="selectedAttr.attribute_id"
                      class="col-12"
                    >
                      <div class="card border-primary">
                        <div class="card-header bg-light">
                          <label class="form-label fw-bold mb-0">
                            <i class="bi bi-tag me-2"></i>
                            {{ getAttributeName(selectedAttr.attribute_id) }}
                          </label>
                        </div>
                        <div class="card-body">
                          <div class="row g-3">
                            <div
                              v-for="value in getAttributeValuesList(
                                selectedAttr.attribute_id,
                              )"
                              :key="value.id"
                              class="col-md-3 col-sm-6 col-12"
                            >
                              <div
                                class="form-check variant-attribute-option p-2 rounded mb-0 h-100 d-flex align-items-center"
                                :class="{
                                  'is-selected':
                                    localVariantForm.selectedAttributeValues[
                                      selectedAttr.attribute_id
                                    ] === value.id,
                                  'is-disabled':
                                    editingVariantIndex !== null ||
                                    value.status === 'INACTIVE',
                                }"
                              >
                                <input
                                  class="form-check-input me-2 mt-0"
                                  type="radio"
                                  :name="`attr-${selectedAttr.attribute_id}`"
                                  :value="value.id"
                                  :id="`variant-attr-${selectedAttr.attribute_id}-value-${value.id}`"
                                  v-model="
                                    localVariantForm.selectedAttributeValues[
                                      selectedAttr.attribute_id
                                    ]
                                  "
                                  @change="handleUpdateVariantName"
                                  :disabled="
                                    editingVariantIndex !== null ||
                                    value.status === 'INACTIVE'
                                  "
                                  :title="
                                    value.status === 'INACTIVE'
                                      ? 'INACTIVE values cannot be selected'
                                      : ''
                                  "
                                />
                                <label
                                  class="form-check-label flex-grow-1 mb-0"
                                  :for="`variant-attr-${selectedAttr.attribute_id}-value-${value.id}`"
                                  :class="{
                                    'text-muted':
                                      (editingVariantIndex !== null ||
                                        value.status === 'INACTIVE') &&
                                      localVariantForm.selectedAttributeValues[
                                        selectedAttr.attribute_id
                                      ] !== value.id,
                                    'selected-option-label':
                                      localVariantForm.selectedAttributeValues[
                                        selectedAttr.attribute_id
                                      ] === value.id,
                                    'cursor-not-allowed':
                                      value.status === 'INACTIVE',
                                  }"
                                >
                                  {{ value.value }}
                                  <span
                                    v-if="value.status === 'INACTIVE'"
                                    class="badge bg-secondary ms-2"
                                  >
                                    INACTIVE
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="
                              getAttributeValuesList(selectedAttr.attribute_id)
                                .length === 0
                            "
                            class="text-muted small mt-2"
                          >
                            No values available.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Variant Name Input -->
                  <div class="col-12 mt-3">
                    <label class="form-label fw-bold">
                      <i class="bi bi-pencil-square me-1"></i>
                      Variant Name
                    </label>
                    <input
                      v-model="localVariantForm.variant_name"
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Variant name"
                    />
                  </div>

                </div>
              </div>
            </div>

            <!-- Details Tab -->
            <div class="tab-pane fade" id="details-pane" role="tabpanel">
              <div class="row g-3">
                <!-- Variant Image Section -->
                <div class="col-12">
                  <div class="border-bottom pb-2 mb-3">
                    <h6 class="mb-0 text-primary">
                      <i class="bi bi-image me-2"></i>Variant Image
                    </h6>
                  </div>
                </div>
                <div class="col-12">
                  <div class="variant-image-upload">
                    <input
                      ref="variantImageInput"
                      type="file"
                      accept="image/*"
                      class="d-none"
                      @change="handleVariantImageSelect"
                    />

                    <div
                      class="variant-image-box"
                      :class="{
                        'has-image':
                          localVariantForm.image_preview ||
                          localVariantForm.image_path,
                      }"
                      role="button"
                      tabindex="0"
                      @click="triggerVariantImageInput"
                      @keydown.enter="triggerVariantImageInput"
                      @keydown.space.prevent="triggerVariantImageInput"
                    >
                      <template
                        v-if="
                          localVariantForm.image_preview ||
                          localVariantForm.image_path
                        "
                      >
                        <img
                          :src="
                            localVariantForm.image_preview ??
                            localVariantForm.image_path ??
                            undefined
                          "
                          alt="Variant preview"
                          class="variant-image-preview"
                        />
                        <div
                          class="variant-image-overlay d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-pencil"></i>
                        </div>
                        <button
                          type="button"
                          class="btn-remove-variant-image"
                          @click.stop="handleClearVariantImage"
                        >
                          <i class="bi bi-x"></i>
                        </button>
                      </template>
                      <template v-else>
                        <i class="bi bi-image variant-image-icon"></i>
                        <span class="mt-2">Upload Variant Image</span>
                      </template>
                    </div>
                  </div>
                  <small class="text-muted d-block mt-2">
                    Supported formats: JPG, PNG, GIF, WEBP. Max size: 5MB.
                  </small>
                </div>

                <!-- Product Details Section -->
                <div class="col-12 mt-4">
                  <div class="border-bottom pb-2 mb-3">
                    <h6 class="mb-0 text-primary">
                      <i class="bi bi-info-circle me-2"></i>Details
                    </h6>
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    <i class="bi bi-upc me-1"></i>
                    SKU
                  </label>
                  <input
                    v-model="localVariantForm.sku"
                    type="text"
                    class="form-control"
                    placeholder="SKU-001"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    <i class="bi bi-currency-dollar me-1"></i>
                    Selling Price <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text">Rp</span>
                    <input
                      v-model.number="localVariantForm.price"
                      type="number"
                      step="0.01"
                      required
                      class="form-control"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    <i class="bi bi-tag me-1"></i>
                    Original Price
                    <span
                      v-if="discountPercentage !== null"
                      class="badge bg-danger ms-2"
                    >
                      {{ discountPercentage }}% OFF
                    </span>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text">Rp</span>
                    <input
                      v-model.number="localVariantForm.strike_price"
                      type="number"
                      step="0.01"
                      class="form-control"
                      placeholder="0.00"
                    />
                  </div>
                  <small
                    v-if="discountPercentage !== null"
                    class="text-success d-block mt-1"
                  >
                    <i class="bi bi-percent me-1"></i>
                    Discount: {{ discountPercentage }}%
                  </small>
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    <i class="bi bi-toggle-on me-1"></i>
                    Status
                  </label>
                  <select v-model="localVariantForm.status" class="form-select">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
                <!-- Weight fields (hidden but functional) -->
                <div class="col-md-6" style="display: none;">
                  <label class="form-label"
                    >Weight ({{
                      localVariantForm.type_weight === "GRAM" ? "g" : "kg"
                    }})</label
                  >
                  <input
                    v-model.number="localVariantForm.weight"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-control"
                    placeholder="0.00"
                  />
                </div>
                <div class="col-md-6" style="display: none;">
                  <label class="form-label">Weight Type</label>
                  <select
                    v-model="localVariantForm.type_weight"
                    class="form-select"
                  >
                    <option value="GRAM">Gram</option>
                    <option value="KG">Kilogram</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Stock Tab -->
            <div class="tab-pane fade" id="stock-pane" role="tabpanel">
              <div class="row g-3">
                <div class="col-12">
                  <!-- Header -->
                  <div
                    class="card mb-4"
                    :class="{
                      'border-primary': localEditingStoreStockIndex !== null,
                    }"
                  >
                    <div class="card-header bg-white">
                      <div class="d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">
                          <i class="bi bi-plus-circle me-2"></i>
                          {{ localEditingStoreStockIndex !== null ? 'Edit Stock' : 'Add Stock' }}
                        </h6>
                        <button
                          v-if="localEditingStoreStockIndex !== null"
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                          @click="handleResetStoreStockForm"
                        >
                          <i class="bi bi-x-circle me-1"></i> Cancel
                        </button>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row g-3 align-items-end">
                        <div class="col-lg-3 col-md-4 col-6">
                          <div class="stock-form-field h-100 d-flex flex-column">
                          <label class="form-label fw-semibold"
                            >Stock Qty <span class="text-danger">*</span></label
                          >
                          <input
                            v-model.number="localStoreStockForm.qty"
                            type="number"
                            min="0"
                            step="1"
                            class="form-control"
                            placeholder="0"
                          />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-6">
                          <div class="stock-form-field h-100 d-flex flex-column">
                          <label class="form-label fw-semibold">Reserved Qty</label>
                          <input
                            v-model.number="localStoreStockForm.reserved_qty"
                            type="number"
                            min="0"
                            step="1"
                            class="form-control"
                            placeholder="0"
                          />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-6">
                          <div class="stock-form-field h-100 d-flex flex-column">
                          <label class="form-label fw-semibold">Available</label>
                          <div class="form-control bg-light">{{ stockFormAvailableQty }}</div>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-12 col-6">
                          <div class="stock-form-field h-100 d-flex flex-column">
                          <label class="form-label fw-semibold text-transparent">Action</label>
                          <button
                            type="button"
                            class="btn btn-primary action-btn-dark w-100 py-2"
                            @click="handleSaveStoreStock"
                            :disabled="!canSaveStoreStock"
                          >
                            <span
                              v-if="savingStoreStock"
                              class="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            <i v-else class="bi bi-save me-2"></i>
                            {{
                              localEditingStoreStockIndex !== null ? 'Update' : 'Add'
                            }}
                          </button>
                          </div>
                        </div>
                      </div>

                      <div
                        v-if="isStoreStockDuplicate"
                        class="alert alert-light border mb-0 mt-3 py-2"
                        role="alert"
                      >
                        Stock has already been added.
                      </div>
                      <div
                        v-else-if="isReservedExceedingQty"
                        class="alert alert-light border mb-0 mt-3 py-2"
                        role="alert"
                      >
                        Reserved cannot exceed stock.
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="sortedVariantStoreStocks.length > 0"
                    class="table-responsive stock-table-wrap"
                  >
                    <table class="table table-sm table-bordered">
                      <thead class="table-light">
                        <tr>
                          <th class="text-center" style="width: 22%;">Stock</th>
                          <th class="text-center" style="width: 22%;">Reserved</th>
                          <th class="text-center" style="width: 22%;">Available</th>
                          <th class="text-center" style="width: 22%;">Status</th>
                          <th class="text-center" style="width: 12%;">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="({ storeStock, index }) in sortedVariantStoreStocks"
                          :key="
                            storeStock.id ||
                            `store-${storeStock.store_id}-${index}`
                          "
                        >
                          <td class="text-center fw-semibold">{{ storeStock.qty }}</td>
                          <td class="text-center">{{ storeStock.reserved_qty || 0 }}</td>
                          <td class="text-center fw-semibold">
                            {{
                              (storeStock.qty || 0) -
                              (storeStock.reserved_qty || 0)
                            }}
                          </td>
                          <td class="text-center">
                            <span
                              class="badge"
                              :class="getStockStatusBadgeClass(storeStock)"
                            >
                              {{ getStockStatusLabel(storeStock) }}
                            </span>
                          </td>
                          <td class="text-center">
                            <div class="btn-group btn-group-sm" role="group">
                              <button
                                type="button"
                                class="btn btn-outline-secondary"
                                title="Edit"
                                @click="handleEditStoreStock(index)"
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-secondary"
                                title="Delete"
                                @click="handleDeleteStoreStock(index)"
                              >
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot class="table-light">
                        <tr>
                          <th class="fw-bold text-secondary">Total</th>
                          <th class="fw-bold">{{ totalVariantStock }}</th>
                          <th class="fw-bold">{{ totalReservedStock }}</th>
                          <th class="fw-bold">{{ totalAvailableStock }}</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div v-else class="text-center py-4">
                    <i class="bi bi-inbox fs-1 text-muted mb-2"></i>
                    <p class="text-muted mb-0">No stock yet</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            type="button"
            :class="
              editingVariantIndex !== null
                ? 'btn btn-success'
                : 'btn btn-primary action-btn-dark'
            "
            @click="handleSave"
            :disabled="savingVariant"
          >
            <span
              v-if="savingVariant"
              class="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
            {{
              editingVariantIndex !== null ? "Update Variant" : "Add Variant"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { useToast } from "~/composables/useToast";
import { useStoreApi } from "~/composables/useStoreApi";

interface Props {
  selectedAttributes: Array<{
    attribute_id: number;
    sort: number;
    values: number[];
  }>;
  variantForm: {
    selectedAttributeValues: Record<number, number>;
    attribute_value_ids: number[];
    variant_name: string;
    sku: string;
    price: number;
    strike_price: number | null;
    status: "ACTIVE" | "INACTIVE";
    image_file: File | null;
    image_preview: string | null;
    image_path: string | null;
    weight: number | null;
    type_weight: "GRAM" | "KG";
  };
  variantStoreStocks: Array<{
    id?: number;
    store_id: number;
    qty: number;
    reserved_qty: number;
    store?: {
      id: number;
      name: string;
      code?: string;
    };
  }>;
  editingVariantIndex: number | null;
  availableAttributes: Array<{
    id: number;
    name: string;
    slug: string;
    attribute_values?: Array<{
      id: number;
      value: string;
      slug: string;
      status?: string;
    }>;
  }>;
  productSlug?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  save: [variantData: any];
  cancel: [];
  "update:variantForm": [form: Props["variantForm"]];
  "update:variantStoreStocks": [stocks: Props["variantStoreStocks"]];
  "update-variant-name": [];
  "update-variant-sku": [];
}>();

const toast = useToast();
const { getAllStores } = useStoreApi();

// Local state
const localVariantForm = ref({ ...props.variantForm });
const localVariantStoreStocks = ref([...props.variantStoreStocks]);
const localEditingStoreStockIndex = ref<number | null>(null);
const localStoreStockForm = ref({
  store_id: null as number | null,
  qty: 0,
  reserved_qty: 0,
});
const stores = ref<
  Array<{
    id: number;
    name: string;
    code?: string;
  }>
>([]);
const loadingStores = ref(false);
const savingStoreStock = ref(false);
const savingVariant = ref(false);
const variantImageInput = ref<HTMLInputElement | null>(null);

// Watch for prop changes
watch(
  () => props.variantForm,
  (newForm) => {
    localVariantForm.value = { ...newForm };
  },
  { deep: true },
);

watch(
  () => props.variantStoreStocks,
  (newStocks) => {
    localVariantStoreStocks.value = [...newStocks];
  },
  { deep: true },
);

// Computed
const totalVariantStock = computed(() => {
  return localVariantStoreStocks.value.reduce(
    (sum, stock) => sum + (stock.qty || 0),
    0,
  );
});

const totalReservedStock = computed(() => {
  return localVariantStoreStocks.value.reduce(
    (sum, stock) => sum + (stock.reserved_qty || 0),
    0,
  );
});

const totalAvailableStock = computed(() => {
  return totalVariantStock.value - totalReservedStock.value;
});

const assignedStoreIds = computed(() => {
  return new Set(
    localVariantStoreStocks.value
      .filter((_, idx) => idx !== localEditingStoreStockIndex.value)
      .map((stock) => stock.store_id),
  );
});

const availableStoreOptions = computed(() => {
  return [...stores.value].sort((a, b) => {
    const aAssigned = assignedStoreIds.value.has(a.id);
    const bAssigned = assignedStoreIds.value.has(b.id);

    if (aAssigned !== bAssigned) {
      return Number(aAssigned) - Number(bAssigned);
    }

    return a.name.localeCompare(b.name);
  });
});

const stockFormAvailableQty = computed(() => {
  const qty = Number(localStoreStockForm.value.qty) || 0;
  const reservedQty = Number(localStoreStockForm.value.reserved_qty) || 0;
  return Math.max(0, qty - reservedQty);
});

const isStoreStockDuplicate = computed(() => {
  if (!localStoreStockForm.value.store_id) return false;

  return localVariantStoreStocks.value.some(
    (stock, idx) =>
      stock.store_id === localStoreStockForm.value.store_id &&
      idx !== localEditingStoreStockIndex.value,
  );
});

const isReservedExceedingQty = computed(() => {
  return (
    (Number(localStoreStockForm.value.reserved_qty) || 0) >
    (Number(localStoreStockForm.value.qty) || 0)
  );
});

const canSaveStoreStock = computed(() => {
  return Boolean(
    localStoreStockForm.value.store_id &&
      localStoreStockForm.value.qty >= 0 &&
      localStoreStockForm.value.reserved_qty >= 0 &&
      !isStoreStockDuplicate.value &&
      !isReservedExceedingQty.value &&
      !savingStoreStock.value,
  );
});

const sortedVariantStoreStocks = computed(() => {
  return localVariantStoreStocks.value
    .map((storeStock, index) => ({ storeStock, index }))
    .sort((a, b) =>
      (a.storeStock.store?.name || "").localeCompare(b.storeStock.store?.name || ""),
    );
});

const discountPercentage = computed(() => {
  if (
    !localVariantForm.value.strike_price ||
    !localVariantForm.value.price ||
    localVariantForm.value.strike_price <= 0 ||
    localVariantForm.value.price >= localVariantForm.value.strike_price
  ) {
    return null;
  }
  const discount =
    ((localVariantForm.value.strike_price - localVariantForm.value.price) /
      localVariantForm.value.strike_price) *
    100;
  return Math.round(discount * 100) / 100; // Round to 2 decimal places
});

// Methods
const getAttributeName = (attributeId: number) => {
  const attribute = props.availableAttributes.find(
    (attr) => attr.id === attributeId,
  );
  return attribute?.name || `Attribute ${attributeId}`;
};

const getAttributeValuesList = (attributeId: number) => {
  const attribute = props.availableAttributes.find(
    (attr) => attr.id === attributeId,
  );
  const allValues = attribute?.attribute_values || [];

  const selectedAttr = props.selectedAttributes.find(
    (sa) => sa.attribute_id === attributeId,
  );
  if (selectedAttr && selectedAttr.values.length > 0) {
    return allValues.filter((v) => selectedAttr.values.includes(v.id));
  }
  return [];
};

const handleUpdateVariantName = () => {
  const variantNameParts: string[] = [];
  const selectedValueIds: number[] = [];

  props.selectedAttributes.forEach((selectedAttr) => {
    const selectedValueId =
      localVariantForm.value.selectedAttributeValues[selectedAttr.attribute_id];
    if (selectedValueId) {
      if (selectedAttr.values.includes(selectedValueId)) {
        selectedValueIds.push(selectedValueId);
        const value = getAttributeValuesList(selectedAttr.attribute_id).find(
          (v) => v.id === selectedValueId,
        );
        if (value) {
          const attrName = getAttributeName(selectedAttr.attribute_id);
          variantNameParts.push(`${attrName}: ${value.value}`);
        }
      } else {
        delete localVariantForm.value.selectedAttributeValues[
          selectedAttr.attribute_id
        ];
      }
    }
  });

  if (variantNameParts.length === 0) {
    localVariantForm.value.variant_name = "Default Variant";
  } else {
    localVariantForm.value.variant_name = variantNameParts.join(" - ");
  }
  localVariantForm.value.attribute_value_ids = selectedValueIds;

  // Generate SKU automatically if empty or if this is a new variant
  // Or regenerate when editing to match attribute selection
  if (!localVariantForm.value.sku || props.editingVariantIndex === null) {
    localVariantForm.value.sku = generateSKU();
  } else {
    // When editing, regenerate SKU based on current attribute selection
    // This ensures SKU matches the attribute combination
    localVariantForm.value.sku = generateSKU();
  }

  emit("update:variantForm", { ...localVariantForm.value });
  emit("update-variant-name");
  emit("update-variant-sku");
};

const generateSKU = () => {
  // Use product slug if available, otherwise use a default prefix
  const productPrefix = props.productSlug
    ? props.productSlug.replace(/[^a-zA-Z0-9]/g, "-").toUpperCase().substring(0, 6)
    : "SKU";

  // Get attribute value slugs to create unique SKU based on selected values
  const attrValueSlugs: string[] = [];

  // Sort selectedAttributes by attribute_id to ensure consistent ordering
  const sortedAttrs = [...props.selectedAttributes].sort(
    (a, b) => a.attribute_id - b.attribute_id
  );

  sortedAttrs.forEach((selectedAttr) => {
    const selectedValueId =
      localVariantForm.value.selectedAttributeValues[selectedAttr.attribute_id];
    if (selectedValueId) {
      const value = getAttributeValuesList(selectedAttr.attribute_id).find(
        (v) => v.id === selectedValueId,
      );
      if (value && value.slug) {
        attrValueSlugs.push(value.slug.substring(0, 3).toUpperCase());
      } else if (value) {
        // Fallback: use first 3 chars of value if no slug
        attrValueSlugs.push(value.value.substring(0, 3).toUpperCase());
      }
    }
  });

  // If no attribute values, use timestamp-based suffix to ensure uniqueness
  if (attrValueSlugs.length === 0) {
    const timestamp = Date.now().toString(36).toUpperCase();
    return `${productPrefix}-${timestamp}`;
  }

  // Combine product prefix with attribute value slugs (sorted)
  const attrSuffix = attrValueSlugs.join("-");
  return `${productPrefix}-${attrSuffix}`;
};

const ensureDefaultStoreSelection = () => {
  if (localEditingStoreStockIndex.value !== null) return;
  if (localStoreStockForm.value.store_id) return;

  const defaultStore = availableStoreOptions.value[0] || stores.value[0];
  if (!defaultStore) return;

  localStoreStockForm.value.store_id = defaultStore.id;
};

const handleLoadStores = async () => {
  if (stores.value.length > 0) return;

  loadingStores.value = true;
  try {
    const { data, error } = await getAllStores();
    if (data?.data?.stores) {
      stores.value = data.data.stores.map((store: any) => ({
        id: store.id,
        name: store.name,
        code: store.code,
      }));
      ensureDefaultStoreSelection();
    } else if (error) {
      toast.error(error.message || "Failed to load stores");
    }
  } catch (err) {
    console.error("Error loading stores:", err);
    toast.error("Failed to load stores");
  } finally {
    loadingStores.value = false;
  }
};

const handleEditStoreStock = async (index: number) => {
  await handleLoadStores();
  const storeStock = localVariantStoreStocks.value[index];
  if (!storeStock) return;

  localEditingStoreStockIndex.value = index;
  localStoreStockForm.value = {
    store_id: storeStock.store_id,
    qty: storeStock.qty,
    reserved_qty: storeStock.reserved_qty || 0,
  };

  await nextTick();
  const formElement = document.querySelector(".card.border-primary");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

const handleDeleteStoreStock = (index: number) => {
  localVariantStoreStocks.value.splice(index, 1);
  emit("update:variantStoreStocks", [...localVariantStoreStocks.value]);
  toast.success("Stock removed successfully");
};

const handleSaveStoreStock = () => {
  if (!localStoreStockForm.value.store_id) {
    toast.error("Please select a store");
    return;
  }

  if (localStoreStockForm.value.qty < 0) {
    toast.error("Stock quantity cannot be negative");
    return;
  }

  if (localStoreStockForm.value.reserved_qty < 0) {
    toast.error("Reserved quantity cannot be negative");
    return;
  }

  if (isReservedExceedingQty.value) {
    toast.error("Reserved quantity cannot be greater than stock quantity");
    return;
  }

  if (isStoreStockDuplicate.value) {
    toast.error("Stock has already been added");
    return;
  }

  const store = stores.value.find(
    (s) => s.id === localStoreStockForm.value.store_id,
  );
  if (!store) {
    toast.error("Store not found");
    return;
  }

  if (localEditingStoreStockIndex.value !== null) {
    localVariantStoreStocks.value[localEditingStoreStockIndex.value] = {
      ...localVariantStoreStocks.value[localEditingStoreStockIndex.value],
      store_id: localStoreStockForm.value.store_id!,
      qty: localStoreStockForm.value.qty,
      reserved_qty: localStoreStockForm.value.reserved_qty,
      store: store,
    };
  } else {
    localVariantStoreStocks.value.push({
      store_id: localStoreStockForm.value.store_id!,
      qty: localStoreStockForm.value.qty,
      reserved_qty: localStoreStockForm.value.reserved_qty,
      store: store,
    });
  }

  emit("update:variantStoreStocks", [...localVariantStoreStocks.value]);
  handleResetStoreStockForm();
  toast.success(
    localEditingStoreStockIndex.value !== null ? "Stock updated successfully" : "Stock added successfully"
  );
};

const handleResetStoreStockForm = () => {
  localStoreStockForm.value = {
    store_id: null,
    qty: 0,
    reserved_qty: 0,
  };
  localEditingStoreStockIndex.value = null;
  ensureDefaultStoreSelection();
};

const getStoreAvailableQty = (storeStock: Props["variantStoreStocks"][number]) => {
  return Math.max(0, (storeStock.qty || 0) - (storeStock.reserved_qty || 0));
};

const getStockStatusLabel = (storeStock: Props["variantStoreStocks"][number]) => {
  const availableQty = getStoreAvailableQty(storeStock);

  if ((storeStock.qty || 0) <= 0) return "Out of stock";
  if (availableQty <= 0) return "Fully reserved";
  return "Available";
};

const getStockStatusBadgeClass = (
  storeStock: Props["variantStoreStocks"][number],
) => {
  const availableQty = getStoreAvailableQty(storeStock);

  if ((storeStock.qty || 0) <= 0) return "bg-secondary text-white";
  if (availableQty <= 0) return "bg-dark text-white";
  return "bg-light text-dark border";
};

const triggerVariantImageInput = () => {
  variantImageInput.value?.click();
};

const handleVariantImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target) return;

  const file = target.files?.[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      if (variantImageInput.value) {
        variantImageInput.value.value = "";
      }
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      if (variantImageInput.value) {
        variantImageInput.value.value = "";
      }
      return;
    }

    localVariantForm.value.image_file = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      localVariantForm.value.image_preview = e.target?.result as string;
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
      localVariantForm.value.image_file = null;
      localVariantForm.value.image_preview = null;
    };
    reader.readAsDataURL(file);
  }

  emit("update:variantForm", { ...localVariantForm.value });
};

const handleClearVariantImage = () => {
  localVariantForm.value.image_file = null;
  localVariantForm.value.image_preview = null;
  localVariantForm.value.image_path = null;

  if (variantImageInput.value) {
    variantImageInput.value.value = "";
  }

  emit("update:variantForm", { ...localVariantForm.value });
};

const handleSave = () => {
  const selectedCount = Object.keys(
    localVariantForm.value.selectedAttributeValues,
  ).filter(
    (attrId) => localVariantForm.value.selectedAttributeValues[Number(attrId)],
  ).length;

  if (selectedCount === 0) {
    toast.error("Please select at least one attribute value");
    return;
  }

  if (!localVariantForm.value.price || localVariantForm.value.price <= 0) {
    toast.error("Price is required and must be greater than 0");
    return;
  }

  savingVariant.value = true;
  emit("save", {
    ...localVariantForm.value,
    store_stocks: localVariantStoreStocks.value,
  });
  savingVariant.value = false;
};

const handleCancel = () => {
  emit("cancel");
};

onMounted(() => {
  handleLoadStores();
});
</script>

<style scoped>
.modal-header.bg-primary {
  background: #000 !important;
  color: #fff !important;
}

.modal-header.bg-primary .modal-title,
.modal-header.bg-primary .modal-title i {
  color: #fff !important;
}

.nav-tabs .nav-link {
  color: #000;
  border: none;
  border-bottom: 2px solid transparent;
}

.nav-tabs .nav-link.active {
  color: #000;
  border-bottom-color: #000;
  font-weight: 500;
}

.card.border-primary {
  border-color: #000 !important;
}

.card.border-primary .card-header,
.card.border-primary .card-header h6,
.card.border-primary .card-header i {
  color: #000 !important;
}

.text-primary {
  color: #000 !important;
}

.variant-attribute-option {
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
}

.variant-attribute-option .form-check-input,
.variant-attribute-option .form-check-label {
  cursor: pointer;
}

.variant-attribute-option.is-selected {
  background-color: transparent !important;
  border-color: transparent !important;
  box-shadow: none;
}

.variant-attribute-option.is-disabled:not(.is-selected) {
  background-color: transparent;
}

.variant-attribute-option.is-disabled,
.variant-attribute-option.is-disabled .form-check-input,
.variant-attribute-option.is-disabled .form-check-label {
  cursor: not-allowed;
}

.selected-option-label {
  color: inherit !important;
  font-weight: 400;
}

.variant-image-upload {
  max-width: 180px;
}

.variant-image-box {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 2px dashed #000;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
}

.variant-image-box:hover {
  border-color: #000;
  background-color: #f3f3f3;
}

.variant-image-box:focus-visible {
  outline: 2px solid #000;
  outline-offset: 2px;
}

.variant-image-box.has-image {
  border-style: solid;
}

.variant-image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.variant-image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
  color: white;
  font-size: 1.8rem;
}

.variant-image-box:hover .variant-image-overlay {
  opacity: 1;
}

.btn-remove-variant-image {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #ff4d4f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 2;
}

.variant-image-box.has-image:hover .btn-remove-variant-image {
  opacity: 1;
}

.variant-image-icon {
  font-size: 2.5rem;
  color: #000;
}

.btn-outline-primary {
  color: #000 !important;
  border-color: #000 !important;
}

.modal-content .btn-primary,
.modal-content .btn-secondary,
.modal-content .btn-outline-secondary,
.modal-content .btn-outline-danger {
  color: #000 !important;
  background-color: #fff !important;
  border-color: #000 !important;
}

.modal-content .btn-outline-primary {
  color: #b7791f !important;
  background-color: #fff !important;
  border-color: #d4a017 !important;
}

.modal-content .btn-primary.action-btn-dark {
  color: #fff !important;
  background-color: #000 !important;
  border-color: #000 !important;
}

.modal-content .btn-primary:hover,
.modal-content .btn-primary:focus,
.modal-content .btn-primary:active,
.modal-content .btn-secondary:hover,
.modal-content .btn-secondary:focus,
.modal-content .btn-secondary:active,
.modal-content .btn-outline-secondary:hover,
.modal-content .btn-outline-secondary:focus,
.modal-content .btn-outline-secondary:active,
.modal-content .btn-outline-danger:hover,
.modal-content .btn-outline-danger:focus,
.modal-content .btn-outline-danger:active {
  color: #fff !important;
  background-color: #000 !important;
  border-color: #000 !important;
}

.btn-outline-primary:hover,
.btn-outline-primary:focus,
.btn-outline-primary:active,
.modal-content .btn-outline-primary:hover,
.modal-content .btn-outline-primary:focus,
.modal-content .btn-outline-primary:active {
  color: #fff !important;
  background-color: #d4a017 !important;
  border-color: #d4a017 !important;
}

.modal-content .btn-primary.action-btn-dark:hover,
.modal-content .btn-primary.action-btn-dark:focus,
.modal-content .btn-primary.action-btn-dark:active {
  color: #fff !important;
  background-color: #1f1f1f !important;
  border-color: #1f1f1f !important;
}

.modal-content .btn-primary:disabled,
.modal-content .btn-secondary:disabled,
.modal-content .btn-outline-secondary:disabled,
.modal-content .btn-outline-danger:disabled {
  color: #4b4b4b !important;
  background-color: #fff !important;
  border-color: #4b4b4b !important;
}

.modal-content .btn-outline-primary:disabled {
  color: #c8a96a !important;
  background-color: #fffdf5 !important;
  border-color: #e6d3a1 !important;
}

.modal-content .btn-primary.action-btn-dark:disabled {
  color: #fff !important;
  background-color: #4b4b4b !important;
  border-color: #4b4b4b !important;
}

.stock-summary-card {
  border-color: #000 !important;
}

.stock-summary-card {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.stock-form-field .form-control,
.stock-form-field .form-select,
.stock-form-field .btn {
  min-height: 42px;
}

.stock-form-helper-placeholder {
  visibility: hidden;
}

.stock-table-wrap :deep(.table) {
  margin-bottom: 0;
}

.stock-table-wrap :deep(tbody tr) {
  vertical-align: middle;
}
</style>
