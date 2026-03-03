<template>
  <router-link
    :to="{ name: 'products', query: { category: category.slug || category.name } }"
    class="group relative block overflow-hidden rounded-2xl"
  >
    <div class="aspect-[4/3] overflow-hidden bg-border-light dark:bg-[#1A1A1A]">
      <img
        :src="category.image || `https://placehold.co/600x400/F2EFEA/A09B94?text=${encodeURIComponent(category.name)}`"
        :alt="category.name"
        class="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-110"
      />
    </div>
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-all duration-300 group-hover:from-ink/90">
      <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h3 class="text-base font-bold text-white font-display sm:text-lg">{{ category.name }}</h3>
        <div class="flex items-center justify-between mt-1.5">
          <p v-if="category.product_count" class="text-xs text-white/60">
            {{ category.product_count }} items
          </p>
          <span class="inline-flex items-center gap-1 text-xs font-medium text-white/80 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Explore
            <ArrowRightIcon class="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/20/solid';

defineProps({
  category: { type: Object, required: true },
});
</script>
