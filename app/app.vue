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
  --app-text-muted: #4f5b66;
  --app-light-surface: #f3f4f6;
  --app-light-border: #d3d7dd;
  --app-warning-text: #3b2f00;
  --app-info-text: #083344;
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
  background-color: transparent !important;
}

.btn-outline-primary i {
  color: #b7791f !important;
}

.text-muted,
.text-body-secondary,
small.text-muted,
.form-text,
.breadcrumb-item,
.breadcrumb-item a {
  color: var(--app-text-muted) !important;
}

.bg-light,
.card-header.bg-light,
.form-control.bg-light,
.alert-light,
.table-light {
  background-color: var(--app-light-surface) !important;
  color: var(--app-text-black) !important;
}

.bg-light,
.card-header.bg-light,
.form-control.bg-light,
.alert-light {
  border-color: var(--app-light-border) !important;
}

.badge.bg-warning,
.badge.text-bg-warning,
.bg-warning.badge {
  color: var(--app-warning-text) !important;
}

.badge.bg-info,
.badge.text-bg-info,
.bg-info.badge {
  color: var(--app-info-text) !important;
}

.btn-outline-primary:hover,
.btn-outline-primary:focus,
.btn-outline-primary:active {
  color: #b7791f !important;
  background-color: rgba(212, 160, 23, 0.16) !important;
  border-color: #d4a017 !important;
  box-shadow: none !important;
}

.btn-outline-primary:hover i,
.btn-outline-primary:focus i,
.btn-outline-primary:active i {
  color: #b7791f !important;
}

.btn-outline-success {
  color: #198754 !important;
  border-color: #198754 !important;
  background-color: transparent !important;
}

.btn-outline-success i {
  color: #198754 !important;
}

.btn-outline-success:hover,
.btn-outline-success:focus,
.btn-outline-success:active {
  color: #198754 !important;
  background-color: rgba(25, 135, 84, 0.14) !important;
  border-color: #198754 !important;
  box-shadow: none !important;
}

.btn-outline-success:hover i,
.btn-outline-success:focus i,
.btn-outline-success:active i {
  color: #198754 !important;
}

.btn-outline-info {
  color: #0c7489 !important;
  border-color: #0ea5b7 !important;
  background-color: transparent !important;
}

.btn-outline-info i {
  color: #0c7489 !important;
}

.btn-outline-info:hover,
.btn-outline-info:focus,
.btn-outline-info:active {
  color: #0c7489 !important;
  background-color: rgba(14, 165, 183, 0.14) !important;
  border-color: #0ea5b7 !important;
  box-shadow: none !important;
}

.btn-outline-info:hover i,
.btn-outline-info:focus i,
.btn-outline-info:active i {
  color: #0c7489 !important;
}

.btn-outline-danger {
  color: #c2410c !important;
  border-color: #dc3545 !important;
  background-color: transparent !important;
}

.btn-outline-danger i {
  color: #c2410c !important;
}

.btn-outline-danger:hover,
.btn-outline-danger:focus,
.btn-outline-danger:active {
  color: #c2410c !important;
  background-color: rgba(220, 53, 69, 0.14) !important;
  border-color: #dc3545 !important;
  box-shadow: none !important;
}

.btn-outline-danger:hover i,
.btn-outline-danger:focus i,
.btn-outline-danger:active i {
  color: #c2410c !important;
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
