<template>
  <div class="relative overflow-hidden bg-gray-900">
    <!-- Slides -->
    <div class="relative h-[400px] sm:h-[480px] lg:h-[560px]">
      <TransitionGroup
        enter-active-class="transition-opacity duration-700 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-700 ease-in-out absolute inset-0"
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
          <div class="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent"></div>
          <!-- Content -->
          <div class="absolute inset-0 flex items-center">
            <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="max-w-lg">
                <p v-if="slide.tag" class="text-sm font-semibold uppercase tracking-wide text-indigo-400">
                  {{ slide.tag }}
                </p>
                <h2 class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {{ slide.title }}
                </h2>
                <p class="mt-4 text-lg text-gray-300">
                  {{ slide.description }}
                </p>
                <router-link
                  :to="slide.link || '/products'"
                  class="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  {{ slide.cta || 'Shop Now' }}
                  <ArrowRightIcon class="ml-2 h-4 w-4" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Navigation arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
    >
      <ChevronLeftIcon class="h-6 w-6" />
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
    >
      <ChevronRightIcon class="h-6 w-6" />
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="currentSlide = index"
        class="h-2 rounded-full transition-all"
        :class="currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'"
      ></button>
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

onMounted(() => {
  interval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
