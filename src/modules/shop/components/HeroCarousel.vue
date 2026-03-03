<template>
  <div class="relative overflow-hidden bg-[#0e0e0e]">
    <!-- Slides -->
    <div class="relative h-[480px] sm:h-[540px] lg:h-[620px]">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <!-- Background image with Ken Burns -->
        <div class="absolute inset-0 overflow-hidden">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="h-full w-full object-cover will-change-transform"
            :class="currentSlide === index ? 'animate-ken-burns' : ''"
          />
        </div>

        <!-- Multi-layer gradient overlay for depth -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/70 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]/20"></div>
        <div class="absolute inset-0 bg-[#0e0e0e]/10"></div>

        <!-- Grain texture -->
        <div class="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')"></div>
      </div>

      <!-- Content layer — always on top -->
      <div class="absolute inset-0 z-20 flex items-center">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left: Text content -->
            <div class="max-w-lg">
              <!-- Tag -->
              <div
                class="overflow-hidden"
                :key="'tag-' + currentSlide"
              >
                <span
                  v-if="activeSlide.tag"
                  class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm hero-stagger-1"
                >
                  <span class="h-1 w-1 rounded-full bg-coral animate-pulse"></span>
                  {{ activeSlide.tag }}
                </span>
              </div>

              <!-- Title — split into lines for staggered animation -->
              <h2
                class="mt-5 font-display font-bold tracking-tight text-white leading-[1.05] hero-stagger-2"
                :key="'title-' + currentSlide"
              >
                <span class="block text-4xl sm:text-5xl lg:text-[3.5rem]">{{ titleFirstLine }}</span>
                <span v-if="titleSecondLine" class="block text-4xl sm:text-5xl lg:text-[3.5rem] text-white/80 mt-1">{{ titleSecondLine }}</span>
              </h2>

              <!-- Description -->
              <p
                class="mt-5 text-[15px] leading-relaxed text-white/45 max-w-sm hero-stagger-3"
                :key="'desc-' + currentSlide"
              >
                {{ activeSlide.description }}
              </p>

              <!-- CTA -->
              <div
                class="mt-8 flex items-center gap-5 hero-stagger-4"
                :key="'cta-' + currentSlide"
              >
                <router-link
                  :to="activeSlide.link || '/products'"
                  class="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold text-[#111] transition-all duration-300 hover:bg-coral hover:text-white active:scale-[0.97]"
                >
                  {{ activeSlide.cta || 'Shop Now' }}
                  <ArrowRightIcon class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </router-link>
                <router-link
                  to="/products"
                  class="group inline-flex items-center gap-2 text-[13px] font-medium text-white/50 transition-colors hover:text-white/80"
                >
                  Browse all
                  <span class="h-px w-0 bg-white/50 transition-all duration-300 group-hover:w-4"></span>
                </router-link>
              </div>
            </div>

            <!-- Right: Next slide preview (desktop) -->
            <div class="hidden lg:flex justify-end">
              <button
                @click="nextSlide"
                class="group relative w-48 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/[0.08] hover:w-52"
              >
                <div class="aspect-[3/4] overflow-hidden">
                  <img
                    :src="nextSlideData.image"
                    :alt="nextSlideData.title"
                    class="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                  />
                  <!-- Inner overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/90 via-[#0e0e0e]/30 to-transparent"></div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <span class="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Up next</span>
                  <p class="mt-1.5 text-sm font-semibold text-white/80 font-display leading-snug line-clamp-2">{{ nextSlideData.title }}</p>
                  <div class="mt-3 flex items-center gap-2 text-[11px] font-medium text-white/40 transition-colors group-hover:text-coral">
                    <ArrowRightIcon class="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    View
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom bar: navigation -->
      <div class="absolute bottom-0 left-0 right-0 z-30">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between py-5 sm:py-6">
            <!-- Left: Slide indicators with inline progress -->
            <div class="flex items-center gap-2.5">
              <button
                v-for="(slide, index) in slides"
                :key="index"
                @click="goToSlide(index)"
                class="group relative overflow-hidden rounded-full transition-all duration-500"
                :class="currentSlide === index ? 'w-10 h-[3px]' : 'w-2.5 h-[3px] hover:w-4'"
              >
                <!-- Track -->
                <span class="absolute inset-0 rounded-full bg-white/20"></span>
                <!-- Fill (animates only on active slide) -->
                <span
                  v-if="currentSlide === index"
                  class="absolute inset-0 rounded-full bg-white/70 origin-left hero-indicator-fill"
                  :key="'fill-' + currentSlide + '-' + progressKey"
                ></span>
                <!-- Static fill for completed/inactive -->
                <span
                  v-else
                  class="absolute inset-0 rounded-full bg-white/20 transition-colors group-hover:bg-white/35"
                ></span>
              </button>
            </div>

            <!-- Right: Arrows -->
            <div class="flex items-center gap-1.5">
              <button
                @click="prevSlide"
                class="flex h-8 w-8 items-center justify-center rounded-full text-white/30 transition-all duration-300 hover:text-white/70 hover:bg-white/[0.06]"
              >
                <ChevronLeftIcon class="h-3.5 w-3.5" />
              </button>
              <button
                @click="nextSlide"
                class="flex h-8 w-8 items-center justify-center rounded-full text-white/30 transition-all duration-300 hover:text-white/70 hover:bg-white/[0.06]"
              >
                <ChevronRightIcon class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
});

const INTERVAL_MS = 6000;
const currentSlide = ref(0);
const isAutoPlaying = ref(true);
const progressWidth = ref(0);
const progressKey = ref(0);
let interval = null;

const activeSlide = computed(() => props.slides[currentSlide.value] || {});

const nextSlideData = computed(() => {
  const nextIndex = (currentSlide.value + 1) % props.slides.length;
  return props.slides[nextIndex] || {};
});

const titleFirstLine = computed(() => {
  const words = (activeSlide.value.title || '').split(' ');
  if (words.length <= 3) return activeSlide.value.title;
  const mid = Math.ceil(words.length / 2);
  return words.slice(0, mid).join(' ');
});

const titleSecondLine = computed(() => {
  const words = (activeSlide.value.title || '').split(' ');
  if (words.length <= 3) return '';
  const mid = Math.ceil(words.length / 2);
  return words.slice(mid).join(' ');
});

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length;
  resetProgress();
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length;
  resetProgress();
}

function goToSlide(index) {
  currentSlide.value = index;
  resetProgress();
}

function resetProgress() {
  progressKey.value++;
  isAutoPlaying.value = true;
}

function startAutoPlay() {
  clearInterval(interval);
  interval = setInterval(nextSlide, INTERVAL_MS);
}

watch(currentSlide, () => {
  startAutoPlay();
});

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
/* Ken Burns — slow zoom + subtle drift */
@keyframes ken-burns {
  0% {
    transform: scale(1) translate(0, 0);
  }
  100% {
    transform: scale(1.08) translate(-1%, -0.5%);
  }
}

.animate-ken-burns {
  animation: ken-burns 8s ease-out forwards;
}

/* Indicator fill — scales from left over the interval */
@keyframes hero-indicator-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.hero-indicator-fill {
  animation: hero-indicator-fill 6s linear forwards;
}

/* Staggered content entrance animations */
@keyframes hero-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-stagger-1 {
  animation: hero-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}
.hero-stagger-2 {
  animation: hero-slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}
.hero-stagger-3 {
  animation: hero-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
}
.hero-stagger-4 {
  animation: hero-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
}
</style>
