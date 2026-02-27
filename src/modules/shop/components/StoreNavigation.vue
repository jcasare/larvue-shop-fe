<template>
  <!-- Category bar (horizontal scrollable) -->
  <nav class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="-mb-px flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
        <router-link
          to="/products"
          class="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          :class="{ 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300': !activeCategory }"
        >
          All
        </router-link>
        <router-link
          v-for="cat in categories"
          :key="cat.id || cat.name"
          :to="{ name: 'products', query: { category: cat.slug || cat.name } }"
          class="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          :class="{ 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300': activeCategory === (cat.slug || cat.name) }"
        >
          {{ cat.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  categories: { type: Array, default: () => [] },
});

const route = useRoute();
const activeCategory = computed(() => route.query.category || '');
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
