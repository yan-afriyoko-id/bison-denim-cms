<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-0">Create New Product</h4>
        <p class="text-muted mb-0">
          Add a new product to your store step by step
        </p>
      </div>
      <NuxtLink to="/manage-product" class="btn btn-secondary">
        <i class="bi bi-arrow-left me-2"></i>Back to List
      </NuxtLink>
    </div>

    <!-- Progress Steps -->
    <div class="card mb-4">
      <div class="card-body">
        <ul class="nav nav-tabs mb-3" id="productStepsTabs" role="tablist">
          <li
            class="nav-item"
            role="presentation"
            v-for="step in steps"
            :key="step.key"
          >
            <button
              class="nav-link"
              :class="{ active: currentStep === step.key }"
              @click="goToStep(step.key)"
              type="button"
              :disabled="!canAccessStep(step.key)"
            >
              <i :class="step.icon + ' me-2'"></i>
              {{ step.label }}
            </button>
          </li>
        </ul>
        <div class="card">
          <div class="card-body">
            <div class="tab-content">
              <!-- Step 1: Basic Information -->
              <div v-if="currentStep === 1" class="tab-pane fade show active">
                <h5 class="mb-4">Basic Information</h5>
                <div class="row g-3">
                  <!-- Basic Information -->
                  <div class="col-12">
                    <div class="border-bottom pb-2 mb-3">
                      <h6 class="mb-0 text-primary">
                        <i class="bi bi-info-circle me-2"></i>Basic Information
                      </h6>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label"
                      >Product Name <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="productForm.name"
                      type="text"
                      required
                      class="form-control"
                      :class="{ 'is-invalid': productFormErrors.name }"
                      placeholder="Product Name"
                      @input="generateSlugFromName"
                    />
                    <div v-if="productFormErrors.name" class="invalid-feedback">
                      {{ productFormErrors.name[0] }}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label"
                      >Slug <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="productForm.slug"
                      type="text"
                      required
                      class="form-control"
                      :class="{ 'is-invalid': productFormErrors.slug }"
                      placeholder="product-slug"
                    />
                    <div v-if="productFormErrors.slug" class="invalid-feedback">
                      {{ productFormErrors.slug[0] }}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Status</label>
                    <select v-model="productForm.status" class="form-select">
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISH">Publish</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Free Shipping</label>
                    <select
                      v-model="productForm.is_freeshiping"
                      class="form-select"
                    >
                      <option value="INACTIVE">Inactive</option>
                      <option value="ACTIVE">Active</option>
                    </select>
                  </div>

                  <!-- Information -->
                  <div class="col-12 mt-4">
                    <div class="border-bottom pb-2 mb-3">
                      <h6 class="mb-0 text-primary">
                        <i class="bi bi-file-text me-2"></i>Information
                      </h6>
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Information</label>
                    <textarea
                      v-model="productForm.product_information"
                      class="form-control"
                      rows="4"
                      placeholder="Product information"
                    ></textarea>
                  </div>

                  <!-- Pricing -->
                  <div class="col-12 mt-4">
                    <div class="border-bottom pb-2 mb-3">
                      <h6 class="mb-0 text-primary">
                        <i class="bi bi-currency-dollar me-2"></i>Pricing
                      </h6>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label"
                      >Selling Price <span class="text-danger">*</span></label
                    >
                    <input
                      v-model.number="productForm.base_price"
                      type="number"
                      step="0.01"
                      class="form-control"
                      placeholder="0.00"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label"
                      >Original Price (Strike Price)
                      <span class="text-muted">(Optional)</span></label
                    >
                    <input
                      v-model.number="productForm.base_strike_price"
                      type="number"
                      step="0.01"
                      class="form-control"
                      placeholder="0.00"
                    />
                  </div>

                  <!-- SEO Metadata -->
                  <div class="col-12 mt-4">
                    <div class="border-bottom pb-2 mb-3">
                      <h6 class="mb-0 text-primary">
                        <i class="bi bi-search me-2"></i>SEO Metadata
                      </h6>
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Meta Title</label>
                    <input
                      v-model="productForm.meta_title"
                      type="text"
                      class="form-control"
                      placeholder="SEO meta title"
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label">Meta Description</label>
                    <textarea
                      v-model="productForm.meta_description"
                      class="form-control"
                      rows="2"
                      placeholder="SEO meta description"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Step 2: Images -->
              <div v-if="currentStep === 2" class="tab-pane fade show active">
                <h5 class="mb-4">Product Images</h5>
                <div class="mb-4">
                  <label class="form-label">Upload Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    class="form-control"
                    @change="handleImageSelect"
                    :disabled="uploadingImages"
                  />
                  <small class="text-muted"
                    >You can select multiple images at once</small
                  >
                </div>

                <div
                  v-if="!pendingImages || pendingImages.length === 0"
                  class="text-center py-4"
                >
                  <p class="text-muted">No images selected yet</p>
                  <p class="text-muted small">
                    Images will be uploaded when you create the product
                  </p>
                </div>

                <div
                  v-else-if="pendingImages && pendingImages.length > 0"
                  class="row g-3"
                >
                  <div
                    v-for="(image, index) in pendingImages"
                    :key="index"
                    class="col-md-3"
                  >
                    <div class="card position-relative">
                      <!-- Featured Badge -->
                      <span
                        v-if="image.is_featured"
                        class="badge bg-success position-absolute top-0 start-0 m-2"
                        style="z-index: 10"
                      >
                        <i class="bi bi-star-fill"></i> Featured
                      </span>
                      <img
                        :src="image.preview"
                        :alt="`Preview ${index + 1}`"
                        class="card-img-top"
                        style="height: 200px; object-fit: cover"
                      />
                      <div class="card-body p-2">
                        <div class="d-flex flex-column gap-2">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <small class="text-muted"
                              >Order: {{ index + 1 }}</small
                            >
                            <div class="d-flex gap-1">
                              <button
                                v-if="!image.is_featured"
                                type="button"
                                class="btn btn-sm btn-outline-primary"
                                @click="handleSetFeaturedPending(index)"
                                :disabled="settingFeaturedIndex === index"
                                title="Set as Featured"
                              >
                                <i class="bi bi-star"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-sm btn-outline-danger"
                                @click="removePendingImage(index)"
                              >
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3: Attributes -->
              <div v-if="currentStep === 3" class="tab-pane fade show active">
                <h5 class="mb-4">Product Attributes</h5>
                <p class="text-muted mb-4">
                  Select attributes (Color, Size, etc.) and their values for
                  this product. Variants will be generated automatically from
                  these combinations.
                </p>

                <div class="mb-4">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="handleAddAttributeClick"
                    :disabled="loadingAttributes"
                  >
                    <i class="bi bi-plus-circle me-2"></i>Add Attribute
                  </button>
                </div>

                <div v-if="loadingAttributes" class="text-center py-3">
                  <div
                    class="spinner-border spinner-border-sm text-primary"
                    role="status"
                  ></div>
                  <p class="text-muted mt-2">Loading attributes...</p>
                </div>

                <div
                  v-else-if="selectedAttributes.length === 0"
                  class="text-center py-4"
                >
                  <p class="text-muted">No attributes selected yet</p>
                  <p class="text-muted small">
                    Add attributes to create product variants
                  </p>
                </div>

                <div v-else class="row g-3">
                  <div
                    v-for="(selectedAttr, index) in selectedAttributes"
                    :key="index"
                    class="col-12"
                  >
                    <div class="card">
                      <div
                        class="card-header d-flex justify-content-between align-items-center"
                      >
                        <h6 class="mb-0">
                          {{ getAttributeName(selectedAttr.attribute_id) }}
                        </h6>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger"
                          @click="removeAttribute(index)"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                      <div class="card-body">
                        <div
                          class="d-flex justify-content-between align-items-center mb-2"
                        >
                          <label class="form-label mb-0">Select Values</label>
                        </div>
                        <div class="row g-2">
                          <div
                            v-for="value in getAttributeValuesList(
                              selectedAttr.attribute_id,
                            )"
                            :key="value.id"
                            class="col-md-3"
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                :value="value.id"
                                :id="`attr-${selectedAttr.attribute_id}-value-${value.id}`"
                                v-model="selectedAttr.values"
                                :disabled="value.status === 'INACTIVE'"
                                :title="
                                  value.status === 'INACTIVE'
                                    ? 'INACTIVE values cannot be selected'
                                    : ''
                                "
                              />
                              <label
                                class="form-check-label"
                                :for="`attr-${selectedAttr.attribute_id}-value-${value.id}`"
                                :class="{
                                  'text-muted': value.status === 'INACTIVE',
                                  'cursor-not-allowed':
                                    value.status === 'INACTIVE',
                                }"
                              >
                                {{ value.value }}
                                <span
                                  v-if="value.status === 'INACTIVE'"
                                  class="badge bg-secondary ms-2"
                                  >INACTIVE</span
                                >
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
                          No values available. Add value in manage attributes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4: Variants -->
              <div v-if="currentStep === 4" class="tab-pane fade show active">
                <h5 class="mb-4">Product Variants</h5>
                <p class="text-muted mb-4">
                  Create variants manually by selecting attribute values. Each
                  variant represents a specific combination of attributes.
                </p>

                <div class="mb-3">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="handleAddVariantClick"
                    :disabled="selectedAttributes.length === 0"
                  >
                    <i class="bi bi-plus-circle me-2"></i>Add Variant
                  </button>
                  <small
                    v-if="selectedAttributes.length === 0"
                    class="text-muted ms-2"
                  >
                    Please select attributes in Step 3 first
                  </small>
                </div>

                <div
                  v-if="selectedAttributes.length === 0"
                  class="alert alert-info"
                >
                  <i class="bi bi-info-circle me-2"></i>
                  Please select attributes in Step 3 first before creating
                  variants.
                </div>

                <div
                  v-else-if="!variants || variants.length === 0"
                  class="text-center py-4"
                >
                  <p class="text-muted">No variants added yet</p>
                  <p class="text-muted small">
                    Click "Add Variant" to create your first variant
                  </p>
                </div>

                <div
                  v-else-if="variants && variants.length > 0"
                  class="table-responsive"
                >
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Variant Name</th>
                        <th>Attributes</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Discounted Price</th>
                        <th>Discount %</th>
                        <th>Status</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(variant, index) in variants" :key="index">
                        <td>
                          <img
                            v-if="variant.image_path || variant.image_preview"
                            :src="variant.image_path || variant.image_preview"
                            :alt="variant.variant_name || 'Variant'"
                            class="img-thumbnail"
                            style="
                              max-width: 60px;
                              max-height: 60px;
                              object-fit: cover;
                            "
                          />
                          <span v-else class="text-muted small">No image</span>
                        </td>
                        <td>{{ variant.variant_name || "Unnamed Variant" }}</td>
                        <td>
                          <div class="d-flex flex-wrap gap-1">
                            <span
                              v-for="valueId in variant.attribute_value_ids"
                              :key="valueId"
                              class="badge bg-secondary"
                            >
                              {{ getAttributeValueName(valueId) }}
                            </span>
                          </div>
                        </td>
                        <td>{{ variant.sku || "N/A" }}</td>
                        <td>Rp {{ formatNumber(variant.price || 0) }}</td>
                        <td class="text-nowrap">
                          <span v-if="variant.strike_price">
                            Rp {{ formatNumber(variant.strike_price) }}
                          </span>
                          <span v-else class="text-muted">-</span>
                        </td>
                        <td class="text-nowrap">
                          <span v-if="variant.discount_percent">
                            {{ variant.discount_percent }}%
                          </span>
                          <span v-else class="text-muted">-</span>
                        </td>
                        <td>
                          <span
                            :class="[
                              'badge',
                              variant.status === 'ACTIVE'
                                ? 'bg-success'
                                : 'bg-secondary',
                            ]"
                          >
                            {{ variant.status }}
                          </span>
                        </td>
                        <td class="text-end">
                          <div class="d-flex gap-2 justify-content-end">
                            <button
                              type="button"
                              class="btn btn-sm btn-outline-primary"
                              @click="editVariant(index)"
                            >
                              <i class="bi bi-pencil"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-sm btn-outline-danger"
                              @click="removeVariant(index)"
                            >
                              <i class="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Step 5: Categories -->
              <div v-if="currentStep === 5" class="tab-pane fade show active">
                <h5 class="mb-4">Product Categories</h5>
                <p class="text-muted mb-4">
                  Select one or more categories for this product. You can also
                  create, edit, or delete a category.
                </p>

                <div
                  class="mb-3 d-flex justify-content-between align-items-center gap-2"
                >
                  <div class="flex-grow-1">
                    <input
                      v-model="categorySearchQuery"
                      type="text"
                      class="form-control"
                      placeholder="Search categories..."
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="openCreateCategoryModal"
                    title="Create New Category"
                  >
                    <i class="bi bi-plus-circle me-1"></i>New
                  </button>
                </div>

                <div v-if="loadingCategories" class="text-center py-3">
                  <div
                    class="spinner-border spinner-border-sm text-primary"
                    role="status"
                  ></div>
                  <p class="mt-2 text-muted small">Loading categories...</p>
                </div>

                <div v-else>
                  <!-- Selected Categories -->
                  <div
                    v-if="selectedCategoryIds && selectedCategoryIds.length > 0"
                    class="mb-3"
                  >
                    <label class="form-label"
                      ><strong>Selected Categories:</strong></label
                    >
                    <div class="d-flex flex-wrap gap-2">
                      <span
                        v-for="catId in selectedCategoryIds"
                        :key="catId"
                        class="badge bg-primary d-flex align-items-center gap-2"
                        style="font-size: 0.9rem; padding: 0.5rem 0.75rem"
                      >
                        {{ getCategoryName(catId) }}
                        <button
                          type="button"
                          class="btn-close btn-close-white"
                          style="font-size: 0.7rem"
                          @click="removeCategory(catId)"
                          aria-label="Remove"
                        ></button>
                      </span>
                    </div>
                  </div>

                  <!-- Categories List -->
                  <div
                    class="border rounded p-3"
                    style="max-height: 400px; overflow-y: auto"
                  >
                    <div
                      v-if="filteredCategories.length === 0"
                      class="text-center py-4"
                    >
                      <p class="text-muted">No categories found</p>
                      <p class="text-muted small">
                        Try a different search term or create a new category
                      </p>
                    </div>
                    <div v-else class="row g-2">
                      <div
                        v-for="category in filteredCategories"
                        :key="category.id"
                        class="col-12 col-md-6"
                      >
                        <div class="d-flex align-items-center justify-content-between">
                          <div class="form-check flex-grow-1">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              :value="category.id"
                              :id="`category-${category.id}`"
                              v-model="selectedCategoryIds"
                            />
                            <label
                              class="form-check-label"
                              :for="`category-${category.id}`"
                              style="cursor: pointer"
                            >
                              {{ category?.taxonomy_name || "Unknown Category" }}
                            </label>
                          </div>
                          <div class="d-flex gap-1">
                            <button
                              type="button"
                              class="btn btn-sm btn-outline-warning py-0 px-1"
                              @click.stop="openEditCategoryModalInStep(category)"
                              title="Edit Category"
                            >
                              <i class="bi bi-pencil" style="font-size: 0.7rem;"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-sm btn-outline-danger py-0 px-1"
                              @click.stop="openDeleteCategoryModalInStep(category)"
                              title="Delete Category"
                            >
                              <i class="bi bi-trash" style="font-size: 0.7rem;"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <small class="text-muted mt-2 d-block">
                    <i class="bi bi-info-circle me-1"></i>
                    You can select multiple categories for this product
                  </small>
                </div>
              </div>

              <!-- Step 6: Brands -->
              <div v-if="currentStep === 6" class="tab-pane fade show active">
                <h5 class="mb-4">Product Brands</h5>
                <p class="text-muted mb-4">
                  Select one or more brands for this product. You can also
                  create a new brand if needed.
                </p>

                <div
                  class="mb-3 d-flex justify-content-between align-items-center"
                >
                  <div class="flex-grow-1">
                    <input
                      v-model="brandSearchQuery"
                      type="text"
                      class="form-control"
                      placeholder="Search brands..."
                    />
                  </div>
                </div>

                <div v-if="loadingBrands" class="text-center py-3">
                  <div
                    class="spinner-border spinner-border-sm text-primary"
                    role="status"
                  ></div>
                  <p class="mt-2 text-muted small">Loading brands...</p>
                </div>

                <div v-else>
                  <!-- Selected Brands -->
                  <div
                    v-if="selectedBrandIds && selectedBrandIds.length > 0"
                    class="mb-3"
                  >
                    <label class="form-label"
                      ><strong>Selected Brands:</strong></label
                    >
                    <div class="d-flex flex-wrap gap-2">
                      <span
                        v-for="brandId in selectedBrandIds"
                        :key="brandId"
                        class="badge bg-primary d-flex align-items-center gap-2"
                        style="font-size: 0.9rem; padding: 0.5rem 0.75rem"
                      >
                        {{ getBrandName(brandId) }}
                        <button
                          type="button"
                          class="btn-close btn-close-white"
                          style="font-size: 0.7rem"
                          @click="removeBrand(brandId)"
                          aria-label="Remove"
                        ></button>
                      </span>
                    </div>
                  </div>

                  <!-- Brands List -->
                  <div
                    class="border rounded p-3"
                    style="max-height: 400px; overflow-y: auto"
                  >
                    <div
                      v-if="filteredBrands.length === 0"
                      class="text-center py-4"
                    >
                      <p class="text-muted">No brands found</p>
                      <p class="text-muted small">
                        Try a different search term or create a new brand
                      </p>
                    </div>
                    <div v-else class="row g-2">
                      <div
                        v-for="brand in filteredBrands"
                        :key="brand.id"
                        class="col-12 col-md-6"
                      >
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :value="brand.id"
                            :id="`brand-${brand.id}`"
                            v-model="selectedBrandIds"
                          />
                          <label
                            class="form-check-label"
                            :for="`brand-${brand.id}`"
                            style="cursor: pointer"
                          >
                            {{ brand?.name || "Unknown Brand" }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <small class="text-muted mt-2 d-block">
                    <i class="bi bi-info-circle me-1"></i>
                    You can select multiple brands for this product
                  </small>
                </div>
              </div>
            </div>

            <!-- Add Attribute Modal -->
            <div
              class="modal fade"
              id="addAttributeModal"
              tabindex="-1"
              aria-labelledby="addAttributeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="addAttributeModalLabel">
                      Add Attribute
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <!-- Tabs -->
                    <ul class="nav nav-tabs mb-3" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          :class="{ active: attributeModalTab === 'select' }"
                          @click="attributeModalTab = 'select'"
                          type="button"
                        >
                          <i class="bi bi-list-check me-2"></i>Select Existing
                        </button>
                      </li>
                    </ul>

                    <!-- Tab Content: Select Existing -->
                    <div
                      v-if="attributeModalTab === 'select'"
                      class="tab-content"
                    >
                      <div v-if="loadingAttributes" class="text-center py-3">
                        <div
                          class="spinner-border spinner-border-sm text-primary"
                          role="status"
                        ></div>
                        <p class="text-muted mt-2">Loading attributes...</p>
                      </div>
                      <div
                        v-else-if="unselectedAttributes.length === 0"
                        class="text-center py-4"
                      >
                        <p class="text-muted">No available attributes to add</p>
                        <p class="text-muted small">
                          All attributes have been selected or create a new one
                        </p>
                      </div>
                      <div v-else class="list-group">
                        <button
                          v-for="attr in unselectedAttributes"
                          :key="attr.id"
                          type="button"
                          class="list-group-item list-group-item-action"
                          @click="selectAttribute(attr.id)"
                        >
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <h6 class="mb-1">{{ attr.name }}</h6>
                              <small class="text-muted">
                                {{
                                  attr.attribute_values
                                    ?.map((v) => v.value)
                                    .join(", ") || "No values"
                                }}
                              </small>
                            </div>
                            <i class="bi bi-chevron-right"></i>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                      @click="resetNewAttributeForm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="mt-4 d-flex justify-content-between">
              <div>
                <button
                  v-if="currentStep > 1"
                  type="button"
                  class="btn btn-secondary"
                  @click="previousStep"
                >
                  <i class="bi bi-arrow-left me-2"></i>Previous
                </button>
              </div>
              <div class="d-flex gap-2">
                <NuxtLink
                  to="/manage-product"
                  class="btn btn-outline-secondary"
                >
                  Cancel
                </NuxtLink>
                <button
                  v-if="currentStep < 5"
                  type="button"
                  class="btn btn-primary"
                  @click="nextStep"
                  :disabled="!canProceedToNextStep"
                >
                  Next<i class="bi bi-arrow-right ms-2"></i>
                </button>
                <button
                  v-else
                  type="button"
                  class="btn btn-success"
                  @click="handleCreateProduct"
                  :disabled="isLoading || !canCreateProduct"
                >
                  {{ isLoading ? "Creating..." : "Create Product" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Variant Modal -->
    <VariantModal
      :selected-attributes="selectedAttributes"
      :variant-form="variantForm"
      :variant-store-stocks="variantStoreStocks"
      :editing-variant-index="editingVariantIndex"
      :available-attributes="availableAttributes"
      @save="handleSaveVariant"
      @cancel="handleCancelVariant"
      @update:variant-form="variantForm = $event"
      @update:variant-store-stocks="variantStoreStocks = $event"
      @update-variant-name="updateVariantName"
    />

    <!-- Add Category Modal -->
    <div
      class="modal fade"
      id="addCategoryModal"
      tabindex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCategoryModalLabel">
              Create New Category
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleCreateCategory">
              <div class="mb-3">
                <label class="form-label"
                  >Category Name <span class="text-danger">*</span></label
                >
                <input
                  v-model="newCategoryForm.taxonomy_name"
                  type="text"
                  class="form-control"
                  placeholder="e.g., Tas, Dompet, Ikat Pinggang"
                  required
                  maxlength="250"
                  @input="generateCategorySlug"
                />
                <small class="text-muted">Name of the category</small>
              </div>
              <div class="mb-3">
                <label class="form-label">Slug</label>
                <input
                  v-model="newCategoryForm.taxonomy_slug"
                  type="text"
                  class="form-control"
                  placeholder="auto-generated-from-name"
                  maxlength="250"
                />
                <small class="text-muted"
                  >URL-friendly version of the name (auto-generated)</small
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select
                  v-model="newCategoryForm.taxonomy_status"
                  class="form-select"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div class="d-flex gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="creatingCategory || !newCategoryForm.taxonomy_name"
                >
                  <span
                    v-if="creatingCategory"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  <i v-else class="bi bi-check-circle me-2"></i>
                  Create & Add
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="resetNewCategoryForm"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="resetNewCategoryForm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Category Modal -->
    <div
      class="modal fade"
      id="editCategoryInStepModal"
      tabindex="-1"
      aria-labelledby="editCategoryInStepModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCategoryInStepModalLabel">Edit Category</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Category Name <span class="text-danger">*</span></label>
              <input
                v-model="editCategoryFormData.taxonomy_name"
                type="text"
                class="form-control"
                placeholder="Enter category name"
                @input="generateEditCategorySlug"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Slug</label>
              <input
                v-model="editCategoryFormData.taxonomy_slug"
                type="text"
                class="form-control"
                placeholder="auto-generated-from-name"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Status</label>
              <select v-model="editCategoryFormData.taxonomy_status" class="form-select">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-warning"
              @click="handleEditCategoryInStep"
              :disabled="editingCategoryInStep"
            >
              {{ editingCategoryInStep ? 'Updating...' : 'Update Category' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Category Modal -->
    <div
      class="modal fade"
      id="deleteCategoryInStepModal"
      tabindex="-1"
      aria-labelledby="deleteCategoryInStepModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deleteCategoryInStepModalLabel">Delete Category</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <strong>{{ categoryToDeleteInStep?.taxonomy_name }}</strong>?</p>
            <p class="text-muted mb-0">This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="handleDeleteCategoryInStep"
              :disabled="deletingCategoryInStep"
            >
              {{ deletingCategoryInStep ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Create Brand Modal -->
    <div
      class="modal fade"
      id="createBrandModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Brand</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" />
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Brand Name</label>
              <input
                v-model="newBrand.name"
                type="text"
                class="form-control"
                placeholder="e.g. Nike"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Description (optional)</label>
              <textarea
                v-model="newBrand.description"
                class="form-control"
                rows="3"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="creatingBrand || !newBrand.name"
              @click="submitCreateBrand"
            >
              <span
                v-if="creatingBrand"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Create Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCreatePayload } from "~/types/product";
import { formatNumber, generateSlug } from "~/utils/helpers";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

useHead({
  title: "Create Product - Bison Denim",
});

const { createProduct } = useProductApi();
const {
  uploadProductImage,
  uploadVariantImage,
  attachProductCategories,
  attachProductBrands,
  getProductBrands,
  getBrands,
  createBrand,
  createProductVariant,
  getTaxoListsByType,
  createTaxoList,
  updateTaxoList,
  deleteTaxoList,
  getActiveAttributes,
  attachProductAttributes,
  createAttribute,
  getAttributeValues,
  createAttributeValue,
  getVariantStoreStocks,
  createOrUpdateVariantStoreStock,
  deleteVariantStoreStock,
} = useProductRelationsApi();
const { getAllStores } = useStoreApi();
const router = useRouter();
const toast = useToast();

// Step management
const currentStep = ref(1);
const isLoading = ref(false);

const steps = [
  { key: 1, label: "Basic Info", icon: "bi bi-info-circle" },
  { key: 2, label: "Images", icon: "bi bi-images" },
  { key: 3, label: "Attributes", icon: "bi bi-list-check" },
  { key: 4, label: "Variants", icon: "bi bi-box-seam" },
  { key: 5, label: "Categories", icon: "bi bi-tags" },
  // { key: 6, label: "Brands", icon: "bi bi-building" },
];

// Product form
const productForm = ref<ProductCreatePayload>({
  name: "",
  slug: "",
  status: "DRAFT",
  is_freeshiping: "INACTIVE",
  product_information: "",
  material: "",
  style: "",
  color: "",
  weight: null,
  type_weight: "GRAM",
  size_long: null,
  size_wide: null,
  size_tall: null,
  type_size: "CM",
  package_long: null,
  package_wide: null,
  package_tall: null,
  sku: "",
  base_price: null,
  base_strike_price: null,
  sort: 0,
  tags: "",
  product_protection_percent: 0,
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
});

const productFormErrors = ref<Record<string, string[]>>({});

// Images
const pendingImages = ref<
  Array<{ file: File; preview: string; is_featured?: boolean }>
>([]);
const uploadingImages = ref(false);
const settingFeaturedIndex = ref<number | null>(null);

// Variants
const variants = ref<
  Array<{
    attribute_value_ids: number[];
    variant_name?: string;
    sku?: string;
    image_path?: string | null;
    image_file?: File | null;
    image_preview?: string | null;
    price: number;
    strike_price?: number | null;
    discount_percent?: number | null;
    status: "ACTIVE" | "INACTIVE";
    weight?: number | null;
    type_weight?: "GRAM" | "KG";
    store_stocks?: Array<{
      store_id: number;
      qty: number;
      reserved_qty: number;
    }>;
  }>
>([]);
const editingVariantIndex = ref<number | null>(null);

const variantForm = ref({
  selectedAttributeValues: {} as Record<number, number>, // attribute_id -> attribute_value_id
  attribute_value_ids: [] as number[],
  variant_name: "",
  sku: "",
  price: 0,
  strike_price: null as number | null,
  status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  image_file: null as File | null,
  image_preview: null as string | null,
  image_path: null as string | null,
  weight: null as number | null,
  type_weight: "GRAM" as "GRAM" | "KG",
});

// Store Stock Management
const variantStoreStocks = ref<
  Array<{
    id?: number;
    store_id: number;
    qty: number;
    reserved_qty: number;
    store?: {
      id: number;
      name: string;
      code?: string;
    };
  }>
>([]);

// Attributes
const availableAttributes = ref<
  Array<{
    id: number;
    name: string;
    slug: string;
    attribute_values?: Array<{
      id: number;
      value: string;
      slug: string;
    }>;
  }>
>([]);
const selectedAttributes = ref<
  Array<{
    attribute_id: number;
    sort: number;
    values: number[];
  }>
>([]);
const loadingAttributes = ref(false);
const attributeModalTab = ref<"select" | "create">("select");
const creatingAttribute = ref(false);
const newAttributeForm = ref({
  name: "",
  sort: 0,
});
const addingValueToAttributeId = ref<number | null>(null);
const creatingAttributeValue = ref(false);
const newAttributeValueForm = ref({
  value: "",
  sort: 0,
});

// Categories
const availableCategories = ref<any[]>([]);
const selectedCategoryIds = ref<number[]>([]);
const loadingCategories = ref(false);
const categorySearchQuery = ref("");
const creatingCategory = ref(false);
const categoryModalTab = ref<"select" | "create">("select");
const newCategoryForm = ref({
  taxonomy_name: "",
  taxonomy_slug: "",
  taxonomy_description: "",
  taxonomy_type: 2, // Default to type 2 (category)
  taxonomy_status: "ACTIVE" as "ACTIVE" | "INACTIVE",
});

// Brands
const availableBrands = ref<any[]>([]);
const selectedBrandIds = ref<number[]>([]);
const loadingBrands = ref(false);
const brandSearchQuery = ref("");

const creatingBrand = ref(false);

const newBrand = ref({
  name: "",
  description: "",
});

const generateSlugFromName = () => {
  if (!productForm.value.name) return;
  productForm.value.slug = generateSlug(productForm.value.name);
};

const goToStep = (step: number) => {
  if (canAccessStep(step)) {
    currentStep.value = step;
  }
};

const canAccessStep = (step: number) => {
  // Step 1 always accessible
  if (step === 1) return true;
  // Other steps require basic info to be filled
  if (step > 1) {
    return !!(productForm.value.name && productForm.value.slug);
  }
  return false;
};

const getAttributeName = (attributeId: number) => {
  const attribute = availableAttributes.value.find(
    (attr) => attr.id === attributeId,
  );
  return attribute?.name || `Attribute ${attributeId}`;
};

const getAttributeValuesList = (attributeId: number) => {
  const attribute = availableAttributes.value.find(
    (attr) => attr.id === attributeId,
  );
  const allValues = attribute?.attribute_values || [];

  // If we're in Step 4 (Variants), only show values that were selected in Step 3
  // Otherwise (Step 3), show all values
  if (currentStep.value === 4) {
    const selectedAttr = selectedAttributes.value.find(
      (sa) => sa.attribute_id === attributeId,
    );
    if (selectedAttr && selectedAttr.values.length > 0) {
      // Filter to only show values that were checked in Step 3
      return allValues.filter((v) => selectedAttr.values.includes(v.id));
    }
    // If no values selected in Step 3, return empty array
    return [];
  }

  // Step 3: Show all values (can be filtered by status if needed)
  return allValues;
};

const unselectedAttributes = computed(() => {
  return availableAttributes.value.filter(
    (attr) =>
      !selectedAttributes.value.some((sa) => sa.attribute_id === attr.id),
  );
});

const handleAddAttributeClick = () => {
  // Open modal to select attribute
  const modalElement = document.getElementById("addAttributeModal");
  if (modalElement) {
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
  }
};

const selectAttribute = (attributeId: number) => {
  // Add selected attribute
  selectedAttributes.value.push({
    attribute_id: attributeId,
    sort: selectedAttributes.value.length,
    values: [],
  });

  // Close modal
  const modalElement = document.getElementById("addAttributeModal");
  if (modalElement) {
    const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
    modal?.hide();
  }
  resetNewAttributeForm();
};

const resetNewAttributeForm = () => {
  newAttributeForm.value = {
    name: "",
    sort: 0,
  };
  attributeModalTab.value = "select";
};

const handleCreateAttribute = async () => {
  if (!newAttributeForm.value.name.trim()) {
    return;
  }

  creatingAttribute.value = true;
  try {
    const { data, error } = await createAttribute({
      name: newAttributeForm.value.name.trim(),
      sort: newAttributeForm.value.sort || 0,
      status: "ACTIVE", // Always ACTIVE for new attributes
    });

    if (error) {
      toast.error(error.message || "Failed to create attribute");
      return;
    }

    if (data?.success && data.data) {
      // Reload attributes to get the new one
      await loadAvailableAttributes();

      // Automatically select the newly created attribute
      const newAttributeId = data.data.id;
      selectAttribute(newAttributeId);

      // Show success message
      toast.success("Attribute created and added successfully");
    }
  } catch (err) {
    console.error("Error creating attribute:", err);
    toast.error("Failed to create attribute");
  } finally {
    creatingAttribute.value = false;
  }
};

const removeAttribute = (index: number) => {
  selectedAttributes.value.splice(index, 1);
  // Note: Variants are now created manually, so we don't auto-regenerate
};

const handleAddAttributeValueClick = async (attributeId: number) => {
  addingValueToAttributeId.value = attributeId;
  resetNewAttributeValueForm();

  // Open modal
  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 50));

  const modalElement = document.getElementById("addAttributeValueModal");
  if (!modalElement) {
    console.error("Add Attribute Value modal element not found");
    return;
  }

  if (!(window as any).bootstrap || !(window as any).bootstrap.Modal) {
    console.error("Bootstrap Modal is not available");
    return;
  }

  try {
    let modal = (window as any).bootstrap.Modal.getInstance(modalElement);
    if (!modal) {
      modal = new (window as any).bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
      });
    }
    modal.show();
  } catch (error) {
    console.error("Error showing add attribute value modal:", error);
  }
};

const resetNewAttributeValueForm = () => {
  newAttributeValueForm.value = {
    value: "",
    sort: 0,
  };
};

const handleCreateAttributeValue = async () => {
  if (
    !newAttributeValueForm.value.value.trim() ||
    !addingValueToAttributeId.value
  ) {
    return;
  }

  creatingAttributeValue.value = true;
  try {
    const { data, error } = await createAttributeValue({
      attribute_id: addingValueToAttributeId.value,
      value: newAttributeValueForm.value.value.trim(),
      sort: newAttributeValueForm.value.sort || 0,
      status: "ACTIVE", // Always ACTIVE for new values
    });

    if (error) {
      toast.error(error.message || "Failed to create attribute value");
      return;
    }

    if (data?.success && data.data) {
      const newValue = data.data;
      const newValueId = newValue.id;
      const newValueStatus = newValue.status || "ACTIVE";

      // Reload attributes to get the new value (only ACTIVE values will appear)
      await loadAvailableAttributes();

      // Only auto-select if status is ACTIVE
      if (newValueStatus === "ACTIVE") {
        const selectedAttr = selectedAttributes.value.find(
          (sa) => sa.attribute_id === addingValueToAttributeId.value,
        );
        if (selectedAttr && !selectedAttr.values.includes(newValueId)) {
          selectedAttr.values.push(newValueId);
        }
        toast.success("Attribute value created and added successfully");
      } else {
        // For INACTIVE values, manually add to availableAttributes so it appears in UI
        const attribute = availableAttributes.value.find(
          (attr) => attr.id === addingValueToAttributeId.value,
        );
        if (attribute) {
          // Add the INACTIVE value to the attribute's values array
          if (!attribute.attribute_values) {
            attribute.attribute_values = [];
          }
          // Check if value already exists
          const exists = attribute.attribute_values.some(
            (v: any) => v.id === newValueId,
          );
          if (!exists) {
            attribute.attribute_values.push({
              id: newValue.id,
              attribute_id: newValue.attribute_id,
              value: newValue.value,
              slug: newValue.slug,
              sort: newValue.sort,
              status: newValue.status,
            });
            // Sort by sort order
            attribute.attribute_values.sort(
              (a: any, b: any) => a.sort - b.sort,
            );
          }
        }
        toast.success(
          "Attribute value created (INACTIVE - not automatically selected)",
        );
      }

      // Close modal
      const modalElement = document.getElementById("addAttributeValueModal");
      if (modalElement) {
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }

      resetNewAttributeValueForm();
    }
  } catch (err) {
    console.error("Error creating attribute value:", err);
    toast.error("Failed to create attribute value");
  } finally {
    creatingAttributeValue.value = false;
  }
};

// Generate variant combinations from selected attributes (Cartesian Product)
const generateVariantCombinations = () => {
  if (selectedAttributes.value.length === 0) {
    variants.value = [];
    return;
  }

  // Get all selected attribute values
  const attributeValueArrays: number[][] = [];
  const attributeNames: string[] = [];

  selectedAttributes.value.forEach((selectedAttr) => {
    const attribute = availableAttributes.value.find(
      (attr) => attr.id === selectedAttr.attribute_id,
    );
    if (attribute && selectedAttr.values.length > 0) {
      attributeValueArrays.push(selectedAttr.values);
      attributeNames.push(attribute.name);
    }
  });

  // If no values selected, clear variants
  if (attributeValueArrays.length === 0) {
    variants.value = [];
    return;
  }

  // Generate Cartesian Product
  const combinations: number[][] = [];
  const generateCombinations = (
    arrays: number[][],
    current: number[] = [],
    index: number = 0,
  ) => {
    if (index === arrays.length) {
      combinations.push([...current]);
      return;
    }
    for (const value of arrays[index]) {
      current.push(value);
      generateCombinations(arrays, current, index + 1);
      current.pop();
    }
  };

  generateCombinations(attributeValueArrays);

  // Create variant objects with attribute_value_ids
  const existingVariants = variants.value.filter(
    (v) => v.attribute_value_ids && v.attribute_value_ids.length > 0,
  );
  const newVariants: typeof variants.value = combinations.map((combo) => {
    // Check if this combination already exists
    const existing = existingVariants.find((v) => {
      if (
        !v.attribute_value_ids ||
        v.attribute_value_ids.length !== combo.length
      )
        return false;
      return (
        v.attribute_value_ids.every((id) => combo.includes(id)) &&
        combo.every((id) => v.attribute_value_ids!.includes(id))
      );
    });

    if (existing) {
      // Keep existing variant data
      return existing;
    }

    // Generate variant name from attribute values
    const variantNameParts: string[] = [];
    combo.forEach((valueId) => {
      selectedAttributes.value.forEach((selectedAttr) => {
        const attribute = availableAttributes.value.find(
          (attr) => attr.id === selectedAttr.attribute_id,
        );
        if (attribute) {
          const value = attribute.attribute_values?.find(
            (v) => v.id === valueId,
          );
          if (value) {
            variantNameParts.push(value.value);
          }
        }
      });
    });

    return {
      attribute_value_ids: combo,
      variant_name: variantNameParts.join(" - "),
      sku: "",
      price: productForm.value.base_price || 0,
      strike_price: productForm.value.base_strike_price || null,
      status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    };
  });

  variants.value = newVariants;
};

const getAttributeValueName = (valueId: number): string => {
  for (const attr of availableAttributes.value) {
    const value = attr.attribute_values?.find((v) => v.id === valueId);
    if (value) {
      return value.value;
    }
  }
  return `Value ${valueId}`;
};

const nextStep = () => {
  if (currentStep.value < steps.length && canProceedToNextStep.value) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const canProceedToNextStep = computed(() => {
  if (currentStep.value === 1) {
    return productForm.value.name && productForm.value.slug;
  }
  return true;
});

const canCreateProduct = computed(() => {
  return productForm.value.name && productForm.value.slug;
});

const handleSetFeaturedPending = (index: number) => {
  // Ensure index is valid
  if (index < 0 || index >= pendingImages.value.length) {
    return;
  }

  // Set all images to not featured first, then set the selected one as featured
  pendingImages.value.forEach((img, idx) => {
    img.is_featured = idx === index;
  });

  settingFeaturedIndex.value = index;
  setTimeout(() => {
    settingFeaturedIndex.value = null;
  }, 500);
};


const maxFileSze =  5 * 1024 * 1024;
const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  const currentLength = pendingImages.value.length;
  const isFirstImage = currentLength === 0;

  // Create a Set to track existing file names and sizes to prevent duplicates
  const existingFiles = new Set<string>();
  pendingImages.value.forEach((img) => {
    const key = `${img.file.name}-${img.file.size}`;
    existingFiles.add(key);
  });

  // Process files sequentially to avoid race conditions
  const processFiles = async () => {
    const newImages: Array<{
      file: File;
      preview: string;
      is_featured?: boolean;
    }> = [];

    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];

      // Skip if file is undefined
      if (!file) {
        continue;
      }

      if (file.size > maxFileSze) {
        toast.error(`File "${file.name}" terlalu besar. Maksimal 5MB.`);
        continue;
      }

      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        continue;
      }

      // Check for duplicates
      const fileKey = `${file.name}-${file.size}`;
      if (existingFiles.has(fileKey)) {
        console.warn(`Skipping duplicate file: ${file.name}`);
        continue;
      }

      // Read file as data URL
      const preview = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result as string);
          } else {
            reject(new Error("Failed to read file"));
          }
        };
        reader.onerror = () => reject(new Error("FileReader error"));
        reader.readAsDataURL(file);
      });

      newImages.push({
        file,
        preview,
        is_featured: isFirstImage && fileIndex === 0 && newImages.length === 0, // First image is featured by default
      });

      existingFiles.add(fileKey);
    }

    // Add all new images at once
    if (newImages.length > 0) {
      pendingImages.value.push(...newImages);

      // Ensure only one featured image
      if (isFirstImage && newImages.length > 0) {
        pendingImages.value.forEach((img, idx) => {
          img.is_featured = idx === 0;
        });
      }
    }
  };

  processFiles().catch((err) => {
    console.error("Error processing images:", err);
    toast.error("Error processing some images");
  });

  // Reset input to allow selecting the same file again if needed
  target.value = "";
};

