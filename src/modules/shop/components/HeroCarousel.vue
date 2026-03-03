<template>
  <div class="relative overflow-hidden bg-ink dark:bg-[#0A0A0A]">
    <!-- Subtle grain overlay -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')"></div>

    <!-- Slides -->
    <div class="relative h-[420px] sm:h-[500px] lg:h-[600px]">
      <TransitionGroup
        enter-active-class="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        enter-from-class="opacity-0 scale-[1.02]"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] absolute inset-0"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-for="(slide, index) in slides"
          v-show="currentSlide === index"
          :key="index"
          class="absolute inset-0"
        >
          <!-- Background image -->
          <img
            :src="slide.image"
            :alt="slide.title"
            class="h-full w-full object-cover"
          />
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20"></div>
          <!-- Content -->
          <div class="absolute inset-0 flex items-center">
            <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="max-w-xl">
                <span
                  v-if="slide.tag"
                  class="inline-flex items-center rounded-full border border-white/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80"
                >
                  {{ slide.tag }}
                </span>
                <h2 class="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display leading-[1.1]">
                  {{ slide.title }}
                </h2>
                <p class="mt-5 text-base leading-relaxed text-white/60 max-w-md">
                  {{ slide.description }}
                </p>
                <div class="mt-8 flex items-center gap-4">
                  <router-link
                    :to="slide.link || '/products'"
                    class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-white/90 active:scale-[0.98]"
                  >
                    {{ slide.cta || 'Shop Now' }}
                    <ArrowRightIcon class="h-4 w-4" />
                  </router-link>
                  <router-link
                    to="/products"
                    class="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Browse all
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Navigation -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 sm:bottom-8">
      <button
        @click="prevSlide"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <ChevronLeftIcon class="h-4 w-4" />
      </button>
      <!-- Progress dots -->
      <div class="flex items-center gap-2">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="relative h-1.5 rounded-full transition-all duration-500"
          :class="currentSlide === index ? 'w-8 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'"
        ></button>
      </div>
      <button
        @click="nextSlide"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <ChevronRightIcon class="h-4 w-4" />
      </button>
    </div>

    <!-- Slide counter -->
    <div class="absolute top-6 right-6 text-xs font-medium text-white/40 sm:top-8 sm:right-8">
      <span class="text-white font-semibold">{{ String(currentSlide + 1).padStart(2, '0') }}</span>
      <span class="mx-1">/</span>
      <span>{{ String(slides.length).padStart(2, '0') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
});

const currentSlide = ref(0);
let interval = null;

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length;
}

function goToSlide(index) {
  currentSlide.value = index;
  resetInterval();
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 6000);
}

onMounted(() => {
  interval = setInterval(nextSlide, 6000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
