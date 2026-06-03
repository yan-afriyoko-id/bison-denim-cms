<template>
  <div class="card info-card" :class="cardClass">
    <div class="filter">
      <a class="icon" href="#" data-bs-toggle="dropdown">
        <i class="bi bi-three-dots"></i>
      </a>
      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
        <li class="dropdown-header text-start">
          <h6>Filter</h6>
        </li>
        <li><a class="dropdown-item" href="#">Today</a></li>
        <li><a class="dropdown-item" href="#">This Month</a></li>
        <li><a class="dropdown-item" href="#">This Year</a></li>
      </ul>
    </div>

    <div class="card-body">
      <h5 class="card-title">{{ title }} <span>| {{ subtitle }}</span></h5>

      <div class="d-flex align-items-center">
        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
          <i :class="['bi', icon]"></i>
        </div>
        <div class="ps-3">
          <h6>{{ value }}</h6>
          <span v-if="trend" :class="['text-success', 'small', 'pt-1', 'fw-bold', trendClass]">{{ trend }}</span>
          <span v-if="description" class="text-muted small pt-2 ps-1">{{ description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  value: string
  icon: string
  trend?: string
  trendClass?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  trendClass: 'text-success'
})

// Determine card class based on title
const cardClass = computed(() => {
  const titleLower = props.title.toLowerCase()
  if (titleLower.includes('sales')) return 'sales-card'
  if (titleLower.includes('revenue')) return 'revenue-card'
  if (titleLower.includes('customer')) return 'customers-card'
  return ''
})
</script>

<style scoped>
.info-card,
.info-card .card-title,
.info-card .card-title span,
.info-card .card-body,
.info-card .card-body h6,
.info-card .card-body span,
.info-card .dropdown-header h6,
.info-card .dropdown-item,
.info-card .icon,
.info-card .icon i {
  color: #000 !important;
}

.info-card .text-muted {
  color: #000 !important;
}
</style>
