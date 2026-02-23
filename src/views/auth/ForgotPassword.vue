<template>
  <AuthLayout>
    <template #header>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Reset your password</h2>
      <p class="mt-2 text-center text-sm/6 text-gray-500 dark:text-gray-400">Enter your email address and we'll send you a link to reset your password.</p>
    </template>

    <form class="space-y-6" @submit.prevent="handleSubmit">
      <FormInput id="email" label="Email address" type="email" autocomplete="email" v-model="email" />

      <FormButton>Send reset link</FormButton>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
      Remember your password?
      {{ ' ' }}
      <router-link :to="{ name: 'login' }" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Back to sign in</router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormButton from '@/components/form/FormButton.vue'

const email = ref('')

const handleSubmit = () => {
  // TODO: call forgot password API
  console.log('Reset link requested for:', email.value)
}
</script>
