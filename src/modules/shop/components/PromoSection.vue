<template>
  <section class="bg-paper dark:bg-[#0A0A0A]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Bento promo grid -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-5">
        <!-- Promo card 1 -->
        <div class="group relative overflow-hidden rounded-2xl bg-ink dark:bg-[#141414]">
          <img
            :src="promos[0]?.image || 'https://placehold.co/800x400/1A1A1A/666?text=Collection'"
            alt="Promo"
            class="h-64 w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60 sm:h-80"
          />
          <div class="absolute inset-0 flex items-center p-8 sm:p-10">
            <div>
              <span class="inline-flex items-center rounded-full border border-coral/30 bg-coral/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-coral">
                {{ promos[0]?.tag || 'Limited Time' }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-white sm:text-3xl font-display leading-tight">
                {{ promos[0]?.title || 'Seasonal Collection' }}
              </h3>
              <p class="mt-2 max-w-xs text-sm text-white/50 leading-relaxed">
                {{ promos[0]?.description || 'Explore our curated seasonal picks with exclusive discounts.' }}
              </p>
              <router-link
                :to="promos[0]?.link || '/products'"
                class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#111] transition-all hover:bg-white/90 active:scale-[0.98]"
              >
                Shop Collection
                <ArrowRightIcon class="h-3.5 w-3.5" />
              </router-link>
            </div>
          </div>
        </div>

        <!-- Promo card 2 -->
        <div class="group relative overflow-hidden rounded-2xl bg-ink dark:bg-[#141414]">
          <img
            :src="promos[1]?.image || 'https://placehold.co/800x400/1A1A1A/666?text=Best+Sellers'"
            alt="Promo"
            class="h-64 w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60 sm:h-80"
          />
          <div class="absolute inset-0 flex items-center p-8 sm:p-10">
            <div>
              <span class="inline-flex items-center rounded-full border border-forest/30 bg-forest/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-forest-light dark:text-emerald-400">
                {{ promos[1]?.tag || 'Trending' }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-white sm:text-3xl font-display leading-tight">
                {{ promos[1]?.title || 'Best Sellers' }}
              </h3>
              <p class="mt-2 max-w-xs text-sm text-white/50 leading-relaxed">
                {{ promos[1]?.description || 'Shop the most popular products loved by our customers.' }}
              </p>
              <router-link
                :to="promos[1]?.link || '/products?sort=popular'"
                class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#111] transition-all hover:bg-white/90 active:scale-[0.98]"
              >
                View Best Sellers
                <ArrowRightIcon class="h-3.5 w-3.5" />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust badges -->
      <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <div
          v-for="incentive in incentives"
          :key="incentive.title"
          class="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 dark:border-border dark:bg-surface"
        >
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5 dark:bg-white/5">
            <component :is="incentive.icon" class="h-5 w-5 text-ink-light dark:text-ink-muted" />
          </div>
          <div>
            <h4 class="text-sm font-semibold text-ink dark:text-ink">{{ incentive.title }}</h4>
            <p class="text-xs text-ink-muted">{{ incentive.description }}</p>
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
  { title: 'Secure Payment', description: '100% protected', icon: ShieldCheckIcon },
  { title: 'Easy Returns', description: '30-day guarantee', icon: ArrowPathIcon },
];
</script>
