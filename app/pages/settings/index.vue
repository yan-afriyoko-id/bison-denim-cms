<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

await navigateTo("/setting", { replace: true });
</script>
