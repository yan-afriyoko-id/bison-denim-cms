<template>
  <NuxtLink
    :to="`/blog/${getSlug(blog)}`"
    class="bg-white overflow-hidden transition hover:cursor-pointer"
  >
    <div 
      class="overflow-hidden bg-[#F8F8F8] rounded-lg"
      :class="size === 'small' ? 'h-[213px]' : 'h-[270px]'"
    >
      <NuxtImg
        v-if="getCoverUrl(blog)"
        :src="getCoverUrl(blog)"
        :alt="getTitle(blog)"
        :width="size === 'small' ? 262 : 332"
        :height="size === 'small' ? 213 : 270"
        class="w-full h-full object-cover"
        fit="cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-[#F8F8F8]">
        
      </div>
    </div>
    <div>
      <h3
        :class="[
          'font-medium text-[#1A1919] my-3 line-clamp-2',
          size === 'small' ? 'text-lg' : 'text-xl',
        ]"
      >
        {{ getTitle(blog) }}
      </h3>
      <p class="text-[#5f6368]">
        {{ formatDate(blog?.created_at) }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatBlogDate } from '~/utils/blogHelpers'
import type { Blog } from '~/types/blog'

withDefaults(
  defineProps<{
    blog: Blog | any;
    size?: "small" | "large";
  }>(),
  {
    size: "large",
  }
);

const formatDate = (date: string | null | undefined) => {
  return formatBlogDate(date);
};

// Get cover URL with fallback
const getCoverUrl = (blog: Blog | any) => {
  return blog?.cover_url || blog?.coverUrl || blog?.featured_image || blog?.featuredImage || null;
};

// Get title with fallback
const getTitle = (blog: Blog | any) => {
  return blog?.title || 'Untitled Blog';
};

// Get slug with fallback
const getSlug = (blog: Blog | any) => {
  return blog?.slug || '';
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

