<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Two-column promo -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Promo card 1 -->
        <div class="group relative overflow-hidden rounded-2xl bg-gray-900">
          <img
            :src="promos[0]?.image || 'https://placehold.co/800x400/312e81/a5b4fc?text=Seasonal+Collection'"
            alt="Promo"
            class="h-64 w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 sm:h-80"
          />
          <div class="absolute inset-0 flex items-center p-8">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-indigo-400">
                {{ promos[0]?.tag || 'Limited Time' }}
              </p>
              <h3 class="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {{ promos[0]?.title || 'Seasonal Collection' }}
              </h3>
              <p class="mt-2 max-w-xs text-sm text-gray-300">
                {{ promos[0]?.description || 'Explore our curated seasonal picks with exclusive discounts.' }}
              </p>
              <router-link
                :to="promos[0]?.link || '/products'"
                class="mt-4 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                Shop Collection
                <ArrowRightIcon class="ml-2 h-4 w-4" />
              </router-link>
            </div>
          </div>
        </div>

        <!-- Promo card 2 -->
        <div class="group relative overflow-hidden rounded-2xl bg-gray-900">
          <img
            :src="promos[1]?.image || 'https://placehold.co/800x400/4c1d95/c4b5fd?text=Best+Sellers'"
            alt="Promo"
            class="h-64 w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 sm:h-80"
          />
          <div class="absolute inset-0 flex items-center p-8">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-amber-400">
                {{ promos[1]?.tag || 'Trending' }}
              </p>
              <h3 class="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {{ promos[1]?.title || 'Best Sellers' }}
              </h3>
              <p class="mt-2 max-w-xs text-sm text-gray-300">
                {{ promos[1]?.description || 'Shop the most popular products loved by our customers.' }}
              </p>
              <router-link
                :to="promos[1]?.link || '/products?sort=popular'"
                class="mt-4 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                View Best Sellers
                <ArrowRightIcon class="ml-2 h-4 w-4" />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Three-column incentives -->
      <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          v-for="incentive in incentives"
          :key="incentive.title"
          class="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
            <component :is="incentive.icon" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white">{{ incentive.title }}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ incentive.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/20/solid';
import { TruckIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

defineProps({
  promos: {
    type: Array,
    default: () => [],
  },
});

const incentives = [
  { title: 'Free Shipping', description: 'On orders over $50', icon: TruckIcon },
  { title: 'Secure Payment', description: '100% protected payments', icon: ShieldCheckIcon },
  { title: 'Easy Returns', description: '30-day return policy', icon: ArrowPathIcon },
];
</script>
