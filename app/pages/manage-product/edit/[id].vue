<template>
  <div>
    <!-- Loading State -->
    <div v-if="loadingProduct" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted">Loading product...</p>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="card">
      <div class="card-body text-center py-5">
        <h5>Product not found</h5>
        <p class="text-muted">The product you're looking for doesn't exist.</p>
        <NuxtLink to="/manage-product" class="btn btn-primary">
          Back to Products
        </NuxtLink>
      </div>
    </div>

    <!-- Edit Form with Tabs -->
    <div v-else>
      <!-- Page Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 class="mb-0">Edit Product</h4>
          <p class="text-muted mb-0">{{ product.name }}</p>
        </div>
        <NuxtLink
          :to="`/manage-product/${product.slug}`"
          class="btn btn-secondary"
        >
          <i class="bi bi-arrow-left me-2"></i>Back to Product
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
                          <i class="bi bi-info-circle me-2"></i>Basic
                          Information
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
                      <div
                        v-if="productFormErrors.name"
                        class="invalid-feedback"
                      >
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
                      <div
                        v-if="productFormErrors.slug"
                        class="invalid-feedback"
                      >
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
                  <!-- Loading Images -->
                  <div v-if="loadingImages" class="text-center py-3">
                    <div
                      class="spinner-border spinner-border-sm text-primary"
                      role="status"
                    ></div>
                    <p class="mt-2 text-muted small">Loading images...</p>
                  </div>

                  <!-- Upload New Images -->
                  <div v-else class="mb-4">
                    <label class="form-label">Upload New Images</label>
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

                  <!-- Existing Images -->
                  <div
                    v-if="
                      !loadingImages &&
                      existingImages &&
                      existingImages.length > 0
                    "
                    class="mb-4"
                  >
                    <h6 class="mb-3">Existing Images</h6>
                    <div class="row g-3">
                      <div
                        v-for="image in existingImages"
                        :key="image.id"
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
                            :src="image.path"
                            :alt="`Image ${image.order_number}`"
                            class="card-img-top"
                            style="height: 200px; object-fit: cover"
                            @error="handleImageError"
                          />
                          <div class="card-body p-2">
                            <div class="d-flex flex-column gap-2">
                              <div
                                class="d-flex justify-content-between align-items-center"
                              >
                                <small class="text-muted"
                                  >Order: {{ image.order_number }}</small
                                >
                                <div class="d-flex gap-1">
                                  <button
                                    v-if="!image.is_featured"
                                    type="button"
                                    class="btn btn-sm btn-outline-primary"
                                    @click="handleSetFeatured(image.id)"
                                    :disabled="settingFeaturedId === image.id"
                                    title="Set as Featured"
                                  >
                                    <i class="bi bi-star"></i>
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-outline-danger"
                                    @click="handleDeleteClick(image)"
                                    :disabled="deletingImageId === image.id"
                                    title="Delete"
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

                  <!-- Pending Images (New) -->
                  <div
                    v-if="
                      !loadingImages &&
                      pendingImages &&
                      pendingImages.length > 0
                    "
                    class="mb-4"
                  >
                    <h6 class="mb-3">New Images (will be uploaded on save)</h6>
                    <div class="row g-3">
                      <div
                        v-for="(image, index) in pendingImages"
                        :key="index"
                        class="col-md-3"
                      >
                        <div class="card">
                          <img
                            :src="image.preview"
                            :alt="`Preview ${index + 1}`"
                            class="card-img-top"
                            style="height: 200px; object-fit: cover"
                          />
                          <div class="card-body p-2">
                            <div
                              class="d-flex justify-content-between align-items-center"
                            >
                              <small class="text-muted"
                                >Order:
                                {{
                                  (existingImages?.length || 0) + index + 1
                                }}</small
                              >
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

                  <!-- No Images -->
                  <div
                    v-if="
                      !loadingImages &&
                      (!existingImages || existingImages.length === 0) &&
                      (!pendingImages || pendingImages.length === 0)
                    "
                    class="text-center py-4"
                  >
                    <p class="text-muted">No images yet</p>
                    <p class="text-muted small">
                      Upload images using the file input above
                    </p>
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
                            No values available. Click "Add Value" to add values
                            to this attribute.
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

                  <div v-else-if="loadingVariants" class="text-center py-3">
                    <div
                      class="spinner-border spinner-border-sm text-primary"
                      role="status"
                    ></div>
                    <p class="mt-2 text-muted small">Loading variants...</p>
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
                          <th>Stock</th>
                          <th>Price</th>
                          <th>Strike Price</th>
                          <th>Discount %</th>
                          <th>Status</th>
                          <th class="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(variant, index) in variants"
                          :key="variant.id || index"
                        >
                          <td>
                            <img
                              v-if="variant.image_path"
                              :src="variant.image_path"
                              :alt="variant.variant_name || 'Variant'"
                              class="img-thumbnail"
                              style="
                                max-width: 60px;
                                max-height: 60px;
                                object-fit: cover;
                              "
                            />
                            <span v-else class="text-muted small"
                              >No image</span
                            >
                          </td>
                          <td>
                            {{ variant.variant_name || "Unnamed Variant" }}
                          </td>
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
                          <td class="text-nowrap">
                            {{ getVariantTotalStock(variant) }}
                          </td>
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
                                @click="handleDeleteVariant(variant.id, index)"
                                :disabled="deletingVariantId === variant.id"
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
                    create a new category if needed.
                  </p>

                  <div
                    class="mb-3 d-flex justify-content-between align-items-center"
                  >
                    <div class="flex-grow-1">
                      <input
                        v-model="categorySearchQuery"
                        type="text"
                        class="form-control"
                        placeholder="Search categories..."
                      />
                    </div>
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
                      v-if="
                        selectedCategoryIds && selectedCategoryIds.length > 0
                      "
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
                          <div class="form-check">
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
                              {{
                                category?.taxonomy_name || "Unknown Category"
                              }}
                            </label>
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
                              :value="Number(brand.id)"
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
                    :to="`/manage-product/${product.slug}`"
                    class="btn btn-outline-secondary"
                  >
                    Cancel
                  </NuxtLink>
                  <button
                    v-if="currentStep < 6"
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
                    @click="handleUpdateProduct"
                    :disabled="isLoading || !canUpdateProduct"
                  >
                    {{ isLoading ? "Updating..." : "Update Product" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
            <div v-if="attributeModalTab === 'select'" class="tab-content">
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

    <!-- Add Attribute Value Modal -->
    <div
      class="modal fade"
      id="addAttributeValueModal"
      tabindex="-1"
      aria-labelledby="addAttributeValueModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAttributeValueModalLabel">
              Add Value to
              {{
                addingValueToAttributeId
                  ? getAttributeName(addingValueToAttributeId)
                  : "Attribute"
              }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleCreateAttributeValue">
              <div class="mb-3">
                <label class="form-label"
                  >Value <span class="text-danger">*</span></label
                >
                <input
                  v-model="newAttributeValueForm.value"
                  type="text"
                  class="form-control"
                  placeholder="e.g., Red, Blue, Small, Large"
                  required
                  maxlength="100"
                />
                <small class="text-muted"
                  >Value for this attribute (e.g., Red for Color, Small for
                  Size)</small
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Sort Order</label>
                <input
                  v-model.number="newAttributeValueForm.sort"
                  type="number"
                  class="form-control"
                  placeholder="0"
                  min="0"
                />
                <small class="text-muted"
                  >Display order (lower number appears first)</small
                >
              </div>
              <div class="d-flex gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="
                    creatingAttributeValue || !newAttributeValueForm.value
                  "
                >
                  <span
                    v-if="creatingAttributeValue"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  <i v-else class="bi bi-check-circle me-2"></i>
                  Create & Add
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="resetNewAttributeValueForm"
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
              @click="resetNewAttributeValueForm"
            >
              Cancel
            </button>
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

    <!-- Delete Image Modal -->
    <div
      id="deleteImageModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="deleteImageModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteImageModalLabel">Delete Image</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </p>
            <div v-if="imageToDelete" class="text-center mt-3">
              <img
                :src="imageToDelete.path"
                :alt="`Image ${imageToDelete.order_number}`"
                class="img-thumbnail"
                style="max-height: 200px; max-width: 100%"
                @error="handleImageError"
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
              class="btn btn-danger"
              @click="handleConfirmDeleteImage"
              :disabled="deletingImageId !== null"
            >
              {{ deletingImageId !== null ? "Deleting..." : "Delete Image" }}
            </button>
          </div>
        </div>
      </div>
    </div>

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
                  placeholder="e.g., Furniture, Electronics"
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
                <label class="form-label">Description</label>
                <textarea
                  v-model="newCategoryForm.taxonomy_description"
                  class="form-control"
                  rows="3"
                  placeholder="Category description (optional)"
                  maxlength="500"
                ></textarea>
                <small class="text-muted"
                  >Brief description of the category</small
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Category Type</label>
                <select
                  v-model.number="newCategoryForm.taxonomy_type"
                  class="form-select"
                >
                  <option :value="2">Main Category</option>
                  <option :value="3">Subcategory</option>
                </select>
                <small class="text-muted"
                  >Select the type of category. Main Category is a top-level
                  category, while Subcategory is a child category that belongs
                  to a Main Category.</small
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
    <!-- Add Brand Modal -->
    <div
      id="createBrandModal"
      class="modal fade"
      :class="{ show: showBrandModal }"
      :style="showBrandModal ? 'display: block;' : ''"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Header -->
          <div class="modal-header">
            <h5 class="modal-title" id="addBrandModalLabel">
              Create New Brand
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="resetNewBrandForm"
              aria-label="Close"
            ></button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <form @submit.prevent="handleCreateBrand">
              <!-- Brand Name -->
              <div class="mb-3">
                <label class="form-label">
                  Brand Name <span class="text-danger">*</span>
                </label>
                <input
                  v-model="newBrand.name"
                  type="text"
                  class="form-control"
                  required
                  maxlength="250"
                />
                <small class="text-muted">Name of the brand</small>
              </div>

              <!-- Description -->
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  v-model="newBrand.description"
                  class="form-control"
                  rows="3"
                  placeholder="Brand description (optional)"
                  maxlength="500"
                ></textarea>
                <small class="text-muted">
                  Brief description of the brand
                </small>
              </div>

              <!-- Actions -->
              <div class="d-flex gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="creatingBrand || !newBrand.name"
                >
                  <span
                    v-if="creatingBrand"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  <i v-else class="bi bi-check-circle me-2"></i>
                  Create & Add
                </button>

                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="resetInputField"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="resetNewBrandForm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductCreatePayload } from "~/types/product";
import {
  formatNumber,
  generateSlug,
  getVariantTotalStock,
} from "~/utils/helpers";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const route = useRoute();
const router = useRouter();
const { getProduct, updateProduct } = useProductApi();
const {
  getProductImages,
  uploadProductImage,
  uploadVariantImage,
  deleteProductImage,
  getProductVariants,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
  getProductCategories,
  attachProductCategories,
  detachProductCategories,
  createBrand,
  getBrands,
  getProductBrands,
  attachProductBrands,
  detachProductBrands,
  getTaxoListsByType,
  createTaxoList,
  getActiveAttributes,
  getProductAttributes,
  attachProductAttributes,
  detachProductAttributes,
  createAttribute,
  getAttributeValues,
  createAttributeValue,
  getVariantStoreStocks,
  createOrUpdateVariantStoreStock,
  deleteVariantStoreStock,
} = useProductRelationsApi();
const { getAllStores } = useStoreApi();
const toast = useToast();

// Step management
const currentStep = ref(1);
const isLoading = ref(false);
const loadingProduct = ref(false);
const productRelationSynced = ref(false);
const imagesLoaded = ref(false);
const attributesLoaded = ref(false);
const variantsLoaded = ref(false);
const categoriesLoaded = ref(false);
const brandsLoaded = ref(false);

const steps = [
  { key: 1, label: "Basic Info", icon: "bi bi-info-circle" },
  { key: 2, label: "Images", icon: "bi bi-images" },
  { key: 3, label: "Attributes", icon: "bi bi-list-check" },
  { key: 4, label: "Variants", icon: "bi bi-box-seam" },
  { key: 5, label: "Categories", icon: "bi bi-tags" },
  { key: 6, label: "Brands", icon: "bi bi-building" },
];

// Product data
const product = ref<Product | null>(null);

// Product form
const productForm = ref<ProductCreatePayload>({
  name: "",
  slug: "",
  status: "DRAFT",
  is_freeshiping: "INACTIVE",
  product_information: "",
  material: "",
  finishing: "",
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
const existingImages = ref<
  Array<{
    id: number;
    path: string;
    order_number: number;
    is_featured: boolean;
  }>
>([]);
const pendingImages = ref<Array<{ file: File; preview: string }>>([]);
const uploadingImages = ref(false);
const deletingImageId = ref<number | null>(null);
const settingFeaturedId = ref<number | null>(null);
const loadingImages = ref(false);
const imageToDelete = ref<{
  id: number;
  path: string;
  order_number: number;
} | null>(null);

// Variants
const variants = ref<
  Array<{
    id?: number;
    attribute_value_ids: number[];
    options?: Array<{
      id?: number;
      variant_id?: number;
      attribute_id: number;
      attribute_value_id: number;
    }>;
    variant_name?: string;
    sku?: string;
    image_path?: string | null;
    image_file?: File | null;
    price: number;
    strike_price?: number | null;
    discount_percent?: number | null;
    status: "ACTIVE" | "INACTIVE";
    weight?: number | null;
    type_weight?: "GRAM" | "KG";
    stock_relations?: Array<{
      id?: number;
      variant_id?: number;
      store_id: number;
      qty: number;
      reserved_qty: number;
      store?: {
        id: number;
        name: string;
        code?: string;
      };
    }>;
    store_stocks?: Array<{
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
  }>
>([]);
const loadingVariants = ref(false);
const editingVariantIndex = ref<number | null>(null);
const deletingVariantId = ref<number | null>(null);
const savingVariant = ref(false);

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

// Store Stock Management (still needed for backend API calls in edit page)
const stores = ref<
  Array<{
    id: number;
    name: string;
    code?: string;
  }>
>([]);
const loadingStores = ref(false);
const storeStockForm = ref({
  store_id: null as number | null,
  qty: 0,
  reserved_qty: 0,
});
const editingStoreStockIndex = ref<number | null>(null);
const savingStoreStock = ref(false);

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
      status?: string;
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
const newCategoryForm = ref({
  taxonomy_name: "",
  taxonomy_slug: "",
  taxonomy_description: "",
  taxonomy_type: 2, // Default to type 2 (category)
  taxonomy_status: "ACTIVE" as "ACTIVE" | "INACTIVE",
});

const brands = ref<any[]>([]);
const loadingBrands = ref(false);
const selectedBrandIds = ref<number[]>([]);
const brandSearchQuery = ref("");
const showBrandModal = ref(false);
const creatingBrand = ref(false);
const newBrand = ref({
  name: "",
  description: "",
});

// Load product data
const loadProduct = async () => {
  loadingProduct.value = true;
  productRelationSynced.value = false;
  try {
    const productSlug = route.params.id;
    const { data, error } = await getProduct(productSlug);

    if (error || !data?.success) {
      product.value = null;
      return;
    }

    if (data.data) {
      product.value = data.data.product;
      selectedCategoryIds.value =
        product.value.categories?.map((c) => Number(c.category_id || c.id)) ||
        [];

      // Populate form
      productForm.value = {
        name: product.value.name || "",
        slug: product.value.slug || "",
        status: product.value.status || "DRAFT",
        is_freeshiping: product.value.is_freeshiping || "INACTIVE",
        product_information: product.value.product_information || "",
        material: product.value.material || "",
        finishing: product.value.finishing || "",
        color: product.value.color || "",
        weight: product.value.weight || null,
        type_weight: product.value.type_weight || "GRAM",
        size_long: product.value.size_long || null,
        size_wide: product.value.size_wide || null,
        size_tall: product.value.size_tall || null,
        type_size: product.value.type_size || "CM",
        package_long: product.value.package_long || null,
        package_wide: product.value.package_wide || null,
        package_tall: product.value.package_tall || null,
        sku: product.value.sku || "",
        base_price: product.value.base_price || null,
        sort: product.value.sort || 0,
        tags: product.value.tags || "",
        product_protection_percent:
          product.value.product_protection_percent || 0,
        meta_title: product.value.meta_title || "",
        meta_description: product.value.meta_description || "",
        meta_keywords: product.value.meta_keywords || "",
      };
    }
  } catch (err) {
    console.error("Error load product:", err);
    product.value = null;
  } finally {
    loadingProduct.value = false;
  }
};

// Load images
const loadImages = async () => {
  if (!product.value) return;
  loadingImages.value = true;
  try {
    const { data, error } = await getProductImages(product.value.id);
    if (error || !data?.success) {
      console.error("Failed to load images:", error);
      existingImages.value = [];
    } else {
      existingImages.value = (data.data.images || []).map((img: any) => ({
        id: img.id,
        path: img.path,
        order_number: img.order_number,
        is_featured: img.is_featured || false,
      }));
    }
  } catch (err) {
    console.error("Error loading images:", err);
    existingImages.value = [];
  } finally {
    loadingImages.value = false;
  }
};

// Load variants
const loadVariants = async () => {
  if (!product.value) return;
  loadingVariants.value = true;
  try {
    const { data, error } = await getProductVariants(product.value.id);
    if (error || !data?.success) {
      console.error("Failed to load variants:", error);
      variants.value = [];
    } else {
      const variantsArray = Array.isArray(data.data) ? data.data : [];

      variants.value = variantsArray.map((variant: any) => {
        // Extract attribute_value_ids from options array if attribute_value_ids is not directly available
        let attributeValueIds: number[] = variant.attribute_value_ids || [];
        if (
          attributeValueIds.length === 0 &&
          variant.options &&
          Array.isArray(variant.options)
        ) {
          attributeValueIds = variant.options
            .map((opt: any) => opt.attribute_value_id)
            .filter((id: any) => id !== null && id !== undefined);
        }

        // Get store stocks from variant - check multiple possible property names
        const storeStocks =
          variant.stock_relations ||
          variant.stockRelations ||
          variant.store_stocks ||
          [];

        return {
          id: variant.id,
          attribute_value_ids: attributeValueIds,
          options: variant.options || [], // Keep options for reference
          variant_name: variant.variant_name || undefined,
          sku: variant.sku || undefined,
          image_path: variant.image_path || null,
          price:
            typeof variant.price === "string"
              ? parseFloat(variant.price)
              : variant.price || 0,
          strike_price: variant.strike_price
            ? typeof variant.strike_price === "string"
              ? parseFloat(variant.strike_price)
              : variant.strike_price
            : null,
          discount_percent: variant.discount_percent || null,
          status: variant.status || "ACTIVE",
          store_stocks: Array.isArray(storeStocks) ? storeStocks : [],
          weight: variant.weight || null,
          type_weight: variant.type_weight || "GRAM",
        };
      });
    }
  } catch (err) {
    console.error("Error loading variants:", err);
    variants.value = [];
  } finally {
    loadingVariants.value = false;
  }
};

// Load product categories
const loadProductCategories = async () => {
  if (!product.value) return;
  loadingCategories.value = true;
  try {
    const { data, error } = await getProductCategories(product.value.id);
    if (error || !data?.success) {
      console.error("Failed to load product categories:", error);
      selectedCategoryIds.value = [];
    } else {
      selectedCategoryIds.value = (data.data.categories || []).map(
        (cat: any) => cat.fk_category_id,
      );
    }
    loadingCategories.value = false;
  } catch (err) {
    console.error("Error loading product categories:", err);
    selectedCategoryIds.value = [];
    loadingCategories.value = false;
  }
};

// Load available categories
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

// Brands
const loadBrands = async () => {
  loadingBrands.value = true;
  try {
    const res = await getBrands();
    const mappedBrands = res.data.data.brands.map((b) => ({
      ...b,
      id: Number(b.id),
    }));

    brands.value = mappedBrands;
    filteredBrands.value = mappedBrands;
  } finally {
    loadingBrands.value = false;
  }
};

// Attributes functions
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

const loadProductAttributes = async () => {
  if (!product.value) return;

  loadingAttributes.value = true;

  try {
    const { data, error } = await getProductAttributes(product.value.id);

    if (error || !data?.success) {
      selectedAttributes.value = [];
      return;
    }

    const productAttributes = data.data || [];

    const productAttrMap = new Map();

    productAttributes.forEach((pa: any) => {
      productAttrMap.set(
        Number(pa.attribute_id),
        (pa.attribute_values || [])
          .map((v: any) => Number(v.attribute_value_id))
          .filter(Boolean),
      );
    });

    selectedAttributes.value = availableAttributes.value
      .filter((attr) => productAttrMap.has(attr.id))
      .map((attr) => ({
        attribute_id: attr.id,
        sort: attr.sort || 0,
        values: productAttrMap.get(attr.id) || [],
      }));

    attributesLoaded.value = true;
  } finally {
    loadingAttributes.value = false;
  }
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
  if (!attribute) return [];

  const allValues = attribute.attribute_values || [];

  // Show all values for all contexts (Step 3, Step 4, create variant, edit variant)
  // No filtering - user can select any available value
  return allValues;
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

const unselectedAttributes = computed(() => {
  return availableAttributes.value.filter(
    (attr) =>
      !selectedAttributes.value.some((sa) => sa.attribute_id === attr.id),
  );
});

const handleAddAttributeClick = () => {
  attributeModalTab.value = "select";
  resetNewAttributeForm();

  // Open modal
  nextTick(() => {
    const modalElement = document.getElementById("addAttributeModal");
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
      });
      modal.show();
    }
  });
};

const resetNewAttributeForm = () => {
  newAttributeForm.value = {
    name: "",
    sort: 0,
  };
  attributeModalTab.value = "select";
};

const selectAttribute = (attributeId: number) => {
  if (selectedAttributes.value.some((sa) => sa.attribute_id === attributeId))
    return;

  const attribute = availableAttributes.value.find((a) => a.id === attributeId);
  if (!attribute) return;

  const defaultValues = (attribute.attribute_values || [])
    .filter((v) => v.status === "ACTIVE")
    .map((v) => v.id);

  selectedAttributes.value.push({
    attribute_id: attributeId,
    sort: selectedAttributes.value.length + 1,
    values: defaultValues,
  });

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addAttributeModal"),
  );
  modal?.hide();
};

const handleCreateAttribute = async () => {
  if (!newAttributeForm.value.name.trim()) {
    return;
  }

  if (!product.value) {
    toast.error("Product not found");
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

      // Automatically select and save the newly created attribute to product
      const newAttributeId = data.data.id;
      await selectAttribute(newAttributeId);

      // Reset form
      resetNewAttributeForm();
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

  if (!product.value) {
    toast.error("Product not found");
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

      // Reload attributes to get the new value (only ACTIVE values will appear)
      await loadAvailableAttributes();

      // Auto-select the newly created value (always ACTIVE)
      const selectedAttr = selectedAttributes.value.find(
        (sa) => sa.attribute_id === addingValueToAttributeId.value,
      );
      if (selectedAttr && !selectedAttr.values.includes(newValueId)) {
        selectedAttr.values.push(newValueId);

        // Save updated attributes to database immediately
        const { data: saveData, error: saveError } =
          await attachProductAttributes(
            product.value.id,
            selectedAttributes.value,
          );

        if (saveError) {
          toast.error(
            saveError.message || "Failed to save attribute value to product",
          );
          // Rollback: remove the value from local state
          selectedAttr.values = selectedAttr.values.filter(
            (v) => v !== newValueId,
          );
          return;
        }

        if (saveData?.success) {
          // Reload product attributes from database to ensure sync
          await loadProductAttributes();
          toast.success("Attribute value created and added successfully");
        }
      } else if (!selectedAttr) {
        toast.error("Attribute not found in selected attributes");
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

// Step navigation
const goToStep = async (step: number) => {
  if (!canAccessStep(step)) return;

  currentStep.value = step;

  try {
    if (
      step === 2 &&
      product.value &&
      !imagesLoaded.value &&
      !loadingImages.value
    ) {
      await loadImages();
      imagesLoaded.value = true;
    }

    if (
      step === 3 &&
      product.value &&
      !attributesLoaded.value &&
      !loadingAttributes.value
    ) {
      await loadAvailableAttributes();
      await loadProductAttributes();
    }

    if (
      step === 4 &&
      product.value &&
      !variantsLoaded.value &&
      !loadingVariants.value
    ) {
      await loadVariants();
      variantsLoaded.value = true;
    }

    if (
      step === 5 &&
      product.value &&
      !categoriesLoaded.value &&
      !loadingCategories.value
    ) {
      await loadProductCategories();

      // Sync selection state
      selectedCategoryIds.value =
        product.value.categories?.map((c: any) =>
          Number(c.category_id || c.id),
        ) || [];

      categoriesLoaded.value = true;
    }

    if (
      step === 6 &&
      product.value &&
      !brandsLoaded.value &&
      !productRelationSynced.value
    ) {
      await loadBrands();

      selectedBrandIds.value =
        product.value.brands?.map((b: any) => Number(b.id)) || [];

      productRelationSynced.value = true;
    }
  } catch (err) {
    console.error("Error loading step data:", err);
  }
};

const canAccessStep = (step: number) => {
  if (step === 1) return true;
  if (step > 1) {
    return !!(productForm.value.name && productForm.value.slug);
  }
  return false;
};

const nextStep = () => {
  if (currentStep.value < 5 && canProceedToNextStep.value) {
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

const canUpdateProduct = computed(() => {
  return productForm.value.name && productForm.value.slug;
});

const maxFileSze = 5 * 1024 * 1024;
// Image handling
const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  Array.from(files).forEach((file) => {
    if (file.size > maxFileSze) {
      toast.error(`File "${file.name}" terlalu besar. Maksimal 5MB.`);
      return;
    }
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        pendingImages.value.push({
          file,
          preview: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  });

  // Reset input
  target.value = "";
};

const removePendingImage = (index: number) => {
  pendingImages.value.splice(index, 1);
};

const handleSetFeatured = async (imageId: number) => {
  settingFeaturedId.value = imageId;
  try {
    const { setFeaturedImage } = useProductRelationsApi();
    const { data, error } = await setFeaturedImage(imageId);

    if (error || !data?.success) {
      toast.error(error?.message || "Gagal mengatur featured image");
      return;
    }

    toast.success("Featured image berhasil diatur");
    // Reload images to reflect changes
    await loadImages();
  } catch (err) {
    console.error("Error setting featured image:", err);
    toast.error("Terjadi kesalahan saat mengatur featured image");
  } finally {
    settingFeaturedId.value = null;
  }
};

const handleDeleteClick = async (image: {
  id: number;
  path: string;
  order_number: number;
}) => {
  imageToDelete.value = image;
  await nextTick();
  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("deleteImageModal"),
  );
  modal.show();
};

const handleConfirmDeleteImage = async () => {
  if (!imageToDelete.value) return;
  deletingImageId.value = imageToDelete.value.id;
  try {
    const { data, error } = await deleteProductImage(imageToDelete.value.id);
    if (error) {
      toast.error(error.message || "Failed to delete image");
      return;
    }
    if (data?.success) {
      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("deleteImageModal"),
      );
      modal?.hide();
      imageToDelete.value = null;
      await loadImages();
      toast.success("Image deleted successfully");
    }
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to delete image");
  } finally {
    deletingImageId.value = null;
  }
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/assets/img/products/placeholder.png";
};

// Variant handling
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
    strike_price: null,
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    image_file: null,
    image_preview: null,
    image_path: null,
    weight: null,
    type_weight: "GRAM",
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

  // Get values from variant being edited (if any) to include in validation
  const editingVariantValueIds =
    editingVariantIndex.value !== null &&
    variants.value[editingVariantIndex.value]
      ? variants.value[editingVariantIndex.value].attribute_value_ids || []
      : [];

  selectedAttributes.value.forEach((selectedAttr) => {
    const selectedValueId =
      variantForm.value.selectedAttributeValues[selectedAttr.attribute_id];
    if (selectedValueId) {
      // Validate that the selected value is in the allowed list (from Step 3)
      // OR it's from the variant being edited (to allow editing existing variants)
      const isInStep3Values = selectedAttr.values.includes(selectedValueId);
      const isFromEditingVariant =
        editingVariantValueIds.includes(selectedValueId);

      if (isInStep3Values || isFromEditingVariant) {
        selectedValueIds.push(selectedValueId);
        const value = getAttributeValuesList(selectedAttr.attribute_id).find(
          (v) => v.id === selectedValueId,
        );
        if (value) {
          const attrName = getAttributeName(selectedAttr.attribute_id);
          variantNameParts.push(`${attrName}: ${value.value}`);
        }
      } else {
        // If value is not in allowed list and not from editing variant, clear it
        // But only if we're not editing (to prevent clearing during edit)
        if (editingVariantIndex.value === null) {
          delete variantForm.value.selectedAttributeValues[
            selectedAttr.attribute_id
          ];
        }
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

const handleSaveVariant = async (variantData: any) => {
  if (!product.value) return;

  // Use the variant data from component
  variantForm.value = {
    ...variantForm.value,
    ...variantData,
  };
  variantStoreStocks.value = variantData.store_stocks || [];

  // Continue with existing saveVariant logic
  await saveVariant();
};

const saveVariant = async () => {
  if (!product.value) return;

  // Validate that at least one attribute value is selected
  const selectedCount = Object.keys(
    variantForm.value.selectedAttributeValues,
  ).filter(
    (attrId) => variantForm.value.selectedAttributeValues[Number(attrId)],
  ).length;

  if (selectedCount === 0) {
    toast.error("Please select at least one attribute value");
    savingVariant.value = false;
    return;
  }

  // Validate required fields
  if (!variantForm.value.price || variantForm.value.price <= 0) {
    toast.error("Price is required and must be greater than 0");
    savingVariant.value = false;
    return;
  }

  // Check for duplicate variant (same attribute_value_ids combination)
  const newAttributeValueIds = [...variantForm.value.attribute_value_ids].sort(
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

  savingVariant.value = true;

  // Helper function to handle string fields
  const getStringValue = (value: string | undefined | null): string | null => {
    if (!value) return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  // Upload variant image if new file is selected
  let variantImagePath = variantForm.value.image_path || null;
  if (variantForm.value.image_file && product.value) {
    try {
      const { data: imageData, error: imageError } = await uploadVariantImage(
        product.value.id,
        variantForm.value.image_file,
      );
      if (imageData?.data?.path) {
        variantImagePath = imageData.data.path;
      } else if (imageError) {
        console.error("Error uploading variant image:", imageError);
        toast.warning("Failed to upload variant image");
      }
    } catch (err) {
      console.error("Error uploading variant image:", err);
      toast.warning("Failed to upload variant image");
    }
  }

  const variantData: {
    fk_product_id: number;
    variant_name?: string | null;
    attribute_value_ids?: number[];
    sku?: string | null;
    image_path?: string | null;
    price: number;
    strike_price?: number | null;
    status: "ACTIVE" | "INACTIVE";
    weight?: number | null;
    type_weight?: "GRAM" | "KG";
  } = {
    fk_product_id: product.value.id,
    variant_name: getStringValue(variantForm.value.variant_name) || null,
    attribute_value_ids: variantForm.value.attribute_value_ids || [],
    sku: getStringValue(variantForm.value.sku),
    image_path: variantImagePath,
    price: variantForm.value.price || 0,
    strike_price: variantForm.value.strike_price || null,
    status: variantForm.value.status || "ACTIVE",
    weight: variantForm.value.weight,
    type_weight: variantForm.value.type_weight,
  };

  try {
    if (editingVariantIndex.value !== null) {
      // Update existing variant
      const variant = variants.value[editingVariantIndex.value];
      if (variant && variant.id) {
        const { data, error } = await updateProductVariant(
          variant.id,
          variantData,
        );
        if (error) {
          toast.error(error.message || "Failed to update variant");
          savingVariant.value = false;
          return;
        }

        // Save store stocks
        if (variantStoreStocks.value.length > 0) {
          for (const storeStock of variantStoreStocks.value) {
            try {
              await createOrUpdateVariantStoreStock(variant.id, {
                store_id: storeStock.store_id,
                qty: storeStock.qty,
                reserved_qty: storeStock.reserved_qty || 0,
              });
            } catch (err) {
              console.error("Error saving store stock:", err);
              toast.warning(
                `Failed to save store stock for ${storeStock.store?.name || "store"}`,
              );
            }
          }
        }

        await loadVariants();

        toast.success("Variant updated successfully");
      } else {
        toast.error("Variant ID not found");
      }
    } else {
      // Create new variant
      const { data, error } = await createProductVariant(variantData);
      if (error) {
        toast.error(error.message || "Failed to create variant");
        savingVariant.value = false;
        return;
      }

      const newVariantId = data?.data?.id;
      if (newVariantId) {
        // Save store stocks
        if (variantStoreStocks.value.length > 0) {
          for (const storeStock of variantStoreStocks.value) {
            try {
              await createOrUpdateVariantStoreStock(newVariantId, {
                store_id: storeStock.store_id,
                qty: storeStock.qty,
                reserved_qty: storeStock.reserved_qty || 0,
              });
            } catch (err) {
              console.error("Error saving store stock:", err);
              toast.warning(
                `Failed to save store stock for ${storeStock.store?.name || "store"}`,
              );
            }
          }
        }

        // Reload variants from backend to ensure we have the latest data
        // This ensures we get complete data including store_stocks and image_path
        await loadVariants();

        toast.success("Variant created successfully");
      } else {
        toast.error("Failed to get variant ID from response");
      }
    }

    // Close modal
    const modalElement = document.getElementById("variantModal");
    if (
      modalElement &&
      (window as any).bootstrap &&
      (window as any).bootstrap.Modal
    ) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }

    handleCancelVariant();
  } catch (err) {
    console.error("Error saving variant:", err);
    toast.error("Failed to save variant");
  } finally {
    savingVariant.value = false;
  }
};

const editVariant = async (index: number) => {
  if (variants.value && variants.value[index]) {
    editingVariantIndex.value = index;
    const variant = variants.value[index];

    if (variant.id) {
      try {
        const { data, error } = await getVariantStoreStocks(variant.id);
        if (!error && data?.success && Array.isArray(data.data)) {
          variantStoreStocks.value = data.data.map((stock: any) => ({
            id: stock.id,
            store_id: stock.store_id,
            qty: stock.qty,
            reserved_qty: stock.reserved_qty || 0,
            store: stock.store,
          }));
        } else {
          variantStoreStocks.value = [];
        }
      } catch (err) {
        console.error("Error loading store stocks:", err);
        variantStoreStocks.value = [];
      }
    } else {
      variantStoreStocks.value = [];
    }

    // Reconstruct selectedAttributeValues from variant options or attribute_value_ids
    // Use options array if available (more reliable as it has attribute_id mapping)
    const selectedAttributeValues: Record<number, number> = {};

    // If variant has options array, use it directly (more reliable)
    if (
      variant.options &&
      Array.isArray(variant.options) &&
      variant.options.length > 0
    ) {
      variant.options.forEach((opt: any) => {
        if (opt.attribute_id && opt.attribute_value_id) {
          // Ensure attribute is in selectedAttributes
          let selectedAttr = selectedAttributes.value.find(
            (sa) => sa.attribute_id === opt.attribute_id,
          );
          if (!selectedAttr) {
            selectedAttributes.value.push({
              attribute_id: opt.attribute_id,
              sort: selectedAttributes.value.length + 1,
              values: [opt.attribute_value_id],
            });
          } else {
            // Add value to selectedAttr.values if not already there
            if (!selectedAttr.values.includes(opt.attribute_value_id)) {
              selectedAttr.values.push(opt.attribute_value_id);
            }
          }

          // Set the selected value for this attribute
          selectedAttributeValues[opt.attribute_id] = opt.attribute_value_id;
        }
      });
    } else {
      // Fallback: use attribute_value_ids and find attributes by searching availableAttributes
      variant.attribute_value_ids?.forEach((valueId) => {
        availableAttributes.value.forEach((attr) => {
          const value = attr.attribute_values?.find((v) => v.id === valueId);
          if (value) {
            let selectedAttr = selectedAttributes.value.find(
              (sa) => sa.attribute_id === attr.id,
            );
            if (!selectedAttr) {
              selectedAttributes.value.push({
                attribute_id: attr.id,
                sort: selectedAttributes.value.length + 1,
                values: [valueId],
              });
            } else {
              if (!selectedAttr.values.includes(valueId)) {
                selectedAttr.values.push(valueId);
              }
            }
            selectedAttributeValues[attr.id] = valueId;
          }
        });
      });
    }

    variantForm.value = {
      selectedAttributeValues,
      attribute_value_ids: variant.attribute_value_ids || [],
      variant_name: variant.variant_name || "",
      sku: variant.sku || "",
      price: variant.price || 0,
      strike_price: variant.strike_price || null,
      image_file: null,
      image_preview: variant.image_path || null,
      image_path: variant.image_path || null,
      status: variant.status || "ACTIVE",
      weight: variant.weight || null,
      type_weight: variant.type_weight || "GRAM",
    };

    // Update variant name and attribute_value_ids after form is populated
    await nextTick();
    updateVariantName();

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

const handleDeleteVariant = async (
  variantId: number | undefined,
  index: number,
) => {
  if (!variantId) {
    // Remove local variant
    variants.value.splice(index, 1);
    return;
  }

  if (!confirm("Are you sure you want to delete this variant?")) return;
  deletingVariantId.value = variantId;
  try {
    const { data, error } = await deleteProductVariant(variantId);
    if (error) {
      alert(error.message || "Failed to delete variant");
      return;
    }
    if (data?.success) {
      await loadVariants();
    }
  } catch (err) {
    alert(err instanceof Error ? err.message : "Failed to delete variant");
  } finally {
    deletingVariantId.value = null;
  }
};

const handleCancelVariant = () => {
  editingVariantIndex.value = null;
  variantForm.value = {
    selectedAttributeValues: {},
    attribute_value_ids: [],
    variant_name: "",
    sku: "",
    price: product.value?.base_price || 0,
    strike_price: product.value?.base_strike_price || null,
    status: "ACTIVE",
    image_file: null,
    image_preview: null,
    image_path: null,
    weight: 0,
    type_weight: "GRAM",
  };
  variantStoreStocks.value = [];
};

// Category handling
const getCategoryName = (categoryId: number) => {
  const category = availableCategories.value.find(
    (cat) => cat.id === categoryId,
  );
  return category?.taxonomy_name || `Category ${categoryId}`;
};

// Store Stock Management Functions
const loadStores = async () => {
  if (stores.value.length > 0) return; // Already loaded

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

const editStoreStock = async (index: number) => {
  await loadStores();
  const storeStock = variantStoreStocks.value[index];
  if (!storeStock) return;

  editingStoreStockIndex.value = index;
  storeStockForm.value = {
    store_id: storeStock.store_id,
    qty: storeStock.qty,
    reserved_qty: storeStock.reserved_qty || 0,
  };

  // Scroll to form
  await nextTick();
  const formElement = document.querySelector(".card.border-primary");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

const deleteStoreStock = async (index: number) => {
  const storeStock = variantStoreStocks.value[index];
  if (!storeStock) return;

  // If variant has id and store stock has id, delete from backend
  if (
    editingVariantIndex.value !== null &&
    variants.value[editingVariantIndex.value]?.id &&
    storeStock.id
  ) {
    try {
      const variantId = variants.value[editingVariantIndex.value].id!;
      const { error } = await deleteVariantStoreStock(
        variantId,
        storeStock.store_id,
      );
      if (error) {
        toast.error(error.message || "Failed to delete store stock");
        return;
      }

      // Reload store stocks from API after delete
      // Add small delay to ensure backend has processed the delete
      await new Promise((resolve) => setTimeout(resolve, 100));

      try {
        const { data: stocksData, error: stocksError } =
          await getVariantStoreStocks(variantId);
        if (
          !stocksError &&
          stocksData?.success &&
          Array.isArray(stocksData.data)
        ) {
          const freshStocks = stocksData.data.map(mapStoreStock);

          // Replace entire array to trigger Vue reactivity
          variantStoreStocks.value.length = 0;
          variantStoreStocks.value.push(...freshStocks);

          // Update variants.value to keep it in sync
          if (
            editingVariantIndex.value !== null &&
            variants.value[editingVariantIndex.value]
          ) {
            variants.value[editingVariantIndex.value] = {
              ...variants.value[editingVariantIndex.value],
              store_stocks: freshStocks,
            };
          }

          await nextTick();
        } else {
          // Fallback: remove from local state
          variantStoreStocks.value.splice(index, 1);

          // Update variants.value to keep it in sync
          if (
            editingVariantIndex.value !== null &&
            variants.value[editingVariantIndex.value]
          ) {
            const updatedStocks = [...variantStoreStocks.value];
            variants.value[editingVariantIndex.value] = {
              ...variants.value[editingVariantIndex.value],
              store_stocks: updatedStocks,
            };
          }
        }
      } catch (reloadErr) {
        console.error("Error reloading store stocks after delete:", reloadErr);
        // Fallback: remove from local state
        variantStoreStocks.value.splice(index, 1);
      }

      toast.success("Store stock deleted successfully");
    } catch (err) {
      console.error("Error deleting store stock:", err);
      toast.error("Failed to delete store stock");
      return;
    }
  } else {
    // New variant (not saved yet), just remove from local state
    variantStoreStocks.value.splice(index, 1);
  }
};

const saveStoreStock = async () => {
  if (!storeStockForm.value.store_id) {
    toast.error("Please select a store");
    return;
  }

  if (storeStockForm.value.qty < 0) {
    toast.error("Stock quantity cannot be negative");
    return;
  }

  if (storeStockForm.value.reserved_qty < 0) {
    toast.error("Reserved quantity cannot be negative");
    return;
  }

  // Check if store already exists (when editing, skip current index)
  const existingIndex = variantStoreStocks.value.findIndex(
    (stock, idx) =>
      stock.store_id === storeStockForm.value.store_id &&
      idx !== editingStoreStockIndex.value,
  );

  if (existingIndex !== -1) {
    toast.error("This store already has stock assigned");
    return;
  }

  const store = stores.value.find(
    (s) => s.id === storeStockForm.value.store_id,
  );
  if (!store) {
    toast.error("Store not found");
    savingStoreStock.value = false;
    return;
  }

  // If variant has id (existing variant), save to backend
  if (
    editingVariantIndex.value !== null &&
    variants.value[editingVariantIndex.value]?.id
  ) {
    savingStoreStock.value = true;
    try {
      const variantId = variants.value[editingVariantIndex.value].id!;
      const { data, error } = await createOrUpdateVariantStoreStock(variantId, {
        store_id: storeStockForm.value.store_id!,
        qty: storeStockForm.value.qty,
        reserved_qty: storeStockForm.value.reserved_qty,
      });

      if (error) {
        toast.error(error.message || "Failed to save store stock");
        savingStoreStock.value = false;
        return;
      }

      // Always reload store stocks from API to get the latest data
      // Add small delay to ensure backend has processed the update
      await new Promise((resolve) => setTimeout(resolve, 100));

      try {
        const { data: stocksData, error: stocksError } =
          await getVariantStoreStocks(variantId);
        if (
          !stocksError &&
          stocksData?.success &&
          Array.isArray(stocksData.data)
        ) {
          // Clear and replace with fresh data from API
          const freshStocks = stocksData.data.map(mapStoreStock);

          // Replace entire array to trigger Vue reactivity
          variantStoreStocks.value.length = 0;
          variantStoreStocks.value.push(...freshStocks);

          // Update variants.value to keep it in sync
          if (
            editingVariantIndex.value !== null &&
            variants.value[editingVariantIndex.value]
          ) {
            variants.value[editingVariantIndex.value] = {
              ...variants.value[editingVariantIndex.value],
              store_stocks: freshStocks,
            };
          }

          // Force Vue reactivity update
          await nextTick();

          toast.success(
            editingStoreStockIndex.value !== null
              ? "Store stock updated successfully"
              : "Store stock added successfully",
          );
        } else {
          // If reload failed, update local state with response data
          updateLocalStoreStockState(data?.data, store);
          await nextTick();
          toast.success(
            editingStoreStockIndex.value !== null
              ? "Store stock updated successfully"
              : "Store stock added successfully",
          );
        }
      } catch (reloadErr) {
        console.error("Error reloading store stocks:", reloadErr);
        // Fallback: update local state with response data
        updateLocalStoreStockState(data?.data, store);
        await nextTick();
        toast.success(
          editingStoreStockIndex.value !== null
            ? "Store stock updated successfully"
            : "Store stock added successfully",
        );
      }

      // Reset form after successful save and reload
      resetStoreStockForm();
    } catch (err) {
      console.error("Error saving store stock:", err);
      toast.error("Failed to save store stock");
      savingStoreStock.value = false;
      return;
    } finally {
      savingStoreStock.value = false;
    }
  } else {
    // New variant (not saved yet), just update local state
    if (editingStoreStockIndex.value !== null) {
      // Update existing
      variantStoreStocks.value[editingStoreStockIndex.value] = {
        ...variantStoreStocks.value[editingStoreStockIndex.value],
        store_id: storeStockForm.value.store_id!,
        qty: storeStockForm.value.qty,
        reserved_qty: storeStockForm.value.reserved_qty,
        store: store,
      };
    } else {
      // Add new
      variantStoreStocks.value.push({
        store_id: storeStockForm.value.store_id!,
        qty: storeStockForm.value.qty,
        reserved_qty: storeStockForm.value.reserved_qty,
        store: store,
      });
    }

    resetStoreStockForm();
  }
};

const resetStoreStockForm = () => {
  storeStockForm.value = {
    store_id: null,
    qty: 0,
    reserved_qty: 0,
  };
  editingStoreStockIndex.value = null;
};

// Helper function to map store stock data
const mapStoreStock = (stock: any) => ({
  id: stock.id,
  store_id: stock.store_id,
  qty: stock.qty,
  reserved_qty: stock.reserved_qty || 0,
  store: stock.store,
});

// Helper function to update local state with response data
const updateLocalStoreStockState = (responseData: any, store: any) => {
  const stockData = {
    id: responseData?.id,
    store_id: storeStockForm.value.store_id!,
    qty: storeStockForm.value.qty,
    reserved_qty: storeStockForm.value.reserved_qty,
    store: responseData?.store || store,
  };

  if (editingStoreStockIndex.value !== null) {
    variantStoreStocks.value[editingStoreStockIndex.value] = {
      ...variantStoreStocks.value[editingStoreStockIndex.value],
      ...stockData,
    };
  } else {
    variantStoreStocks.value.push(stockData);
  }
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

// Brands
const resetNewBrandForm = () => {
  newBrand.value.name = "";
  newBrand.value.description = "";

  showBrandModal.value = false;
  const modalEl = document.getElementById("createBrandModal");
  if (modalEl) {
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
};

const resetInputField = () => {
  newBrand.value.name = "";
  newBrand.value.description = "";
};

const getBrandName = (brandId: number) => {
  const brand = brands.value.find((b: any) => Number(b.id) === brandId);
  return brand?.name || `Brand ${brandId}`;
};

const filteredBrands = computed(() => {
  if (!brandSearchQuery.value.trim()) {
    return brands.value;
  }

  const q = brandSearchQuery.value.toLowerCase();
  return brands.value.filter((b: any) => b.name?.toLowerCase().includes(q));
});

const removeBrand = (brandId: number) => {
  selectedBrandIds.value = selectedBrandIds.value.filter(
    (id) => id !== brandId,
  );
};

const handleAddBrandClick = () => {
  showBrandModal.value = true;
};

const handleCreateBrand = async () => {
  if (!product.value || !newBrand.value.name.trim()) return;

  creatingBrand.value = true;
  try {
    const { data, error } = await createBrand({
      name: newBrand.value.name.trim(),
      description: newBrand.value.description,
      status: "ACTIVE",
    });

    if (error || !data?.success) {
      toast.error("Failed to create brand");
      return;
    }
    await loadBrands();

    resetNewBrandForm();

    toast.success("Brand created");
  } finally {
    creatingBrand.value = false;
  }
};

// Update product
const handleUpdateProduct = async () => {
  if (!product.value) {
    console.warn("Product tidak ada");
    return;
  }

  isLoading.value = true;
  productFormErrors.value = {};

  console.group("🛠 handleUpdateProduct");

  try {
    const { data: updateData, error: updateError } = await updateProduct(
      product.value.id,
      productForm.value,
    );

    if (updateError || !updateData?.success) {
      productFormErrors.value = updateError?.errors || {};
      toast.error(updateError?.message || "Gagal update product");
      return;
    }
    if (pendingImages.value.length > 0) {
      uploadingImages.value = true;

      try {
        for (let i = 0; i < pendingImages.value.length; i++) {
          const img = pendingImages.value[i];

          await uploadProductImage(
            product.value.id,
            img.file,
            (existingImages.value?.length || 0) + i + 1,
          );
        }

        pendingImages.value = [];

        await loadImages();
      } catch (err) {
        console.warn("Upload image gagal", err);
        toast.warning("Beberapa gambar gagal diupload");
      } finally {
        uploadingImages.value = false;
      }
    }
    try {
      const { data: current } = await getProductAttributes(product.value.id);

      const currentMap = new Map(
        (current?.data || []).map((a) => [a.attribute_id, a]),
      );

      // Detach removed attributes
      const toDetach = Array.from(currentMap.keys()).filter(
        (id) =>
          !selectedAttributes.value.some(
            (sa) => sa.attribute_id === Number(id),
          ),
      );

      if (toDetach.length > 0) {
        await Promise.all(
          toDetach.map((id) =>
            detachProductAttributes(product.value.id, Number(id)),
          ),
        );
      }

      // Attach / Update attributes
      if (selectedAttributes.value.length > 0) {
        await attachProductAttributes(
          product.value.id,
          selectedAttributes.value,
        );
      }

      await loadProductAttributes();
    } catch (err) {
      console.warn("Sync attributes gagal", err);
    }

    try {
      const { data: currentCats } = await getProductCategories(
        product.value.id,
      );

      const currentCatIds = new Set(
        (currentCats?.data?.categories || []).map((c) => c.fk_category_id),
      );

      const toAddCats = selectedCategoryIds.value.filter(
        (id) => !currentCatIds.has(id),
      );

      const toRemoveCats = Array.from(currentCatIds).filter(
        (id) => !selectedCategoryIds.value.includes(id),
      );

      if (toAddCats.length > 0) {
        await attachProductCategories(product.value.id, toAddCats);
      }

      if (toRemoveCats.length > 0) {
        await detachProductCategories(product.value.id, toRemoveCats);
      }
    } catch (err) {
      console.warn("Sync categories gagal", err);
    }

    try {
      const { data: currentBrands } = await getProductBrands(product.value.id);

      const currentBrandIds = new Set(
        (currentBrands?.data?.brand_products || []).map((b) =>
          Number(b.fk_brand_id),
        ),
      );

      const toAddBrands = selectedBrandIds.value.filter(
        (id) => !currentBrandIds.has(id),
      );

      const toRemoveBrands = Array.from(currentBrandIds).filter(
        (id) => !selectedBrandIds.value.includes(id),
      );

      if (toAddBrands.length > 0) {
        await attachProductBrands(product.value.id, toAddBrands);
      }

      if (toRemoveBrands.length > 0) {
        await detachProductBrands(product.value.id, toRemoveBrands);
      }
    } catch (err) {
      console.warn("Sync brands gagal", err);
    }

    try {
      const { data: dbVariantsData } = await getProductVariants(
        product.value.id,
      );

      const dbVariants = dbVariantsData?.data || [];

      const localVariantIds = new Set(
        variants.value.map((v) => v.id).filter(Boolean),
      );

      const toDelete = dbVariants.filter((v) => !localVariantIds.has(v.id));

      for (const v of toDelete) {
        await deleteProductVariant(v.id);
      }

      for (const variant of variants.value) {
        const payload = {
          variant_name: variant.variant_name,
          sku: variant.sku,
          price: variant.price,
          strike_price: variant.strike_price,
          discount_percent: variant.discount_percent,
          final_price: variant.final_price,
          stock: variant.stock,
          status: variant.status,
          is_available: variant.is_available,
        };

        let variantId = variant.id;

        if (variantId) {
          await updateProductVariant(variantId, payload);
        } else {
          const { data: newV } = await createProductVariant(payload);
          variantId = newV?.data?.id;
          variant.id = variantId;
        }

        if (variant.store_stocks?.length && variantId) {
          for (const stock of variant.store_stocks) {
            await createOrUpdateVariantStoreStock(variantId, {
              store_id: stock.store_id,
              qty: stock.qty,
              reserved_qty: stock.reserved_qty || 0,
            });
          }
        }
      }

      await loadVariants();
    } catch (err) {
      console.warn("Sync variants gagal", err);
    }

    toast.success("Produk berhasil diperbarui");
    router.push(`/manage-product/${productForm.value.slug}`);
  } catch (err) {
    console.error("Update product gagal", err);
    toast.error("Terjadi kesalahan saat update product");
  } finally {
    isLoading.value = false;
    console.groupEnd();
  }
};

const generateSlug = () => {
  if (!productForm.value.name) return;
  productForm.value.slug = productForm.value.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const getVariantTotalStock = (variant: any) => {
  // If variant has stock accessor (from backend), use it directly
  if (variant.stock !== undefined && variant.stock !== null) {
    return formatNumber(variant.stock);
  }

  const stockRelations =
    variant.stock_relations ||
    variant.stockRelations ||
    variant.store_stocks ||
    [];

  if (!Array.isArray(stockRelations) || stockRelations.length === 0) {
    return formatNumber(0);
  }

  // Calculate available stock (qty - reserved_qty) for each store
  const totalStock = stockRelations.reduce((sum: number, stock: any) => {
    const qty = stock.qty || 0;
    const reservedQty = stock.reserved_qty || 0;
    const availableQty = Math.max(0, qty - reservedQty);
    return sum + availableQty;
  }, 0);

  return formatNumber(totalStock);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

useHead({
  title: product.value
    ? `Edit ${product.value.name} - Karsindo`
    : "Edit Product - Karsindo",
});

onMounted(async () => {
  await loadProduct();
  await Promise.all([
    loadAvailableAttributes(),
    loadProductAttributes(),
    loadAvailableCategories(),
    loadBrands(),
  ]);
});
</script>

<style scoped>
.nav-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
  color: #6c757d;
  cursor: pointer;
}

.nav-tabs .nav-link:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-tabs .nav-link.active {
  border-bottom-color: #0d6efd;
  color: #0d6efd;
  font-weight: 500;
}
</style>
