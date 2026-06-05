<template>
  <div class="card info-card stats-card">
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <div class="ps-0">
          <h6 class="card-title">{{ title }}</h6>
          <div class="ps-0">
            <span class="text-muted small">{{ subtitle }}</span>
            <span class="badge bg-light text-dark ms-2">{{ change }}</span>
          </div>
          <div class="pt-2">
            <h3 class="card-value">{{ value }}</h3>
            <p class="small text-muted mb-0">
              <span :class="['trend-badge', trendClass]">
                <i :class="['bi', trendIcon]"></i>
                {{ trend }}
              </span>
              {{ description }}
            </p>
          </div>
        </div>
        <div class="icon-container">
          <i :class="['bi', `bi-${icon}`]" :style="{ color: iconColor }"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  value: string | number
  icon: string
  trend?: string
  trendClass?: string
  description?: string
  change?: string
  iconColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  trend: '+0%',
  trendClass: 'text-success',
  description: 'update',
  change: 'last month',
  iconColor: '#4154f1'
})

const trendIcon = computed(() => {
  if (props.trendClass?.includes('success')) return 'graph-up'
  if (props.trendClass?.includes('danger')) return 'graph-down'
  return 'dash'
})
</script>

<style scoped>
.stats-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stats-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0.5rem 0;
}

.icon-container {
  font-size: 3rem;
  opacity: 0.15;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trend-badge {
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.05);
}

.trend-badge i {
  font-size: 0.65rem;
}

.text-muted {
  color: #5f6b7a !important;
  font-size: 0.875rem;
}
</style>