const removePendingImage = (index: number) => {
  pendingImages.value.splice(index, 1);
};

const handleAddVariantClick = async () => {
  if (selectedAttributes.value.length === 0) {
    toast.error("Please select attributes in Step 3 first");
    return;
  }

  editingVariantIndex.value = null;
  variantForm.value = {
    selectedAttributeValues: {},
    attribute_value_ids: [],
    variant_name: "",
    sku: "",
    price: productForm.value.base_price || 0,
    strike_price: productForm.value.base_strike_price || null,
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    image_file: null,
    image_preview: null,
    image_path: null,
  };
  variantStoreStocks.value = [];

  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 50));

  const modalElement = document.getElementById("variantModal");
  if (!modalElement) {
    console.error("Variant modal element not found");
    return;
  }

  if (!(window as any).bootstrap || !(window as any).bootstrap.Modal) {
    console.error("Bootstrap Modal is not available");
    return;
  }

  try {
    let modal = (window as any).bootstrap.Modal.getInstance(modalElement);
    if (!modal) {
      modal = new (window as any).bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
      });
    }
    modal.show();
  } catch (error) {
    console.error("Error showing variant modal:", error);
  }
};

const updateVariantName = () => {
  // Generate variant name from selected attribute values (only selected ones)
  const variantNameParts: string[] = [];
  const selectedValueIds: number[] = [];

  selectedAttributes.value.forEach((selectedAttr) => {
    const selectedValueId =
      variantForm.value.selectedAttributeValues[selectedAttr.attribute_id];
    if (selectedValueId) {
      // Validate that the selected value is actually in the allowed list (from Step 3)
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
        // If value is not in allowed list, clear it
        delete variantForm.value.selectedAttributeValues[
          selectedAttr.attribute_id
        ];
      }
    }
  });

  // If no values selected, use default name
  if (variantNameParts.length === 0) {
    variantForm.value.variant_name = "Default Variant";
  } else {
    variantForm.value.variant_name = variantNameParts.join(" - ");
  }
  variantForm.value.attribute_value_ids = selectedValueIds;
};

