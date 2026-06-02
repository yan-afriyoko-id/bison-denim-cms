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
                    class="alert alert-warning"
                  >
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    No attributes selected. Please go to Step 3 and select
                    attributes first.
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
                            <span class="text-muted small fw-normal"
                              >(Optional)</span
                            >
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
                                class="form-check p-2 rounded mb-0 h-100 d-flex align-items-center"
                                :class="{
                                  'bg-light':
                                    localVariantForm.selectedAttributeValues[
                                      selectedAttr.attribute_id
                                    ] === value.id,
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
                                      editingVariantIndex !== null ||
                                      value.status === 'INACTIVE',
                                    'cursor-not-allowed':
                                      value.status === 'INACTIVE',
                                  }"
                                  style="cursor: pointer"
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
                            <i class="bi bi-info-circle me-1"></i>
                            <span v-if="selectedAttr.values.length === 0">
                              No values selected. Please go to Step 3 and select
                              values for this attribute first.
                            </span>
                            <span v-else>
                              No values available. Please add values to this
                              attribute first.
                            </span>
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
                      <span class="text-muted small fw-normal"
                        >(Auto-generated, can be edited)</span
                      >
                    </label>
                    <input
                      v-model="localVariantForm.variant_name"
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="e.g., Red - Large, Blue - Small"
                    />
                    <small class="text-muted">
                      <i class="bi bi-info-circle me-1"></i>
                      Name will be auto-generated from selected attribute
                      values, but you can edit it manually.
                    </small>
                  </div>

                  <!-- Image Quick Indicator -->
                  <div class="col-12 mt-3">
                    <div class="d-flex align-items-center gap-2 p-2 rounded bg-light">
                      <img
                        v-if="localVariantForm.image_preview || localVariantForm.image_path"
                        :src="
                          localVariantForm.image_preview ??
                          localVariantForm.image_path ??
                          undefined
                        "
                        alt="Variant image"
                        class="rounded"
                        style="width: 40px; height: 40px; object-fit: cover;"
                      />
                      <i v-else class="bi bi-image text-muted" style="font-size: 1.5rem;"></i>
                      <small class="text-muted">
                        <span v-if="localVariantForm.image_preview || localVariantForm.image_path">
                          Image attached.
                        </span>
                        <span v-else>
                          No image yet.
                        </span>
                        Go to <strong>Details</strong> tab to manage variant image.
                      </small>
                    </div>
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
                      <span class="text-muted small fw-normal ms-1">(Optional)</span>
                    </h6>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex align-items-start gap-3">
                    <!-- Image Preview -->
                    <div
                      class="border rounded d-flex align-items-center justify-content-center flex-shrink-0"
                      style="width: 120px; height: 120px; background-color: #f8f9fa;"
                    >
                      <img
                        v-if="localVariantForm.image_preview || localVariantForm.image_path"
                        :src="
                          localVariantForm.image_preview ??
                          localVariantForm.image_path ??
                          undefined
                        "
                        alt="Variant preview"
                        class="rounded"
                        style="max-width: 120px; max-height: 120px; object-fit: cover;"
                      />
                      <div v-else class="text-center text-muted">
                        <i class="bi bi-image" style="font-size: 2rem;"></i>
                        <small class="d-block mt-1">No image</small>
                      </div>
                    </div>
                    <!-- Upload Controls -->
                    <div class="flex-grow-1">
                      <input
                        ref="variantImageInput"
                        type="file"
                        accept="image/*"
                        class="form-control"
                        @change="handleVariantImageSelect"
                      />
                      <small class="text-muted d-block mt-1">
                        <i class="bi bi-info-circle me-1"></i>
                        Upload an image specific to this variant (e.g., different color). Max 5MB.
                      </small>
                      <button
                        v-if="localVariantForm.image_preview || localVariantForm.image_path"
                        type="button"
                        class="btn btn-sm btn-outline-danger mt-2"
                        @click="handleClearVariantImage"
                      >
                        <i class="bi bi-x-circle me-1"></i>Remove Image
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Product Details Section -->
                <div class="col-12 mt-4">
                  <div class="border-bottom pb-2 mb-3">
                    <h6 class="mb-0 text-primary">
                      <i class="bi bi-info-circle me-2"></i>Product Details
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
                  <small class="text-muted"
                    >Stock Keeping Unit identifier</small
                  >
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
                    Original Price (Strike Price)
                    <span class="text-muted small">(Optional)</span>
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
                  <small class="text-muted"
                    >Original price that will be shown with strikethrough</small
                  >
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
                  <div class="border-bottom pb-2 mb-4">
                    <h6 class="mb-0 text-primary">
                      <i class="bi bi-shop me-2"></i>Store Stock Management
                    </h6>
                    <p class="text-muted small mb-0 mt-1">
                      Manage stock quantity for this variant across different stores
                    </p>
                  </div>

                  <div class="row g-3 mb-4">
                    <div class="col-md-3 col-6">
                      <div class="card h-100 shadow-sm border-0 bg-light stock-summary-card">
                        <div class="card-body py-3">
                          <small class="text-muted text-uppercase d-block mb-1">Assigned Stores</small>
                          <div class="fs-5 fw-semibold">{{ assignedStoresCount }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="card h-100 shadow-sm border-0 bg-light stock-summary-card">
                        <div class="card-body py-3">
                          <small class="text-muted text-uppercase d-block mb-1">Total Stock</small>
                          <div class="fs-5 fw-semibold">{{ totalVariantStock }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="card h-100 shadow-sm border-0 bg-light stock-summary-card">
                        <div class="card-body py-3">
                          <small class="text-muted text-uppercase d-block mb-1">Reserved</small>
                          <div class="fs-5 fw-semibold">{{ totalReservedStock }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="card h-100 shadow-sm border-0 bg-light stock-summary-card">
                        <div class="card-body py-3">
                          <small class="text-muted text-uppercase d-block mb-1">Available</small>
                          <div class="fs-5 fw-semibold">{{ totalAvailableStock }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

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
                          {{ localEditingStoreStockIndex !== null ? 'Edit Store Stock' : 'Add Store Stock' }}
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
                        <div class="col-lg-4 col-md-6">
                          <div class="stock-form-field h-100 d-flex flex-column">
                          <label class="form-label fw-semibold"
                            >Store <span class="text-danger">*</span></label
                          >
                          <select
                            v-model.number="localStoreStockForm.store_id"
                            class="form-select"
                            :disabled="loadingStores"
                            @focus="handleLoadStores"
                          >
                            <option value="">Select a store</option>
                            <option
                              v-for="store in availableStoreOptions"
                              :key="store.id"
                              :value="store.id"
                            >
                              {{ store.name }}{{ store.code ? ` (${store.code})` : "" }}
                            </option>
                          </select>
                          <small class="text-muted small d-block mt-1">
                            can only have one stock row for this variant.
                          </small>
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-3 col-6">
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
                          <small class="text-muted small d-block mt-1 stock-form-helper-placeholder">
                            Qty input
                          </small>
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-3 col-6">
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
                          <small class="text-muted small">Qty for pending orders</small>
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-6">
                          <div class="stock-form-field h-100 d-flex flex-column">
                          <label class="form-label fw-semibold">Available</label>
                          <div class="form-control bg-light">{{ stockFormAvailableQty }}</div>
                          <small class="text-muted small">Qty - reserved</small>
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-6">
                          <div class="stock-form-field h-100 d-flex flex-column">
                          <label class="form-label fw-semibold text-transparent">Action</label>
                          <button
                            type="button"
                            class="btn btn-primary w-100 py-2"
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
                          <small class="text-muted small d-block mt-1 stock-form-helper-placeholder">
                            Save action
                          </small>
                          </div>
                        </div>
                      </div>

                      <div
                        v-if="isStoreStockDuplicate"
                        class="alert alert-light border mb-0 mt-3 py-2"
                        role="alert"
                      >
                        <i class="bi bi-info-circle me-2"></i>
                        This store already has stock assigned. Edit the existing row instead.
                      </div>
                      <div
                        v-else-if="isReservedExceedingQty"
                        class="alert alert-light border mb-0 mt-3 py-2"
                        role="alert"
                      >
                        <i class="bi bi-info-circle me-2"></i>
                        Reserved quantity cannot be greater than stock quantity.
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
                          <th style="width: 32%;">Store</th>
                          <th class="text-center" style="width: 14%;">Stock</th>
                          <th class="text-center" style="width: 14%;">Reserved</th>
                          <th class="text-center" style="width: 14%;">Available</th>
                          <th class="text-center" style="width: 16%;">Status</th>
                          <th class="text-center" style="width: 10%;">Actions</th>
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
                          <td>
                            <div class="fw-semibold">{{ storeStock.store?.name || "N/A" }}</div>
                            <small v-if="storeStock.store?.code" class="text-muted">
                              {{ storeStock.store.code }}
                            </small>
                          </td>
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
                    <p class="text-muted mb-0">
                      No store stocks added yet
                    </p>
                    <small class="text-muted">
                      Use the form above to assign stock to stores
                    </small>
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
            class="btn btn-primary"
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

const assignedStoresCount = computed(() => localVariantStoreStocks.value.length);

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
    toast.error("This store already has stock assigned");
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
