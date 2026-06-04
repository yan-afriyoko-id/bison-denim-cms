<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
:root {
  --app-text-black: #111111;
}

.text-primary,
.text-primary:hover,
.text-primary:focus,
.link-primary,
.link-primary:hover,
.link-primary:focus,
a.text-primary,
a.text-primary:hover,
a.text-primary:focus,
.page-link,
.page-link:hover,
.page-link:focus,
.nav-tabs .nav-link.active,
.nav-pills .nav-link.active,
.accordion-button:not(.collapsed) {
  color: var(--app-text-black) !important;
}

.btn-outline-primary {
  color: #b7791f !important;
  border-color: #d4a017 !important;
}

.btn-outline-primary i {
  color: inherit !important;
}

.btn-outline-primary:hover,
.btn-outline-primary:focus,
.btn-outline-primary:active {
  color: #ffffff !important;
  background-color: #d4a017 !important;
  border-color: #d4a017 !important;
  box-shadow: none !important;
}

.btn.action-btn-dark,
.btn-primary.action-btn-dark,
.btn-success.action-btn-dark,
a.action-btn-dark.btn,
button.action-btn-dark.btn {
  color: #fff !important;
  background-color: #000 !important;
  border-color: #000 !important;
}

.btn.action-btn-dark:hover,
.btn.action-btn-dark:focus,
.btn.action-btn-dark:active,
.btn-primary.action-btn-dark:hover,
.btn-primary.action-btn-dark:focus,
.btn-primary.action-btn-dark:active,
.btn-success.action-btn-dark:hover,
.btn-success.action-btn-dark:focus,
.btn-success.action-btn-dark:active,
a.action-btn-dark.btn:hover,
a.action-btn-dark.btn:focus,
button.action-btn-dark.btn:hover,
button.action-btn-dark.btn:focus {
  color: #fff !important;
  background-color: #1f1f1f !important;
  border-color: #1f1f1f !important;
  box-shadow: none !important;
}

.btn.action-btn-dark:disabled,
.btn-primary.action-btn-dark:disabled,
.btn-success.action-btn-dark:disabled,
.btn.action-btn-dark.disabled,
a.action-btn-dark.btn.disabled {
  color: #fff !important;
  background-color: #4b4b4b !important;
  border-color: #4b4b4b !important;
  opacity: 1 !important;
}

.page-link.action-btn-dark {
  color: #fff !important;
  background-color: #000 !important;
  border-color: #000 !important;
}

.page-link.action-btn-dark:hover,
.page-link.action-btn-dark:focus,
.page-link.action-btn-dark:active {
  color: #fff !important;
  background-color: #1f1f1f !important;
  border-color: #1f1f1f !important;
  box-shadow: none !important;
}

.page-item.disabled .page-link.action-btn-dark {
  color: #fff !important;
  background-color: #4b4b4b !important;
  border-color: #4b4b4b !important;
  opacity: 1 !important;
}

.spinner-border,
.spinner-grow,
.spinner-border.text-primary,
.spinner-grow.text-primary {
  color: #000 !important;
}

.form-check-input:checked {
  background-color: #000 !important;
  border-color: #000 !important;
}

.form-check-input:focus {
  border-color: #000 !important;
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.15) !important;
}

.form-switch .form-check-input:checked {
  background-color: #000 !important;
  border-color: #000 !important;
}

.form-control:focus,
.form-select:focus,
.form-control-lg:focus,
.form-control-sm:focus,
textarea.form-control:focus,
input.form-control:focus,
select.form-select:focus {
  border-color: #000 !important;
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.15) !important;
}

.input-group:focus-within .input-group-text {
  border-color: #000 !important;
}
</style>