const handleSaveVariant = (variantData: any) => {
  // Check for duplicate variant (same attribute_value_ids combination)
  const newAttributeValueIds = [...variantData.attribute_value_ids].sort(
    (a, b) => a - b,
  );
  const isDuplicate = variants.value.some((v, index) => {
    if (
      editingVariantIndex.value !== null &&
      index === editingVariantIndex.value
    ) {
      return false; // Skip current variant being edited
    }
    const existingIds = [...(v.attribute_value_ids || [])].sort(
      (a, b) => a - b,
    );
    return (
      existingIds.length === newAttributeValueIds.length &&
      existingIds.every((id, idx) => id === newAttributeValueIds[idx])
    );
  });

  if (isDuplicate) {
    toast.error("A variant with this combination already exists");
    return;
  }

  // Create variant data with store_stocks
  const finalVariantData = {
    ...variantData,
    variant_name: variantData.variant_name || "Unnamed Variant",
    sku: variantData.sku || "",
    price: variantData.price || 0,
    status: variantData.status || "ACTIVE",
    store_stocks: variantData.store_stocks || [],
  };

  // Update or add variant
  if (
    editingVariantIndex.value !== null &&
    variants.value[editingVariantIndex.value]
  ) {
    variants.value[editingVariantIndex.value] = finalVariantData;
    editingVariantIndex.value = null;
    toast.success("Variant updated successfully");
  } else {
    variants.value.push(finalVariantData);
    toast.success("Variant added successfully");
  }

  // Close modal
  const modalElement = document.getElementById("variantModal");
  if (modalElement) {
    const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
    modal?.hide();
  }

  handleCancelVariant();
};

