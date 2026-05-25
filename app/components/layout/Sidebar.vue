<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <!-- Dashboard -->
      <li class="nav-heading">Manage Control</li>
      <li class="nav-item">
        <NuxtLink
          to="/dashboard"
          class="nav-link"
          :class="{ active: isActive('/dashboard') }"
        >
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </NuxtLink>
      </li>
      <!-- Products -->
      <li v-if="hasPermission('products.read')" class="nav-item">
        <NuxtLink
          to="/manage-product"
          class="nav-link"
          :class="{ active: isActive('/manage-product') }"
        >
          <i class="bi bi-bag"></i>
          <span>Products</span>
        </NuxtLink>
      </li>
      <!-- Category Products (hidden - merged into product search) -->
      <!-- <li v-if="hasPermission('products.read')" class="nav-item">
        <NuxtLink
          to="/manage-category-product"
          class="nav-link"
          :class="{ active: isActive('/manage-category-product') }"
        >
          <i class="bi bi-tag"></i>
          <span>Category Products</span>
        </NuxtLink>
      </li> -->
      <!-- Product Groups -->
      <li v-if="hasPermission('products.read')" class="nav-item">
        <NuxtLink
          to="/manage-product-groups"
          class="nav-link"
          :class="{ active: isActive('/manage-product-groups') }"
        >
          <i class="bi bi-collection"></i>
          <span>Product Groups</span>
        </NuxtLink>
      </li>
      <!-- Attributes -->
      <li v-if="hasPermission('product-attributes.read')" class="nav-item">
        <NuxtLink
          to="/manage-product-attribute"
          class="nav-link"
          :class="{ active: isActive('/manage-product-attribute') }"
        >
          <i class="bi bi-collection"></i>
          <span>Product Attribute</span>
        </NuxtLink>
      </li>
      <!-- Vouchers (hidden) -->
      <!-- <li v-if="hasPermission('vouchers.read')" class="nav-item">
        <NuxtLink
          to="/manage-voucher"
          class="nav-link"
          :class="{ active: isActive('/manage-voucher') }"
        >
          <i class="bi bi-ticket"></i>
          <span>Vouchers</span>
        </NuxtLink>
      </li> -->
      <!-- Orders -->
      <li v-if="hasPermission('orders.read')" class="nav-item">
        <NuxtLink
          to="/manage-order"
          class="nav-link"
          :class="{ active: isActive('/manage-order') }"
        >
          <i class="bi bi-receipt"></i>
          <span>Orders</span>
        </NuxtLink>
      </li>
      <!-- Blog Management (hidden) -->
      <!-- <li v-if="hasPermission('blogs.read')" class="nav-item">
        <NuxtLink
          to="/manage-blog"
          class="nav-link"
          :class="{ active: isActive('/manage-blog') }"
        >
          <i class="bi bi-newspaper"></i>
          <span>Manage Blog</span>
        </NuxtLink>
      </li> -->

      <!-- Blog Categories (hidden) -->
      <!-- <li v-if="hasPermission('blog-categories.read')" class="nav-item">
        <NuxtLink
          to="/manage-blog-categories"
          class="nav-link"
          :class="{ active: isActive('/manage-blog-categories') }"
        >
          <i class="bi bi-tags"></i>
          <span>Blog Categories</span>
        </NuxtLink>
      </li> -->

      <!-- Pages Heading -->
      <li class="nav-heading">Management</li>

      <!-- User Management -->
      <li v-if="hasPermission('users.read')" class="nav-item">
        <NuxtLink
          to="/users"
          class="nav-link"
          :class="{ active: isActive('/users') }"
        >
          <i class="bi bi-people"></i>
          <span>User Management</span>
        </NuxtLink>
      </li>
      <!-- Roles & Permissions (Direct Link) -->
      <li
        v-if="hasPermission('roles.read') || hasPermission('permissions.read')"
        class="nav-item"
      >
        <NuxtLink
          to="/manage-roles-permissions"
          class="nav-link"
          :class="{ active: isActive('/manage-roles-permissions') }"
        >
          <i class="bi bi-shield-lock"></i>
          <span>Roles & Permissions</span>
        </NuxtLink>
      </li>

      <!-- Settings Dropdown -->
      <li class="nav-item">
        <a
          class="nav-link"
          @click.prevent="toggleSettings"
          :class="{ collapsed: !isSettingsOpen }"
          href="#"
        >
          <i class="bi bi-gear"></i>
          <span>Settings</span>
          <i
            class="bi bi-chevron-down ms-auto chevron-icon"
            :class="{ rotated: isSettingsOpen }"
          ></i>
        </a>
        <ul
          id="settings-nav"
          class="nav-content"
          :class="{ show: isSettingsOpen }"
        >
          <li
            v-if="
              hasPermission('stores.read') ||
              hasPermission('brands.read') ||
              hasPermission('configs.read')
            "
          >
            <NuxtLink to="/settings" :class="{ active: isActive('/settings') }">
              <i class="bi bi-circle"></i>
              <span>App Settings</span>
            </NuxtLink>
          </li>
          <!-- <li>
            <NuxtLink to="/settings/notifications">
              <i class="bi bi-circle"></i>
              <span>Notifications</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/settings/payment">
              <i class="bi bi-circle"></i>
              <span>Payment Gateway</span>
            </NuxtLink>
          </li> -->
          <li>
            <NuxtLink to="/profile" :class="{ active: isActive('/profile') }">
              <i class="bi bi-circle"></i>
              <span>Profile</span>
            </NuxtLink>
          </li>
        </ul>
      </li>

      <!-- Profile -->
      <!-- <li class="nav-item">
        <NuxtLink to="/profile" class="nav-link" :class="{ active: isActive('/profile') }">
          <i class="bi bi-person"></i>
          <span>Profile</span>
        </NuxtLink>
      </li> -->
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { usePermission } from "~/composables/usePermission";

