<template>
  <nav class="border-t border-border dark:border-border">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="-mb-px flex items-center gap-0.5 overflow-x-auto py-2 scrollbar-hide">
        <router-link
          to="/products"
          class="shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200"
          :class="!activeCategory
            ? 'bg-ink text-white dark:bg-white dark:text-[#111]'
            : 'text-ink-light hover:text-ink hover:bg-ink/5 dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5'"
        >
          All
        </router-link>
        <router-link
          v-for="cat in categories"
          :key="cat.id || cat.name"
          :to="{ name: 'products', query: { category: cat.slug || cat.name } }"
          class="shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200"
          :class="activeCategory === (cat.slug || cat.name)
            ? 'bg-ink text-white dark:bg-white dark:text-[#111]'
            : 'text-ink-light hover:text-ink hover:bg-ink/5 dark:text-ink-muted dark:hover:text-white dark:hover:bg-white/5'"
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