const handleCancelVariant = () => {
  variantStoreStocks.value = [];
  editingVariantIndex.value = null;
  variantForm.value = {
    selectedAttributeValues: {},
    attribute_value_ids: [],
    variant_name: "",
    image_file: null,
    image_preview: null,
    image_path: null,
    sku: "",
    price: productForm.value.base_price || 0,
    strike_price: productForm.value.base_strike_price || null,
    status: "ACTIVE",
    weight: 0,
    type_weight: "GRAM",
  };
};

const editVariant = async (index: number) => {
  if (variants.value && variants.value[index]) {
    editingVariantIndex.value = index;
    const variant = variants.value[index];

    // Load store stocks if variant has id (existing variant)
    if (variant.store_stocks) {
      variantStoreStocks.value = variant.store_stocks.map(mapStoreStock);
    } else {
      variantStoreStocks.value = [];
    }

    // Reconstruct selectedAttributeValues from attribute_value_ids
    const selectedAttributeValues: Record<number, number> = {};
    variant.attribute_value_ids?.forEach((valueId) => {
      // Find which attribute this value belongs to
      selectedAttributes.value.forEach((selectedAttr) => {
        const value = getAttributeValuesList(selectedAttr.attribute_id).find(
          (v) => v.id === valueId,
        );
        if (value) {
          selectedAttributeValues[selectedAttr.attribute_id] = valueId;
        }
      });
    });

    variantForm.value = {
      selectedAttributeValues,
      attribute_value_ids: variant.attribute_value_ids || [],
      variant_name: variant.variant_name || "",
      sku: variant.sku || "",
      price: variant.price || 0,
      strike_price: variant.strike_price || null,
      image_file: variant.image_file || null,
      image_preview: variant.image_preview || variant.image_path || null,
      image_path: variant.image_path || null,
      status: variant.status || "ACTIVE",
      weight: variant.weight || 0,
      type_weight: variant.type_weight || "GRAM",
    };

    // Open modal for editing
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 50));

    const modalElement = document.getElementById("variantModal");
    if (
      modalElement &&
      (window as any).bootstrap &&
      (window as any).bootstrap.Modal
    ) {
      try {
        let modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        if (!modal) {
          modal = new (window as any).bootstrap.Modal(modalElement);
        }
        modal.show();
      } catch (error) {
        console.error("Error showing variant modal:", error);
      }
    }
  }
};