const route = useRoute();
const isSettingsOpen = ref(false);
const { hasPermission } = usePermission();

const isActive = (path: string) => {
  // Exact match atau jika path diikuti dengan / (untuk sub-routes)
  return route.path === path || route.path.startsWith(path + "/");
};

const toggleSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value;
};

// Auto-open berdasarkan route
watch(
  () => route.path,
  () => {
    isSettingsOpen.value =
      route.path.startsWith("/settings") || route.path === "/profile";
  },
  { immediate: true },
);
</script>

<style scoped>
.sidebar-nav .nav-link {
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.sidebar-nav .nav-link.active {
  background-color: rgba(65, 84, 241, 0.1);
  border-left: 3px solid #4154f1;
  padding-left: calc(0.625rem - 3px);
  color: #4154f1;
}

.sidebar-nav .nav-link.active i {
  color: #4154f1;
}

.sidebar-nav .nav-link.collapsed {
  color: #012970;
  background: #fff;
}

.sidebar-nav .nav-link.collapsed i {
  color: #899bbd;
}

.sidebar-nav .nav-link:hover {
  color: #4154f1;
  background: #f6f9ff;
}

.sidebar-nav .nav-link:hover i {
  color: #4154f1;
}

.chevron-icon {
  transition: transform 0.3s ease;
  transform-origin: center;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.nav-content {
  padding: 5px 0 0 0;
  margin: 0;
  list-style: none;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}

.nav-content.show {
  max-height: 500px;
}

.nav-content li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-content a {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #012970;
  transition: all 0.3s ease;
  padding: 10px 0 10px 40px;
  text-decoration: none;
  border-radius: 0;
}

.nav-content a i {
  font-size: 6px;
  margin-right: 8px;
  line-height: 0;
  border-radius: 50%;
  background-color: transparent;
  width: 6px;
  height: 6px;
  transition: all 0.3s ease;
}

.nav-content a:hover {
  color: #4154f1;
  background-color: rgba(65, 84, 241, 0.05);
  padding-left: 45px;
}

.nav-content a:hover i {
  background-color: #4154f1;
}

.nav-content a.active {
  color: #4154f1;
  background-color: rgba(65, 84, 241, 0.1);
  border-left: 3px solid #4154f1;
  padding-left: calc(40px - 3px);
  font-weight: 700;
}

.nav-content a.active i {
  background-color: #4154f1;
  width: 8px;
  height: 8px;
}
</style>
