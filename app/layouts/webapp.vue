<template>
  <div id="webapp-layout" class="min-h-screen bg-white font-poppins">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String
})

// Load Bootstrap Icons CSS for webapp layout
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/assets/vendor/bootstrap-icons/bootstrap-icons.css'
    }
  ]
})
</script>

<style scoped>
#webapp-layout {
  width: 100%;
  min-height: 100vh;
}
</style>