const removeVariant = (index: number) => {
  variants.value.splice(index, 1);
};

// Helper function to map store stock data
const mapStoreStock = (stock: any) => ({
  id: stock.id,
  store_id: stock.store_id,
  qty: stock.qty,
  reserved_qty: stock.reserved_qty || 0,
  store: stock.store,
});

const loadAvailableAttributes = async () => {
  loadingAttributes.value = true;
  try {
    const { data, error } = await getActiveAttributes();
    if (error) {
      console.error("Error loading attributes:", error);
      availableAttributes.value = [];
      return;
    }
    availableAttributes.value = data?.data || [];
  } catch (err) {
    console.error("Error loading attributes:", err);
    availableAttributes.value = [];
  } finally {
    loadingAttributes.value = false;
  }
};

const loadAvailableCategories = async () => {
  loadingCategories.value = true;
  try {
    const [type2, type3] = await Promise.all([
      getTaxoListsByType(2),
      getTaxoListsByType(3),
    ]);
    const categories2 = type2.data?.data?.taxo_lists || [];
    const categories3 = type3.data?.data?.taxo_lists || [];
    availableCategories.value = [...categories2, ...categories3];
  } catch (err) {
    console.error("Error loading available categories:", err);
    availableCategories.value = [];
  } finally {
    loadingCategories.value = false;
  }
};

