<template>
  <div>
    <!-- Hero -->
    <section class="bg-indigo-600 dark:bg-indigo-800">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-white sm:text-5xl">Welcome to Larvue Shop</h1>
        <p class="mt-4 max-w-xl text-lg text-indigo-100">
          Discover amazing products at great prices.
        </p>
        <router-link
          to="/products"
          class="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
        >
          Browse Products
        </router-link>
      </div>
    </section>

    <!-- Featured section placeholder -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
      <p class="mt-2 text-gray-500 dark:text-gray-400">Coming soon...</p>
    </section>
  </div>
</template>
