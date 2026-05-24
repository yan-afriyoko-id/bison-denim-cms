<template>
  <div>
    <div class="pagetitle">
      <h1>Application Settings</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/dashboard">Home</NuxtLink>
          </li>
          <li class="breadcrumb-item active">Settings</li>
        </ol>
      </nav>
    </div>

    <section class="section">
      <div class="card">
        <div class="card-body">
          <div class="overflow-auto">
            <ul
              class="nav nav-tabs flex-nowrap"
              id="settingsTabs"
              role="tablist"
            >
              <li
                class="nav-item"
                role="presentation"
                v-for="tab in tabs"
                :key="tab.key"
              >
                <button
                  class="nav-link text-nowrap"
                  :class="{ active: activeTab === tab.key }"
                  @click="activeTab = tab.key"
                  type="button"
                >
                  {{ tab.label }}
                </button>
              </li>
            </ul>
          </div>

          <div class="tab-content">
            <!-- Store Tab -->
            <StoreTab
              v-if="activeTab === 'store' && hasPermission('stores.read')"
              :stores="stores"
              :loading-stores="loadingStores"
              :is-active="activeTab === 'store'"
              @edit-store="handleEditClick"
              @delete-store="handleDeleteClick"
              @load-provinces="loadProvinces"
            />

            <!-- Product Protection Tab -->
            <ProductProtectionTab
              v-if="
                activeTab === 'productProtection' &&
                hasPermission('configs.read')
              "
              :form-data="formData"
              :is-loading="isLoading"
              :is-active="activeTab === 'productProtection'"
              @save-settings="saveSettings"
            />

            <!-- Brand Tab -->
            <BrandTab
              v-if="activeTab === 'brand' && hasPermission('brands.read')"
              :brands="brands"
              :loading-brands="loadingBrands"
              :is-active="activeTab === 'brand'"
              @create-brand="handleCreateBrandClick"
              @edit-brand="handleEditBrandClick"
              @delete-brand="handleDeleteBrandClick"
            />

            <!-- Email Tab -->
            <EmailTab
              v-if="activeTab === 'email' && hasPermission('configs.read')"
              :form-data="formData"
              :is-loading="isLoading"
              :is-active="activeTab === 'email'"
              @save-settings="saveSettings"
            />

            <!-- App Tab -->
            <AppTab
              v-if="activeTab === 'app' && hasPermission('configs.read')"
              :form-data="formData"
              :is-loading="isLoading"
              :app-logo-preview="appLogoPreview"
              :app-favicon-preview="appFaviconPreview"
              :is-active="activeTab === 'app'"
              @save-settings="saveSettings"
              @file-change="onFileChange"
            />

            <!-- Midtrans Tab -->
            <MidtransTab
              v-if="activeTab === 'midtrans' && hasPermission('configs.read')"
              :form-data="formData"
              :is-loading="isLoading"
              :is-active="activeTab === 'midtrans'"
              @save-settings="saveSettings"
            />

            <!-- RajaOngkir Tab -->
            <RajaOngkirTab
              v-if="activeTab === 'rajaongkir' && hasPermission('configs.read')"
              :form-data="formData"
              :is-loading="isLoading"
              :is-active="activeTab === 'rajaongkir'"
              @save-settings="saveSettings"
            />

            <!-- Social Tab -->
            <SocialTab
              v-if="activeTab === 'social' && hasPermission('configs.read')"
              :form-data="formData"
              :is-loading="isLoading"
              :is-active="activeTab === 'social'"
              @save-settings="saveSettings"
            />

            <!-- Notification Tab -->
            <NotificationTab
              v-if="
                activeTab === 'notification' && hasPermission('configs.read')
              "
              :form-data="formData"
              :is-loading="isLoading"
              :is-active="activeTab === 'notification'"
              @save-settings="saveSettings"
            />

            <!-- Point Tab -->
            <PointTab
              v-if="activeTab === 'point' && hasPermission('configs.read')"
              :form-data="formData"
              :is-loading="isLoading"
              :is-active="activeTab === 'point'"
              @save-settings="saveSettings"
            />

            <!-- Top Banner Tab -->
            <TopBannerTab
              v-if="activeTab === 'topbanner' && hasPermission('configs.read')"
              :form-data="formData"
              :is-loading="isLoading"
              :is-active="activeTab === 'topbanner'"
              @save-settings="saveSettings"
            />

            <!-- Main Banner Tab -->
            <MainBannerTab
              v-if="activeTab === 'mainBanner' && hasPermission('configs.read')"
              :is-active="activeTab === 'mainBanner'"
            />

            <!-- Popup Banner Tab -->
            <PopupBannerTab
              v-if="
                activeTab === 'popupBanner' && hasPermission('configs.read')
              "
              :popup-banners="popupBanners"
              :loading-popup-banners="loadingPopupBanners"
              :is-active="activeTab === 'popupBanner'"
              @create-banner="handleCreatePopupBannerClick"
              @edit-banner="handleEditPopupBannerClick"
              @delete-banner="handleDeletePopupBannerClick"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Create Store Modal -->
    <div
      id="createStoreModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="createStoreModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createStoreModalLabel">
              Create New Store
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetStoreForm"
            ></button>
          </div>
          <form @submit.prevent="handleCreateStore">
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label"
                    >Store Name <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="storeForm.name"
                    type="text"
                    required
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.name }"
                    placeholder="Store Name"
                  />
                  <div v-if="storeFormErrors.name" class="invalid-feedback">
                    {{ storeFormErrors.name[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Code</label>
                  <input
                    v-model="storeForm.code"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.code }"
                    placeholder="STORE001"
                  />
                  <div v-if="storeFormErrors.code" class="invalid-feedback">
                    {{ storeFormErrors.code[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input
                    v-model="storeForm.email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.email }"
                    placeholder="store@example.com"
                  />
                  <div v-if="storeFormErrors.email" class="invalid-feedback">
                    {{ storeFormErrors.email[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone</label>
                  <input
                    v-model="storeForm.phone"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.phone }"
                    placeholder="62812345678"
                  />
                  <div v-if="storeFormErrors.phone" class="invalid-feedback">
                    {{ storeFormErrors.phone[0] }}
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label">Address</label>
                  <textarea
                    v-model="storeForm.address"
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.address }"
                    rows="2"
                    placeholder="Full Address"
                  ></textarea>
                  <div v-if="storeFormErrors.address" class="invalid-feedback">
                    {{ storeFormErrors.address[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Province</label>
                  <select
                    v-model="storeForm.selectedProvinceId"
                    @change="onProvinceChange"
                    class="form-select"
                    :disabled="loadingProvinces"
                  >
                    <option :value="null">Pilih Provinsi</option>
                    <option
                      v-for="province in provinces"
                      :key="province.id"
                      :value="province.id"
                    >
                      {{ province.name }}
                    </option>
                  </select>
                  <input v-model="storeForm.province" type="hidden" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">City/Kabupaten</label>
                  <select
                    v-model="storeForm.selectedCityId"
                    @change="onCityChange"
                    class="form-select"
                    :disabled="loadingCities || !storeForm.selectedProvinceId"
                  >
                    <option :value="null">Pilih Kota/Kabupaten</option>
                    <option
                      v-for="city in cities"
                      :key="city.id"
                      :value="city.id"
                    >
                      {{ city.name }}
                    </option>
                  </select>
                  <input v-model="storeForm.city" type="hidden" />
                  <input v-model="storeForm.city_id" type="hidden" />
                  <p v-if="loadingCities" class="text-muted small mt-1 mb-0">
                    Memuat kota...
                  </p>
                  <p
                    v-else-if="!storeForm.selectedProvinceId"
                    class="text-muted small mt-1 mb-0"
                  >
                    Pilih provinsi terlebih dahulu
                  </p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Country</label>
                  <input
                    v-model="storeForm.country"
                    type="text"
                    class="form-control"
                    placeholder="Indonesia"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Postal Code</label>
                  <input
                    v-model="storeForm.postal_code"
                    type="text"
                    class="form-control"
                    placeholder="12345"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Status</label>
                  <select v-model="storeForm.status" class="form-select">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">Description</label>
                  <textarea
                    v-model="storeForm.description"
                    class="form-control"
                    rows="3"
                    placeholder="Store description"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="resetStoreForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isLoading"
              >
                {{ isLoading ? "Creating..." : "Create Store" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Store Modal -->
    <div
      id="editStoreModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="editStoreModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editStoreModalLabel">Edit Store</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetStoreForm"
            ></button>
          </div>
          <form @submit.prevent="handleUpdateStore">
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label"
                    >Store Name <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="storeForm.name"
                    type="text"
                    required
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.name }"
                  />
                  <div v-if="storeFormErrors.name" class="invalid-feedback">
                    {{ storeFormErrors.name[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Code</label>
                  <input
                    v-model="storeForm.code"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.code }"
                  />
                  <div v-if="storeFormErrors.code" class="invalid-feedback">
                    {{ storeFormErrors.code[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input
                    v-model="storeForm.email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.email }"
                  />
                  <div v-if="storeFormErrors.email" class="invalid-feedback">
                    {{ storeFormErrors.email[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone</label>
                  <input
                    v-model="storeForm.phone"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.phone }"
                  />
                  <div v-if="storeFormErrors.phone" class="invalid-feedback">
                    {{ storeFormErrors.phone[0] }}
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label">Address</label>
                  <textarea
                    v-model="storeForm.address"
                    class="form-control"
                    :class="{ 'is-invalid': storeFormErrors.address }"
                    rows="2"
                  ></textarea>
                  <div v-if="storeFormErrors.address" class="invalid-feedback">
                    {{ storeFormErrors.address[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Province</label>
                  <select
                    v-model="storeForm.selectedProvinceId"
                    @change="onProvinceChange"
                    class="form-select"
                    :disabled="loadingProvinces"
                  >
                    <option :value="null">Pilih Provinsi</option>
                    <option
                      v-for="province in provinces"
                      :key="province.id"
                      :value="province.id"
                    >
                      {{ province.name }}
                    </option>
                  </select>
                  <input v-model="storeForm.province" type="hidden" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">City/Kabupaten</label>
                  <select
                    v-model="storeForm.selectedCityId"
                    @change="onCityChange"
                    class="form-select"
                    :disabled="loadingCities || !storeForm.selectedProvinceId"
                  >
                    <option :value="null">Pilih Kota/Kabupaten</option>
                    <option
                      v-for="city in cities"
                      :key="city.id"
                      :value="city.id"
                    >
                      {{ city.name }}
                    </option>
                  </select>
                  <input v-model="storeForm.city" type="hidden" />
                  <input v-model="storeForm.city_id" type="hidden" />
                  <p v-if="loadingCities" class="text-muted small mt-1 mb-0">
                    Memuat kota...
                  </p>
                  <p
                    v-else-if="!storeForm.selectedProvinceId"
                    class="text-muted small mt-1 mb-0"
                  >
                    Pilih provinsi terlebih dahulu
                  </p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Country</label>
                  <input
                    v-model="storeForm.country"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Postal Code</label>
                  <input
                    v-model="storeForm.postal_code"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Status</label>
                  <select v-model="storeForm.status" class="form-select">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">Description</label>
                  <textarea
                    v-model="storeForm.description"
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="resetStoreForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isLoading"
              >
                {{ isLoading ? "Updating..." : "Update Store" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Store Modal -->
    <div
      id="deleteStoreModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="deleteStoreModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteStoreModalLabel">Delete Store</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete
              <strong>{{ storeToDelete?.name }}</strong
              >? This action cannot be undone.
            </p>
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
              @click="handleDeleteStore"
              :disabled="isLoading"
            >
              {{ isLoading ? "Deleting..." : "Delete Store" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Brand Modal -->
    <div
      id="createBrandModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="createBrandModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createBrandModalLabel">
              Create New Brand
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetBrandForm"
            ></button>
          </div>
          <form @submit.prevent="handleCreateBrand">
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-12">
                  <label class="form-label"
                    >Brand Name <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="brandForm.name"
                    type="text"
                    required
                    class="form-control"
                    :class="{ 'is-invalid': brandFormErrors.name }"
                    placeholder="Brand Name"
                  />
                  <div v-if="brandFormErrors.name" class="invalid-feedback">
                    {{ brandFormErrors.name[0] }}
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="form-label"
                    >Brand Slug <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="brandForm.slug"
                    type="text"
                    required
                    class="form-control"
                    :class="{ 'is-invalid': brandFormErrors.slug }"
                    placeholder="Brand Slug"
                  />
                  <div v-if="brandFormErrors.slug" class="invalid-feedback">
                    {{ brandFormErrors.slug[0] }}
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label">Logo</label>
                  <div class="mb-2" v-if="brandLogoPreview">
                    <img
                      :src="brandLogoPreview"
                      alt="Brand Logo Preview"
                      class="img-thumbnail"
                      style="max-height: 100px"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    @change="onBrandLogoChange"
                    class="form-control"
                  />
                  <div class="form-text">
                    Upload brand logo image (max 5MB, formats: jpeg, jpg, png,
                    gif, webp)
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Status</label>
                  <select v-model="brandForm.status" class="form-select">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Order</label>
                  <input
                    v-model.number="brandForm.order"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="0"
                  />
                  <div class="form-text">Lower numbers appear first</div>
                </div>
                <div class="col-12">
                  <label class="form-label">Description</label>
                  <textarea
                    v-model="brandForm.description"
                    class="form-control"
                    rows="3"
                    placeholder="Brand description"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="resetBrandForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isLoading"
              >
                {{ isLoading ? "Creating..." : "Create Brand" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Brand Modal -->
    <div
      id="editBrandModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="editBrandModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editBrandModalLabel">Edit Brand</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetBrandForm"
            ></button>
          </div>
          <form @submit.prevent="handleUpdateBrand">
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-12">
                  <label class="form-label"
                    >Brand Name <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="brandForm.name"
                    type="text"
                    required
                    class="form-control"
                    :class="{ 'is-invalid': brandFormErrors.name }"
                  />
                  <div v-if="brandFormErrors.name" class="invalid-feedback">
                    {{ brandFormErrors.name[0] }}
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="form-label"
                    >Brand Slug <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="brandForm.slug"
                    type="text"
                    required
                    class="form-control"
                    :class="{ 'is-invalid': brandFormErrors.slug }"
                  />
                  <div v-if="brandFormErrors.slug" class="invalid-feedback">
                    {{ brandFormErrors.slug[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Logo</label>
                  <div class="mb-2" v-if="brandLogoPreview">
                    <img
                      :src="brandLogoPreview"
                      alt="Brand Logo Preview"
                      class="img-thumbnail"
                      style="max-height: 100px"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    @change="onBrandLogoChange"
                    class="form-control"
                  />
                  <div class="form-text">
                    Upload brand logo image (max 5MB, formats: jpeg, jpg, png,
                    gif, webp)
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Status</label>
                  <select v-model="brandForm.status" class="form-select">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Order</label>
                  <input
                    v-model.number="brandForm.order"
                    type="number"
                    min="0"
                    class="form-control"
                  />
                  <div class="form-text">Lower numbers appear first</div>
                </div>
                <div class="col-12">
                  <label class="form-label">Description</label>
                  <textarea
                    v-model="brandForm.description"
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="resetBrandForm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isLoading"
              >
                {{ isLoading ? "Updating..." : "Update Brand" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Brand Modal -->
    <div
      id="deleteBrandModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="deleteBrandModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteBrandModalLabel">Delete Brand</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete
              <strong>{{ brandToDelete?.name }}</strong
              >? This action cannot be undone.
            </p>
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
              @click="handleDeleteBrand"
              :disabled="isLoading"
            >
              {{ isLoading ? "Deleting..." : "Delete Brand" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Popup Banner Modal -->
    <div class="modal fade" id="createPopupBannerModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Popup Banner</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="handleCreatePopupBanner">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input
                  v-model="popupBannerForm.title"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  v-model="popupBannerForm.description"
                  class="form-control"
                  rows="3"
                />
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Start Date</label>
                  <input
                    v-model="popupBannerForm.start_date"
                    type="date"
                    class="form-control"
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">End Date</label>
                  <input
                    v-model="popupBannerForm.end_date"
                    type="date"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Url</label>
                <input
                  v-model="popupBannerForm.url"
                  type="text"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Image</label>
                <input
                  type="file"
                  class="form-control"
                  @change="handlePopupBannerImageChange"
                  required
                />
              </div>

              <div v-if="popupBannerImagePreview" class="mb-3">
                <img
                  :src="popupBannerImagePreview"
                  class="img-fluid rounded"
                  style="max-height: 150px"
                />
              </div>

              <div class="text-end">
                <button
                  type="button"
                  class="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isLoading"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Popup Banner Modal -->
    <div class="modal fade" id="editPopupBannerModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Popup Banner</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="handleUpdatePopupBanner">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input
                  v-model="popupBannerForm.title"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  v-model="popupBannerForm.description"
                  class="form-control"
                  rows="3"
                />
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Start Date</label>
                  <input
                    v-model="popupBannerForm.start_date"
                    type="date"
                    class="form-control"
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">End Date</label>
                  <input
                    v-model="popupBannerForm.end_date"
                    type="date"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Url</label>
                <input
                  v-model="popupBannerForm.url"
                  type="text"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Image</label>
                <input
                  type="file"
                  class="form-control"
                  @change="handlePopupBannerImageChange"
                />
              </div>

              <div v-if="popupBannerImagePreview" class="mb-3">
                <img
                  :src="popupBannerImagePreview"
                  class="img-fluid rounded"
                  style="max-height: 150px"
                />
              </div>

              <div class="text-end">
                <button
                  type="button"
                  class="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isLoading"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Popup Banner Modal -->
    <div
      id="deletePopupBannerModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="deletePopupBannerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deletePopupBannerModalLabel">
              Delete Popup Banner
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete
              <strong>{{ popupBannerToDelete?.title }}</strong
              >? This action cannot be undone.
            </p>
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
              @click="handleDeletePopupBanner"
              :disabled="isLoading"
            >
              {{ isLoading ? "Deleting..." : "Delete Popup Banner" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick, onMounted } from "vue";
import { useConfig } from "~/composables/useConfig";
import { useApiBase } from "~/composables/useApiBase";
import { useStoreApi } from "~/composables/useStoreApi";
import { useBrandApi } from "~/composables/useBrandApi";
import { usePermission } from "~/composables/usePermission";
import { useShippingApi } from "~/composables/useShippingApi";
import { usePopupBannerApi } from "~/composables/usePopupBannerApi";
import type { Store } from "~/types/store";
import type { MainBanner } from "~/types/mainBanner";
import type { Brand } from "~/types/brand";
import type { PopupBanner } from "~/types/popupBanner";
import StoreTab from "~/components/settings/StoreTab.vue";
import ProductProtectionTab from "~/components/settings/ProductProtectionTab.vue";
import BrandTab from "~/components/settings/BrandTab.vue";
import EmailTab from "~/components/settings/EmailTab.vue";
import AppTab from "~/components/settings/AppTab.vue";
import MidtransTab from "~/components/settings/MidtransTab.vue";
import RajaOngkirTab from "~/components/settings/RajaOngkirTab.vue";
import TopBannerTab from "~/components/settings/TopBannerTab.vue";
import SocialTab from "~/components/settings/SocialTab.vue";
import NotificationTab from "~/components/settings/NotificationTab.vue";
import PointTab from "~/components/settings/PointTab.vue";
import MainBannerTab from "~/components/settings/MainBannerTab.vue";
import PopupBannerTab from "~/components/settings/PopupBannerTab.vue";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { token } = useApiBase();
const { fetchAllConfigs, updateConfig } = useConfig();
const { getStores, getAllStores, createStore, updateStore, deleteStore } =
  useStoreApi();
const { getAllBrands, createBrand, updateBrand, deleteBrand } = useBrandApi();
const { getProvinces, getCities } = useShippingApi();
const {
  getPopupBanners,
  createPopupBanner,
  updatePopupBanner,
  deletePopupBanner,
} = usePopupBannerApi();
const toast = useToast();
const { hasPermission } = usePermission();

const isLoading = ref(false);
const activeTab = ref("store");
const successMessage = ref("");
const errorMessage = ref("");
const messageTimeout = ref<number | null>(null);

// Store management
const stores = ref<Store[]>([]);
const loadingStores = ref(false);
const storeToEdit = ref<Store | null>(null);
const storeToDelete = ref<Store | null>(null);
const storeForm = ref({
  name: "",
  code: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  country: "",
  postal_code: "",
  status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  description: "",
  city_id: null as number | null,
  selectedProvinceId: null as number | null,
  selectedCityId: null as number | null,
});
const storeFormErrors = ref<Record<string, string[]>>({});

const provinces = ref<any[]>([]);
const cities = ref<any[]>([]);
const loadingProvinces = ref(false);
const loadingCities = ref(false);

// Brand management
const brands = ref<Brand[]>([]);
const loadingBrands = ref(false);
const brandToEdit = ref<Brand | null>(null);
const brandToDelete = ref<Brand | null>(null);
const brandForm = ref({
  name: "",
  slug: "",
  status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  order: 0,
  description: "",
});
const brandFormErrors = ref<Record<string, string[]>>({});
const brandLogoPreview = ref<string>("");
const brandLogoFile = ref<File | null>(null);
const popupBanners = ref<PopupBanner[]>([]);
const loadingPopupBanners = ref(false);
const popupBannerError = ref<string | null>(null);
const popupBannerToEdit = ref<PopupBanner | null>(null);
const popupBannerToDelete = ref<PopupBanner | null>(null);
const popupBannerForm = ref({
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  url: "",
});

const popupBannerImageFile = ref<File | null>(null);
const popupBannerImagePreview = ref<string>("");

const allTabs = [
  { key: "store", label: "Store" },
  { key: "productProtection", label: "Product Protection" },
  { key: "brand", label: "Brand" },
  { key: "email", label: "Email" },
  { key: "app", label: "App" },
  { key: "midtrans", label: "Midtrans" },
  { key: "rajaongkir", label: "RajaOngkir" },
  { key: "social", label: "Social Media" },
  { key: "notification", label: "Notifications" },
  { key: "point", label: "Point System" },
  { key: "topbanner", label: "Top Banner" },
  { key: "mainBanner", label: "Main Banner" },
  { key: "popupBanner", label: "Popup Banner" },
];

const tabs = computed(() => {
  return allTabs.filter((tab) => {
    if (tab.key === "store") {
      return hasPermission("stores.read");
    }
    if (tab.key === "brand") {
      return hasPermission("brands.read");
    }
    if (
      tab.key === "email" ||
      tab.key === "app" ||
      tab.key === "midtrans" ||
      tab.key === "rajaongkir" ||
      tab.key === "social" ||
      tab.key === "notification" ||
      tab.key === "point" ||
      tab.key === "productProtection"
    ) {
      return hasPermission("configs.read");
    }
    if (tab.key === "mainBanner") {
      return hasPermission("configs.read");
    }
    if (tab.key === "popupBanner") {
      return hasPermission("popup-banners.read");
    }
    return true;
  });
});

// Set default active tab based on available tabs
watch(
  tabs,
  (newTabs) => {
    if (
      newTabs.length > 0 &&
      !newTabs.find((tab) => tab.key === activeTab.value)
    ) {
      activeTab.value = newTabs[0].key;
    }
  },
  { immediate: true },
);

// init with some defaults to avoid undefineds in template
const formData = ref<any>({
  // email
  email_driver: "",
  email_host: "",
  email_port: null,
  email_username: "",
  email_password: "",
  email_encryption: "",
  email_from_name: "",
  email_from_address: "",
  // app
  app_name: "",
  app_url: "",
  app_timezone: "",
  app_locale: "",
  app_logo: "",
  app_favicon: "",
  // store (API keys)
  store_logo_website: "",
  store_favicon: "",
  // store info
  store_name: "",
  store_email: "",
  store_phone: "",
  store_address: "",
  store_city: "",
  store_province: "",
  store_country: "",
  store_postal_code: "",
  store_currency: "",
  // midtrans
  midtrans_server_key: "",
  midtrans_client_key: "",
  midtrans_is_production: false,
  // rajaongkir
  rajaongkir_key: "",
  // social
  social_instagram: "",
  social_tiktok: "",
  social_facebook: "",
  social_youtube: "",
  social_pinterest: "",
  social_whatsapp: "",
  // notification
  notification_email_enabled: false,
  notification_sms_enabled: false,
  // point
  point_minimum_usable_points: 250000,
  point_points_per_million: 25000,
  point_million_threshold: 1000000,
  // top banner
  topbanner: "",
  // product protection
  product_protection: 10,
});

// file refs and previews
const appLogoFile = ref<File | null>(null);
const appFaviconFile = ref<File | null>(null);
const appLogoPreview = ref<string>("");
const appFaviconPreview = ref<string>("");

// default dummy image (simple svg data URI)
const defaultImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="100%" height="100%" fill="%23e9ecef"/><text x="50%" y="50%" font-size="12" fill="%23909ca4" dy=".3em" text-anchor="middle">No image</text></svg>';

const clearMessagesAfterTimeout = () => {
  if (messageTimeout.value) {
    clearTimeout(messageTimeout.value);
    messageTimeout.value = null;
  }
  messageTimeout.value = window.setTimeout(() => {
    successMessage.value = "";
    errorMessage.value = "";
    messageTimeout.value = null;
  }, 3000);
};

const loadSettings = async () => {
  try {
    if (!token.value) return;

    const res = await fetchAllConfigs(token.value);

    const configs = Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res)
        ? res
        : [];

    const incoming: Record<string, any> = {};
    const imageUrls: Record<string, string> = {};

    for (const cfg of configs) {
      if (!cfg.key) continue;

      const val = cfg.hasOwnProperty("casted_value")
        ? cfg.casted_value
        : cfg.value;
      if (cfg.type === "boolean") {
        incoming[cfg.key] = val === true || val === "true";
      } else if (cfg.type === "integer") {
        incoming[cfg.key] = val !== null && val !== undefined ? Number(val) : 0;
      } else {
        incoming[cfg.key] = val ?? "";
      }

      if (cfg.value_image) {
        imageUrls[cfg.key] = cfg.value_image;
      }
    }

    formData.value = {
      ...formData.value,
      ...incoming,
    };

    if (incoming.store_logo_website) {
      appLogoPreview.value =
        imageUrls.store_logo_website || String(incoming.store_logo_website);
      formData.value.store_logo_website = incoming.store_logo_website;
      if (!formData.value.app_logo)
        formData.value.app_logo = incoming.store_logo_website;
    } else if (incoming.app_logo) {
      appLogoPreview.value = imageUrls.app_logo || String(incoming.app_logo);
      formData.value.app_logo = incoming.app_logo;
      if (!formData.value.store_logo_website)
        formData.value.store_logo_website = incoming.app_logo;
    }

    if (incoming.store_favicon) {
      appFaviconPreview.value =
        imageUrls.store_favicon || String(incoming.store_favicon);
      formData.value.store_favicon = incoming.store_favicon;
      if (!formData.value.app_favicon)
        formData.value.app_favicon = incoming.store_favicon;
    } else if (incoming.app_favicon) {
      appFaviconPreview.value =
        imageUrls.app_favicon || String(incoming.app_favicon);
      formData.value.app_favicon = incoming.app_favicon;
      if (!formData.value.store_favicon)
        formData.value.store_favicon = incoming.app_favicon;
    }
  } catch (err) {
    errorMessage.value =
      err instanceof Error ? err.message : "Failed to load settings";
    clearMessagesAfterTimeout();
  }
};

function onFileChange(e: Event, type: "logo" | "favicon") {
  const input = e.target as HTMLInputElement;
  if (!input || !input.files || !input.files[0]) return;

  const file = input.files[0];
  if (type === "logo") {
    appLogoFile.value = file;
    appLogoPreview.value = URL.createObjectURL(file);
  } else {
    appFaviconFile.value = file;
    appFaviconPreview.value = URL.createObjectURL(file);
  }
}

const saveSettings = async (category: string) => {
  try {
    isLoading.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    if (!token.value) throw new Error("Token not found");

    // select keys related to this category (prefix match)
    let categoryKeys = Object.keys(formData.value).filter(
      (k) => k.startsWith(category + "_") || k === category,
    );

    // for APP tab also include image keys used by API
    if (category === "app") {
      categoryKeys = Array.from(
        new Set(
          categoryKeys.concat([
            "store_logo_website",
            "store_favicon",
            "app_logo",
            "app_favicon",
          ]),
        ),
      );
    }

    for (const key of categoryKeys) {
      // handle image uploads for API image keys (send FormData)
      if (
        (key === "store_logo_website" || key === "app_logo") &&
        appLogoFile.value
      ) {
        const fd = new FormData();
        fd.append("value", appLogoFile.value);
        await updateConfig(key, fd, token.value);
        continue;
      }
      if (
        (key === "store_favicon" || key === "app_favicon") &&
        appFaviconFile.value
      ) {
        const fd = new FormData();
        fd.append("value", appFaviconFile.value);
        await updateConfig(key, fd, token.value);
        continue;
      }

      let valueToSend: any = formData.value[key];
      if (typeof valueToSend === "boolean") {
        valueToSend = String(valueToSend);
      } else if (typeof valueToSend === "number") {
        valueToSend = String(valueToSend);
      }

      // skip empty image keys to avoid overriding existing URLs
      if (
        (key === "app_logo" ||
          key === "app_favicon" ||
          key === "store_logo_website" ||
          key === "store_favicon") &&
        !valueToSend
      ) {
        continue;
      }

      await updateConfig(key, { value: valueToSend }, token.value);
    }

    successMessage.value = "Setting Updated Successfully";
    toast.success(successMessage.value);
    clearMessagesAfterTimeout();
    await loadSettings();
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : "Failed to save settings";
    errorMessage.value = errorMsg;
    toast.error(errorMsg);
    clearMessagesAfterTimeout();
  } finally {
    isLoading.value = false;
  }
};

const loadStores = async () => {
  loadingStores.value = true;
  try {
    const { data, error } = await getAllStores();
    if (error || !data?.success) {
      console.error("Failed to load stores:", error);
      stores.value = [];
    } else if (data.data) {
      if (Array.isArray(data.data)) {
        stores.value = data.data;
      } else if (data.data.stores) {
        stores.value = data.data.stores;
      }
    }
  } catch (err) {
    console.error("Error loading stores:", err);
    stores.value = [];
  } finally {
    loadingStores.value = false;
  }
};

const resetStoreForm = () => {
  storeForm.value = {
    name: "",
    code: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    description: "",
    city_id: null,
    selectedProvinceId: null,
    selectedCityId: null,
  };
  storeFormErrors.value = {};
  storeToEdit.value = null;
  cities.value = [];
};

const loadProvinces = async () => {
  loadingProvinces.value = true;
  try {
    const { data, error } = await getProvinces();
    if (!error && data?.success && data.data) {
      provinces.value = data.data;
    }
  } catch (err) {
    console.error("Error loading provinces:", err);
  } finally {
    loadingProvinces.value = false;
  }
};

const loadCities = async (provinceId: number) => {
  loadingCities.value = true;
  cities.value = [];
  storeForm.value.selectedCityId = null;
  try {
    const { data, error } = await getCities(provinceId);
    if (!error && data?.success && data.data) {
      cities.value = data.data;
    }
  } catch (err) {
    console.error("Error loading cities:", err);
  } finally {
    loadingCities.value = false;
  }
};

const onProvinceChange = async () => {
  if (storeForm.value.selectedProvinceId) {
    const province = provinces.value.find(
      (p) => p.id === storeForm.value.selectedProvinceId,
    );
    if (province) {
      storeForm.value.province = province.name;
    }
    await loadCities(storeForm.value.selectedProvinceId);
  } else {
    storeForm.value.province = "";
    cities.value = [];
    storeForm.value.selectedCityId = null;
  }
};

const onCityChange = () => {
  if (storeForm.value.selectedCityId) {
    const city = cities.value.find(
      (c) => c.id === storeForm.value.selectedCityId,
    );
    if (city) {
      storeForm.value.city = city.name;
      storeForm.value.city_id = city.id;
    }
  } else {
    storeForm.value.city = "";
    storeForm.value.city_id = null;
  }
};

const findProvinceId = async (provinceName: string): Promise<number | null> => {
  if (!provinceName || provinces.value.length === 0) return null;
  const province = provinces.value.find(
    (p: any) =>
      p.name?.toLowerCase().includes(provinceName.toLowerCase()) ||
      provinceName.toLowerCase().includes(p.name?.toLowerCase() || ""),
  );
  return province ? province.id : null;
};

const findCityId = async (
  cityName: string,
  provinceId: number,
): Promise<number | null> => {
  if (!cityName || !provinceId) return null;
  if (cities.value.length === 0) {
    await loadCities(provinceId);
  }
  const city = cities.value.find((c: any) => {
    const cityNameLower = cityName.toLowerCase();
    const cityNameInData = c.name?.toLowerCase() || "";
    return (
      cityNameLower.includes(cityNameInData) ||
      cityNameInData.includes(cityNameLower) ||
      cityNameLower === cityNameInData
    );
  });
  return city ? city.id : null;
};

const handleEditClick = async (store: Store) => {
  storeToEdit.value = store;

  await loadProvinces();

  let provinceId: number | null = null;
  if (store.province) {
    provinceId = await findProvinceId(store.province);
  }

  if (provinceId) {
    storeForm.value.selectedProvinceId = provinceId;
    await loadCities(provinceId);

    if ((store as any).city_id) {
      storeForm.value.selectedCityId = (store as any).city_id;
      storeForm.value.city_id = (store as any).city_id;
    } else if (store.city) {
      const cityId = await findCityId(store.city, provinceId);
      if (cityId) {
        storeForm.value.selectedCityId = cityId;
        storeForm.value.city_id = cityId;
      }
    }
  }

  storeForm.value = {
    ...storeForm.value,
    name: store.name || "",
    code: store.code || "",
    email: store.email || "",
    phone: store.phone || "",
    address: store.address || "",
    city: store.city || "",
    province: store.province || "",
    country: store.country || "",
    postal_code: store.postal_code || "",
    status: (store.status || "ACTIVE") as "ACTIVE" | "INACTIVE",
    description: store.description || "",
    city_id: (store as any).city_id || null,
  };
  await nextTick();
  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("editStoreModal"),
  );
  modal.show();
};

const handleDeleteClick = async (store: Store) => {
  storeToDelete.value = store;
  await nextTick();
  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("deleteStoreModal"),
  );
  modal.show();
};

const handleCreateStore = async () => {
  try {
    isLoading.value = true;
    storeFormErrors.value = {};
    const { data, error } = await createStore(storeForm.value);
    if (error) {
      if (error.errors) {
        storeFormErrors.value = error.errors;
      } else {
        toast.error(error.message || "Failed to create store");
      }
      return;
    }
    if (data?.success) {
      toast.success("Store created successfully");
      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("createStoreModal"),
      );
      modal?.hide();
      resetStoreForm();
      await loadStores();
    }
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to create store");
  } finally {
    isLoading.value = false;
  }
};

const handleUpdateStore = async () => {
  if (!storeToEdit.value) return;
  try {
    isLoading.value = true;
    storeFormErrors.value = {};
    const { data, error } = await updateStore(
      storeToEdit.value.id,
      storeForm.value,
    );
    if (error) {
      if (error.errors) {
        storeFormErrors.value = error.errors;
      } else {
        toast.error(error.message || "Failed to update store");
      }
      return;
    }
    if (data?.success) {
      toast.success("Store updated successfully");
      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("editStoreModal"),
      );
      modal?.hide();
      resetStoreForm();
      await loadStores();
    }
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to update store");
  } finally {
    isLoading.value = false;
  }
};

const handleDeleteStore = async () => {
  if (!storeToDelete.value) return;
  try {
    isLoading.value = true;
    const { data, error } = await deleteStore(storeToDelete.value.id);
    if (error) {
      toast.error(error.message || "Failed to delete store");
      return;
    }
    if (data?.success) {
      toast.success("Store deleted successfully");
      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("deleteStoreModal"),
      );
      modal?.hide();
      storeToDelete.value = null;
      await loadStores();
    }
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to delete store");
  } finally {
    isLoading.value = false;
  }
};

const loadBrands = async () => {
  loadingBrands.value = true;
  try {
    const { data, error } = await getAllBrands();
    if (error || !data?.success) {
      console.error("Failed to load brands:", error);
      brands.value = [];
    } else if (data.data) {
      if (Array.isArray(data.data.brands)) {
        brands.value = data.data.brands;
      }
    }
  } catch (err) {
    console.error("Error loading brands:", err);
    brands.value = [];
  } finally {
    loadingBrands.value = false;
  }
};

const resetBrandForm = () => {
  brandForm.value = {
    name: "",
    slug: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    order: 0,
    description: "",
  };
  brandFormErrors.value = {};
  brandToEdit.value = null;
  brandLogoPreview.value = "";
  brandLogoFile.value = null;
};

const handleCreateBrandClick = () => {
  resetBrandForm();
  const modalEl = document.getElementById("createBrandModal");
  if (modalEl) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
};

const handleEditBrandClick = async (brand: Brand) => {
  brandToEdit.value = brand;
  brandForm.value = {
    name: brand.name || "",
    slug: brand.slug || "",
    status: (brand.status as "ACTIVE" | "INACTIVE") || "ACTIVE",
    order: brand.order || 0,
    description: brand.description || "",
  };
  // Set preview to existing logo if available
  brandLogoPreview.value = brand.logo || "";
  brandLogoFile.value = null; // Reset file input
  await nextTick();
  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("editBrandModal"),
  );
  modal.show();
};

const handleDeleteBrandClick = async (brand: Brand) => {
  brandToDelete.value = brand;
  await nextTick();
  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("deleteBrandModal"),
  );
  modal.show();
};

const handleCreateBrand = async () => {
  try {
    isLoading.value = true;
    brandFormErrors.value = {};

    // Always use FormData (logo is optional)
    const formData = new FormData();
    formData.append("name", brandForm.value.name);
    formData.append("slug", brandForm.value.slug);
    const statusValue = brandForm.value.status || "ACTIVE";
    formData.append("status", String(statusValue));
    formData.append("order", String(brandForm.value.order));
    if (brandForm.value.description) {
      formData.append("description", brandForm.value.description);
    }
    if (brandLogoFile.value) {
      formData.append("logo", brandLogoFile.value);
    }

    const { data, error } = await createBrand(formData);
    if (error) {
      if (error.errors) {
        brandFormErrors.value = error.errors;
      } else {
        toast.error(error.message || "Failed to create brand");
      }
      return;
    }
    if (data?.success) {
      toast.success("Brand created successfully");
      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("createBrandModal"),
      );
      modal?.hide();
      resetBrandForm();
      await loadBrands();
    }
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to create brand");
  } finally {
    isLoading.value = false;
  }
};

const handleUpdateBrand = async () => {
  if (!brandToEdit.value) return;
  try {
    isLoading.value = true;
    brandFormErrors.value = {};

    // Always use FormData (logo is optional - if not provided, existing logo is kept)
    // Send all fields like store does (store sends storeForm.value directly)
    const formData = new FormData();
    // Always send all fields (same pattern as store - store sends all fields in storeForm.value)
    formData.append("name", brandForm.value.name || "");
    formData.append("slug", brandForm.value.slug || "");
    formData.append("status", brandForm.value.status || "ACTIVE");
    formData.append("order", String(brandForm.value.order || 0));
    formData.append("description", brandForm.value.description || "");
    // Only append logo if a new file is selected
    if (brandLogoFile.value) {
      formData.append("logo", brandLogoFile.value);
    }

    const { data, error } = await updateBrand(brandToEdit.value.id, formData);
    if (error) {
      if (error.errors) {
        brandFormErrors.value = error.errors;
      } else {
        toast.error(error.message || "Failed to update brand");
      }
      return;
    }
    if (data?.success) {
      toast.success("Brand updated successfully");
      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("editBrandModal"),
      );
      modal?.hide();
      resetBrandForm();
      await loadBrands();
    }
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to update brand");
  } finally {
    isLoading.value = false;
  }
};

const handleDeleteBrand = async () => {
  if (!brandToDelete.value) return;
  try {
    isLoading.value = true;
    const { data, error } = await deleteBrand(brandToDelete.value.id);
    if (error) {
      toast.error(error.message || "Failed to delete brand");
      return;
    }
    if (data?.success) {
      toast.success("Brand deleted successfully");
      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("deleteBrandModal"),
      );
      modal?.hide();
      brandToDelete.value = null;
      await loadBrands();
    }
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to delete brand");
  } finally {
    isLoading.value = false;
  }
};

const onBrandLogoChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input || !input.files || !input.files[0]) return;

  const file = input.files[0];
  brandLogoFile.value = file;
  brandLogoPreview.value = URL.createObjectURL(file);
};

const resetPopupBannerForm = () => {
  popupBannerToEdit.value = null;
  popupBannerForm.value = {
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    url: "",
  };
  popupBannerImageFile.value = null;
  popupBannerImagePreview.value = "";
};

const loadPopupBanners = async () => {
  loadingPopupBanners.value = true;
  popupBannerError.value = null;

  const { data, error } = await getPopupBanners();

  if (error) {
    popupBannerError.value = error.message;
  } else if (data) {
    popupBanners.value = data.data.popup_banners || [];
  }

  loadingPopupBanners.value = false;
};

const handleCreatePopupBannerClick = async () => {
  resetPopupBannerForm();
  await nextTick();

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("createPopupBannerModal"),
  );

  modal.show();
};

const handleEditPopupBannerClick = async (banner: PopupBanner) => {
  popupBannerToEdit.value = banner;

  popupBannerForm.value = {
    title: banner.title || "",
    description: banner.description || "",
    start_date: banner.start_date || "",
    end_date: banner.end_date || "",
    url: banner.url || "",
  };
  popupBannerImagePreview.value = banner.image || "";
  popupBannerImageFile.value = null;

  await nextTick();

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("editPopupBannerModal"),
  );

  modal.show();
};

const handleDeletePopupBannerClick = async (banner: PopupBanner) => {
  popupBannerToDelete.value = banner;
  await nextTick();
  const modal = new (window as any).bootstrap.Modal(
    document.getElementById("deletePopupBannerModal"),
  );
  modal.show();
};

const handleCreatePopupBanner = async () => {
  try {
    isLoading.value = true;

    const formData = new FormData();

    formData.append("title", popupBannerForm.value.title);
    formData.append("description", popupBannerForm.value.description || "");
    formData.append("start_date", popupBannerForm.value.start_date || "");
    formData.append("end_date", popupBannerForm.value.end_date || "");
    formData.append("url", popupBannerForm.value.url || "");

    if (popupBannerImageFile.value) {
      formData.append("image", popupBannerImageFile.value);
    }

    const { data, error } = await createPopupBanner(formData);

    if (error) {
      toast.error(error.message || "Failed to create popup banner");
      return;
    }

    console.log("Create popup banner response:", data);

    if (data?.success) {
      toast.success("Popup banner created successfully");

      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("createPopupBannerModal"),
      );
      modal?.hide();

      await loadPopupBanners();
    }
  } catch (err) {
    toast.error(
      err instanceof Error ? err.message : "Failed to create popup banner",
    );
  } finally {
    isLoading.value = false;
  }
};

const handleUpdatePopupBanner = async () => {
  if (!popupBannerToEdit.value) return;

  try {
    isLoading.value = true;

    const formData = new FormData();

    formData.append("title", popupBannerForm.value.title);
    formData.append("description", popupBannerForm.value.description || "");
    formData.append("start_date", popupBannerForm.value.start_date || "");
    formData.append("end_date", popupBannerForm.value.end_date || "");
    formData.append("url", popupBannerForm.value.url || "");

    if (popupBannerImageFile.value) {
      formData.append("image", popupBannerImageFile.value);
    }

    formData.append("_method", "PUT");

    const { data, error } = await updatePopupBanner(
      popupBannerToEdit.value.id,
      formData,
    );

    if (error) {
      toast.error(error.message || "Failed to update popup banner");
      return;
    }

    if (data?.success) {
      toast.success("Popup banner updated successfully");

      const modal = (window as any).bootstrap.Modal.getInstance(
        document.getElementById("editPopupBannerModal"),
      );
      modal?.hide();

      popupBannerToEdit.value = null;
      await loadPopupBanners();
    }
  } catch (err) {
    toast.error(
      err instanceof Error ? err.message : "Failed to update popup banner",
    );
  } finally {
    isLoading.value = false;
  }
};

const handleDeletePopupBanner = async () => {
  if (!popupBannerToDelete.value) return;

  try {
    isLoading.value = true;

    const { error } = await deletePopupBanner(popupBannerToDelete.value.id);

    if (error) {
      toast.error(error.message || "Failed to delete popup banner");
      return;
    }

    toast.success("Popup banner deleted successfully");

    const modal = (window as any).bootstrap.Modal.getInstance(
      document.getElementById("deletePopupBannerModal"),
    );
    modal?.hide();

    popupBannerToDelete.value = null;
    await loadPopupBanners();
  } catch (err) {
    toast.error(
      err instanceof Error ? err.message : "Failed to delete popup banner",
    );
  } finally {
    isLoading.value = false;
  }
};

const handlePopupBannerImageChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input?.files?.[0]) return;

  popupBannerImageFile.value = input.files[0];
  popupBannerImagePreview.value = URL.createObjectURL(input.files[0]);
};

watch(
  () => activeTab.value,
  async (newTab) => {
    if (newTab === "store") {
      await loadProvinces();
    }
    if (newTab === "popupBanner") {
      await loadPopupBanners();
    }
  },
  { immediate: true },
);

onMounted(async () => {
  await loadSettings();
  if (hasPermission("stores.read")) {
    await loadStores();
  }
  if (hasPermission("brands.read")) {
    await loadBrands();
  }
});
</script>

<style scoped>
.nav-tabs .nav-link.active {
  font-weight: 600;
  border-color: #0d6efd #0d6efd #fff;
}
.img-thumbnail {
  object-fit: contain;
  border: 1px solid #e9ecef;
  padding: 4px;
  background: #fff;
}
</style>