const getCategoryName = (categoryId: number) => {
  const category = availableCategories.value.find(
    (cat) => cat.id === categoryId,
  );
  return category?.taxonomy_name || `Category ${categoryId}`;
};

const filteredCategories = computed(() => {
  if (!categorySearchQuery.value.trim()) {
    return availableCategories.value;
  }
  const query = categorySearchQuery.value.toLowerCase();
  return availableCategories.value.filter(
    (cat) =>
      cat.taxonomy_name?.toLowerCase().includes(query) ||
      cat.taxonomy_description?.toLowerCase().includes(query),
  );
});

const removeCategory = (categoryId: number) => {
  selectedCategoryIds.value = selectedCategoryIds.value.filter(
    (id) => id !== categoryId,
  );
};

const handleAddCategoryClick = () => {
  categoryModalTab.value = "create";
  resetNewCategoryForm();

  // Open modal
  nextTick(() => {
    const modalElement = document.getElementById("addCategoryModal");
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
      });
      modal.show();
    }
  });
};

const resetNewCategoryForm = () => {
  newCategoryForm.value = {
    taxonomy_name: "",
    taxonomy_slug: "",
    taxonomy_description: "",
    taxonomy_type: 2,
    taxonomy_status: "ACTIVE",
  };
  categoryModalTab.value = "select";
};

