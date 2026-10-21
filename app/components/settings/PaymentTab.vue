<template>
  <div class="tab-pane fade" :class="{ 'show active': isActive }">
    <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
      <div>
        <h5 class="card-title mb-1">Payment Configuration</h5>
      </div>
    </div>

    <form @submit.prevent="$emit('save-settings', 'payment')">
      <div class="alert alert-light border mt-4 mb-4" role="alert">
        Customers can pay using Midtrans, Xendit or DOKU. At least one payment method must remain active.
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
                    :disabled="isMidtransLastActive"
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
                    :disabled="isXenditLastActive"
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
                  <div class="col-md-6">
                    <label class="form-label">Callback Verification Token</label>
                    <input
                      v-model="formData.xendit_callback_token"
                      type="password"
                      class="form-control"
                      placeholder="Xendit Dashboard > Settings > Webhooks"
                    />
                    <div class="form-text">
                      Required. Xendit webhooks without this token are rejected.
                    </div>
                  </div>
                  <div class="col-md-6">
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

        <div class="col-12">
          <div class="card payment-method-card h-100">
            <div class="card-body">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
              >
                <div>
                  <h6 class="mb-1">DOKU</h6>
                </div>

                <div class="form-check form-switch m-0">
                  <input
                    id="doku-active"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    :checked="formData.doku_is_active"
                    :disabled="isDokuLastActive"
                    @change="$emit('toggle-method', 'doku')"
                  />
                  <label class="form-check-label" for="doku-active">
                    {{ formData.doku_is_active ? "Active" : "Inactive" }}
                  </label>
                </div>
              </div>

              <fieldset :disabled="!formData.doku_is_active">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Client ID</label>
                    <input
                      v-model="formData.doku_client_id"
                      type="text"
                      class="form-control"
                      placeholder="BRN-xxxx-xxxxxxxxxxxxx"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Secret Key</label>
                    <input
                      v-model="formData.doku_secret_key"
                      type="password"
                      class="form-control"
                      placeholder="SK-xxxxx"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Payment Due (minutes)</label>
                    <input
                      v-model.number="formData.doku_payment_due_minutes"
                      type="number"
                      min="1"
                      max="999999"
                      class="form-control"
                      placeholder="1440"
                    />
                    <div class="form-text">
                      How long the DOKU payment page stays valid. 1440 = 24 hours.
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Production Mode</label>
                    <select
                      v-model="formData.doku_is_production"
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
      </div>

      <div class="d-flex gap-2 mt-4">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading || !hasActivePaymentMethod"
        >
          {{ isLoading ? "Saving..." : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  formData: any;
  isLoading: boolean;
  isActive?: boolean;
}>();

defineEmits<{
  "save-settings": [category: string];
  "toggle-method": [method: "midtrans" | "xendit" | "doku"];
}>();

const paymentMethods = ["midtrans", "xendit", "doku"] as const;

const activePaymentMethods = computed(() =>
  paymentMethods.filter((method) => props.formData[`${method}_is_active`]),
);

const hasActivePaymentMethod = computed(() => {
  return activePaymentMethods.value.length > 0;
});

const isLastActive = (method: (typeof paymentMethods)[number]) =>
  activePaymentMethods.value.length === 1 &&
  activePaymentMethods.value[0] === method;

const isMidtransLastActive = computed(() => isLastActive("midtrans"));

const isXenditLastActive = computed(() => isLastActive("xendit"));

const isDokuLastActive = computed(() => isLastActive("doku"));
</script>

<style scoped>
.alert-light {
  background-color: #f3f4f6 !important;
  color: #374151 !important;
  border-color: #d3d7dd !important;
}
</style>

<style scoped>
.payment-method-card {
  border: 1px solid #e9ecef;
  box-shadow: none;
}

.payment-method-card .card-body {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.form-check-input:not(:disabled),
.form-check-label {
  cursor: pointer;
}

.form-check-input:disabled,
.form-check-label:has(+ .form-check-input:disabled) {
  cursor: not-allowed;
}
</style>
