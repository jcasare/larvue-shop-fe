<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center bg-gray-100 px-6 py-12 dark:bg-gray-900 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="@/assets/vular-logo.png" alt="Your Company" />
      <slot name="header" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <slot />
    </div>
  </div>
</template>
