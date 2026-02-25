<template>
  <AuthLayout>
    <template #header>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Set new password</h2>
    </template>

    <form class="space-y-6" @submit.prevent="handleSubmit">
      <FormInput id="password" label="New password" type="password" autocomplete="new-password" v-model="password" />

      <FormInput id="password_confirmation" label="Confirm password" type="password" autocomplete="new-password" v-model="passwordConfirmation" />

      <FormButton>Reset password</FormButton>
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
import { useRoute } from 'vue-router'
import AuthLayout from '@/shared/layouts/AuthLayout.vue'
import FormInput from '@/shared/components/form/FormInput.vue'
import FormButton from '@/shared/components/form/FormButton.vue'

const route = useRoute()
const token = route.params.token

const password = ref('')
const passwordConfirmation = ref('')

const handleSubmit = () => {
  // TODO: call reset password API with token, password, passwordConfirmation
  console.log('Resetting password with token:', token)
}
</script>
