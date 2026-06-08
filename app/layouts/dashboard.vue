<template>
  <div id="app" class="dashboard-layout" :class="{ 'sidebar-closed': !isSidebarOpen }">
    <LayoutHeader />
    <LayoutSidebar />
    <main id="main" class="main">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String
})

// Sidebar state management
const { isOpen: isSidebarOpen } = useSidebar()
</script>

<style scoped>
/* ========================================
   DASHBOARD LAYOUT
   ======================================== */
.dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Mobile (<768px): sidebar is overlay, content stays full-width */
#main {
  flex: 1;
  margin-top: 60px;
  margin-left: 0;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

/* Tablet & up (≥768px): sidebar pushes content */
@media (min-width: 768px) {
  #main {
    margin-left: 300px;
  }

  .dashboard-layout.sidebar-closed #main {
    margin-left: 0;
  }
}
</style>

<style>
/* Sidebar position — controlled by body.toggle-sidebar (from useSidebar) */

/* Desktop: sidebar slides out when closed */
@media (min-width: 1200px) {
  body.toggle-sidebar .sidebar {
    left: -300px;
  }
}

/* Tablet/Mobile: sidebar slides in when opened */
@media (max-width: 1199px) {
  body.toggle-sidebar .sidebar {
    left: 0;
  }
  /* Margin is driven by .sidebar-closed Vue class, NOT toggle-sidebar body class,
     so we do NOT set margin-left here to avoid overriding the scoped rule. */
}
</style>