const generateCategorySlug = () => {
  if (!newCategoryForm.value.taxonomy_name) return;
  newCategoryForm.value.taxonomy_slug = newCategoryForm.value.taxonomy_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const handleCreateCategory = async () => {
  if (!newCategoryForm.value.taxonomy_name.trim()) {
    toast.error("Category name is required");
    return;
  }

  creatingCategory.value = true;
  try {
    const { data, error } = await createTaxoList({
      taxonomy_name: newCategoryForm.value.taxonomy_name.trim(),
      taxonomy_slug: newCategoryForm.value.taxonomy_slug.trim() || undefined,
      taxonomy_description:
        newCategoryForm.value.taxonomy_description.trim() || undefined,
      taxonomy_type: newCategoryForm.value.taxonomy_type,
      taxonomy_status: newCategoryForm.value.taxonomy_status,
    });

    if (error) {
      toast.error(error.message || "Failed to create category");
      return;
    }

    if (data?.success && data.data) {
      // Reload categories to get the new one
      await loadAvailableCategories();

      // Automatically select the newly created category
      const newCategoryId = data.data.id;
      if (!selectedCategoryIds.value.includes(newCategoryId)) {
        selectedCategoryIds.value.push(newCategoryId);
      }

      // Close modal
      const modalElement = document.getElementById("addCategoryModal");
      if (modalElement) {
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }

      resetNewCategoryForm();
      toast.success("Category created and added successfully");
    }
  } catch (err) {
    console.error("Error creating category:", err);
    toast.error("Failed to create category");
  } finally {
    creatingCategory.value = false;
  }
};

// Edit/Delete Category in Step
const editCategoryFormData = ref<any>({
  id: null,
  taxonomy_name: "",
  taxonomy_slug: "",
  original_slug: "",
  taxonomy_description: "",
  taxonomy_status: "ACTIVE",
});
const editingCategoryInStep = ref(false);
const categoryToDeleteInStep = ref<any>(null);
const deletingCategoryInStep = ref(false);

const openCreateCategoryModal = () => {
  resetNewCategoryForm();
  nextTick(() => {
    const modalEl = document.getElementById("addCategoryModal");
    if (modalEl) {
      const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  });
};

const generateEditCategorySlug = () => {
  if (!editCategoryFormData.value.taxonomy_name) return;
  editCategoryFormData.value.taxonomy_slug = editCategoryFormData.value.taxonomy_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const openEditCategoryModalInStep = async (category: any) => {
  editCategoryFormData.value = {
    id: category.id,
    taxonomy_name: category.taxonomy_name,
    taxonomy_slug: category.taxonomy_slug,
    original_slug: category.taxonomy_slug,
    taxonomy_description: category.taxonomy_description || "",
    taxonomy_status: category.taxonomy_status || "ACTIVE",
  };
  await nextTick();
  const modalEl = document.getElementById("editCategoryInStepModal");
  if (modalEl) {
    const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
};

const handleEditCategoryInStep = async () => {
  editingCategoryInStep.value = true;
  try {
    const payload: any = {
      taxonomy_name: editCategoryFormData.value.taxonomy_name,
      taxonomy_slug: editCategoryFormData.value.taxonomy_slug,
      taxonomy_status: editCategoryFormData.value.taxonomy_status,
      taxonomy_description: editCategoryFormData.value.taxonomy_description,
    };
    if (
      editCategoryFormData.value.taxonomy_slug &&
      editCategoryFormData.value.taxonomy_slug !== editCategoryFormData.value.original_slug
    ) {
      payload.taxonomy_slug = editCategoryFormData.value.taxonomy_slug;
    } else {
      payload.taxonomy_slug = editCategoryFormData.value.taxonomy_name;
    }
    const { data, error } = await updateTaxoList(editCategoryFormData.value.id, payload);
    if (error) {
      toast.error(error.message || "Failed to update category");
      return;
    }
    toast.success("Category updated successfully");
    const modalEl = document.getElementById("editCategoryInStepModal");
    if (modalEl) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
    await loadAvailableCategories();
  } catch (err) {
    toast.error("Error updating category");
  } finally {
    editingCategoryInStep.value = false;
  }
};

const openDeleteCategoryModalInStep = async (category: any) => {
  categoryToDeleteInStep.value = category;
  await nextTick();
  const modalEl = document.getElementById("deleteCategoryInStepModal");
  if (modalEl) {
    const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
};

const handleDeleteCategoryInStep = async () => {
  if (!categoryToDeleteInStep.value?.id) return;
  deletingCategoryInStep.value = true;
  try {
    const { data, error } = await deleteTaxoList(categoryToDeleteInStep.value.id);
    if (error) {
      toast.error(error.message || "Failed to delete category");
      return;
    }
    toast.success("Category deleted successfully");
    const modalEl = document.getElementById("deleteCategoryInStepModal");
    if (modalEl) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
    // Remove from selected if it was selected
    selectedCategoryIds.value = selectedCategoryIds.value.filter(
      (id) => id !== categoryToDeleteInStep.value.id
    );
    categoryToDeleteInStep.value = null;
    await loadAvailableCategories();
  } catch (err) {
    toast.error("Error deleting category");
  } finally {
    deletingCategoryInStep.value = false;
  }
};

const loadAvailableBrands = async () => {
  loadingBrands.value = true;
  try {
    const { data } = await getBrands();
    availableBrands.value = data?.data.brands || [];
  } catch (err) {
    console.error("Failed to load brands", err);
    availableBrands.value = [];
  } finally {
    loadingBrands.value = false;
  }
};

const getBrandName = (brandId: number) => {
  const brand = availableBrands.value.find((b) => b.id === brandId);
  return brand?.name || `Brand ${brandId}`;
};

const filteredBrands = computed(() => {
  if (!brandSearchQuery.value.trim()) return availableBrands.value;
  const q = brandSearchQuery.value.toLowerCase();
  return availableBrands.value.filter((b) => b.name?.toLowerCase().includes(q));
});

const removeBrand = (brandId: number) => {
  selectedBrandIds.value = selectedBrandIds.value.filter(
    (id) => id !== brandId,
  );
};

const openCreateBrandModal = () => {
  newBrand.value = { name: "", description: "" };
  const modal = new bootstrap.Modal(
    document.getElementById("createBrandModal")!,
  );
  modal.show();
};

const submitCreateBrand = async () => {
  if (!newBrand.value.name) return;

  creatingBrand.value = true;
  try {
    const { data, error } = await createBrand({
      name: newBrand.value.name,
      description: newBrand.value.description,
      status: "ACTIVE",
    });

    if (error) throw error;

    const brand = data?.data.brand;
    if (brand) {
      // add to list
      availableBrands.value.unshift(brand);

      // auto-select
      selectedBrandIds.value.push(brand.id);
    }

    // close modal
    const modalEl = document.getElementById("createBrandModal");
    const modal = bootstrap.Modal.getInstance(modalEl!);
    modal?.hide();
  } catch (err) {
    console.error("Create brand failed", err);
    toast.error("Failed to create brand");
  } finally {
    creatingBrand.value = false;
  }
};

const handleCreateProduct = async () => {
  try {
    isLoading.value = true;
    productFormErrors.value = {};

    // Step 1: Create product
    const { data, error } = await createProduct(productForm.value);
    if (error) {
      if (error.errors) {
        productFormErrors.value = error.errors;
        currentStep.value = 1; // Go back to first step if validation fails
      } else {
        alert(error.message || "Failed to create product");
      }
      return;
    }

    if (!data?.success || !data.data.product) {
      alert("Failed to create product");
      return;
    }

    const productId = data.data.product.id;

    // Step 2: Upload images
    if (pendingImages.value && pendingImages.value.length > 0) {
      uploadingImages.value = true;
      const uploadErrors: string[] = [];

      try {
        // Filter out any invalid images first
        const validImages = pendingImages.value.filter((img, idx) => {
          if (!img || !img.file) {
            console.warn(`Skipping invalid image at index ${idx}`);
            return false;
          }
          return true;
        });

        // Upload images sequentially to maintain order
        for (let i = 0; i < validImages.length; i++) {
          const image = validImages[i];
          if (!image || !image.file) {
            console.warn(`Skipping invalid image at index ${i}`);
            continue;
          }

          try {
            // Use the index in validImages array as order_number
            await uploadProductImage(
              productId,
              image.file,
              i, // order_number
              image.is_featured || false,
            );
          } catch (err: any) {
            const errorMsg = err?.message || `Failed to upload image ${i + 1}`;
            console.error(`Error uploading image ${i + 1}:`, err);
            uploadErrors.push(errorMsg);
            // Continue with next image even if one fails
          }
        }

        if (uploadErrors.length > 0) {
          toast.warning(
            `Some images failed to upload: ${uploadErrors.join(", ")}`,
          );
        } else if (validImages.length > 0) {
          toast.success(`Successfully uploaded ${validImages.length} image(s)`);
        }
      } catch (err) {
        console.error("Error in image upload process:", err);
        toast.error("Error uploading images");
      } finally {
        uploadingImages.value = false;
      }
    }

    // Step 3: Attach attributes
    if (selectedAttributes.value && selectedAttributes.value.length > 0) {
      try {
        await attachProductAttributes(productId, selectedAttributes.value);
      } catch (err) {
        console.error("Error attaching attributes:", err);
        // Continue even if attribute attachment fails
      }
    }

    // Step 4: Create variants
    if (variants.value && variants.value.length > 0) {
      try {
        for (const variant of variants.value) {
          let variantImagePath = variant.image_path || null;

          // If variant has image_file, upload it first
          if (variant.image_file) {
            try {
              const { data: imageData, error: imageError } =
                await uploadVariantImage(productId, variant.image_file);
              if (imageData?.data?.path) {
                variantImagePath = imageData.data.path;
              } else if (imageError) {
                console.error("Error uploading variant image:", imageError);
                toast.warning(
                  `Failed to upload image for variant ${variant.variant_name}`,
                );
              }
            } catch (err) {
              console.error("Error uploading variant image:", err);
              toast.warning(
                `Failed to upload image for variant ${variant.variant_name}`,
              );
            }
          }

          const variantResponse = await createProductVariant({
            fk_product_id: productId,
            variant_name: variant.variant_name || null,
            attribute_value_ids: variant.attribute_value_ids || [],
            sku: variant.sku || null,
            image_path: variantImagePath,
            price: variant.price || null,
            strike_price: variant.strike_price || null,
            status: variant.status,
            weight: variant.weight || null,
            type_weight: variant.type_weight || null,
          });

          // Create store stocks if variant has store stocks
          if (
            variant.store_stocks &&
            variant.store_stocks.length > 0 &&
            variantResponse.data?.data?.id
          ) {
            const variantId = variantResponse.data.data.id;
            for (const storeStock of variant.store_stocks) {
              try {
                await createOrUpdateVariantStoreStock(variantId, {
                  store_id: storeStock.store_id,
                  qty: storeStock.qty,
                  reserved_qty: storeStock.reserved_qty || 0,
                });
              } catch (err) {
                console.error("Error creating store stock:", err);
                toast.warning(
                  `Failed to create store stock for variant ${variant.variant_name}`,
                );
              }
            }
          }
        }
      } catch (err) {
        console.error("Error creating variants:", err);
        // Continue even if variant creation fails
      }
    }

    // Step 5: Attach categories
    if (selectedCategoryIds.value && selectedCategoryIds.value.length > 0) {
      try {
        await attachProductCategories(productId, selectedCategoryIds.value);
      } catch (err) {
        console.error("Error attaching categories:", err);
        // Continue even if category attachment fails
      }
    }

    // Step 6: Attach brands
    if (selectedBrandIds.value && selectedBrandIds.value.length > 0) {
      try {
        await attachProductBrands(productId, selectedBrandIds.value);
      } catch (err) {
        console.error("Error attaching brands:", err);
      }
    }

    // Redirect to product detail page using slug
    const productSlug = data.data.product.slug;
    router.push(`/manage-product/${productSlug}`);
  } catch (err) {
    alert(err instanceof Error ? err.message : "Failed to create product");
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await Promise.all([
    loadAvailableCategories(),
    loadAvailableAttributes(),
    loadAvailableBrands(),
  ]);
});
</script>

<style scoped>
.nav-tabs .nav-link {
  cursor: pointer;
}

.nav-tabs .nav-link:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.nav-tabs .nav-link.active {
  font-weight: 600;
  border-color: #0d6efd #0d6efd #fff;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
