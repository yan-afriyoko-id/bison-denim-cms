<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
      <div>
        <h5 class="card-title mb-1">Payment Configuration</h5>
      </div>
    </div>

    <form @submit.prevent="$emit('save-settings', 'payment')">
      <div class="alert alert-light border mt-4 mb-4" role="alert">
        Customers can pay using Midtrans and Xendit. You can disable one of
        them, but at least one method must remain active.
      </div>

      <div class="row g-4">
        <div class="col-12">
          <div class="card payment-method-card h-100">
            <div class="card-body">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
              >
                <div>
                  <h6 class="mb-1">Midtrans</h6>
                </div>

                <div class="form-check form-switch m-0">
                  <input
                    id="midtrans-active"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    :checked="formData.midtrans_is_active"
                    @change="$emit('toggle-method', 'midtrans')"
                  />
                  <label class="form-check-label" for="midtrans-active">
                    {{ formData.midtrans_is_active ? "Active" : "Inactive" }}
                  </label>
                </div>
              </div>

              <fieldset :disabled="!formData.midtrans_is_active">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Server Key</label>
                    <input
                      v-model="formData.midtrans_server_key"
                      type="password"
                      class="form-control"
                      placeholder="Mid-server-xxxxx"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Client Key</label>
                    <input
                      v-model="formData.midtrans_client_key"
                      type="text"
                      class="form-control"
                      placeholder="Mid-client-xxxxx"
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label">Production Mode</label>
                    <select
                      v-model="formData.midtrans_is_production"
                      class="form-select"
                    >
                      <option :value="false">Sandbox (Test)</option>
                      <option :value="true">Production (Live)</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card payment-method-card h-100">
            <div class="card-body">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
              >
                <div>
                  <h6 class="mb-1">Xendit</h6>
                </div>

                <div class="form-check form-switch m-0">
                  <input
                    id="xendit-active"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    :checked="formData.xendit_is_active"
                    @change="$emit('toggle-method', 'xendit')"
                  />
                  <label class="form-check-label" for="xendit-active">
                    {{ formData.xendit_is_active ? "Active" : "Inactive" }}
                  </label>
                </div>
              </div>

              <fieldset :disabled="!formData.xendit_is_active">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Secret Key</label>
                    <input
                      v-model="formData.xendit_secret_key"
                      type="password"
                      class="form-control"
                      placeholder="xnd_development_xxxxx"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Public Key</label>
                    <input
                      v-model="formData.xendit_public_key"
                      type="text"
                      class="form-control"
                      placeholder="xnd_public_development_xxxxx"
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label">Production Mode</label>
                    <select
                      v-model="formData.xendit_is_production"
                      class="form-select"
                    >
                      <option :value="false">Development / Test</option>
                      <option :value="true">Production / Live</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex gap-2 mt-4">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? "Saving..." : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formData: any;
  isLoading: boolean;
  isActive?: boolean;
}>();

defineEmits<{
  "save-settings": [category: string];
  "toggle-method": [method: "midtrans" | "xendit"];
}>();
</script>

<style scoped>
.payment-method-card {
  border: 1px solid #e9ecef;
  box-shadow: none;
}
</style>
