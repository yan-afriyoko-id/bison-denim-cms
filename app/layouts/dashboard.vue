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

/* Main content area - default state (sidebar open) */
#main {
  flex: 1;
  margin-top: 60px;
  margin-left: 300px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

/* When sidebar is closed on desktop */
@media (min-width: 1200px) {
  .dashboard-layout.sidebar-closed #main {
    margin-left: 0;
  }
}

/* ========================================
   RESPONSIVE BREAKPOINTS
   ======================================== */

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  #main {
    margin-left: 80px;
  }
  
  .dashboard-layout.sidebar-closed #main {
    margin-left: 0;
  }
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
  #main {
    margin-left: 0;
  }
}
</style>

<style>
/* Global styles for compatibility with style.css */
/* Using better CSS specificity than !important */
/* Desktop: when toggle-sidebar is active, remove margin-left */
@media (min-width: 1200px) {
  body.toggle-sidebar #main,
  body.toggle-sidebar #footer {
    margin-left: 0;
  }
  
  body.toggle-sidebar .sidebar {
    left: -300px;
  }
}

/* Tablet/Mobile: when toggle-sidebar is active, sidebar appears */
@media (max-width: 1199px) {
  body.toggle-sidebar .sidebar {
    left: 0;
  }
  
  body.toggle-sidebar #main {
    margin-left: 0;
  }
}
</style>
