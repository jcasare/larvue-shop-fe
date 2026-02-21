<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="@/assets/vular-logo.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Set new password</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="password" class="block text-sm/6 font-medium text-gray-100">New password</label>
          <div class="mt-2">
            <input v-model="password" type="password" name="password" id="password" autocomplete="new-password" required="" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm/6 font-medium text-gray-100">Confirm password</label>
          <div class="mt-2">
            <input v-model="passwordConfirmation" type="password" name="password_confirmation" id="password_confirmation" autocomplete="new-password" required="" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Reset password</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Remember your password?
        {{ ' ' }}
        <router-link :to="{ name: 'login' }" class="font-semibold text-indigo-400 hover:text-indigo-300">Back to sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const token = route.params.token

const password = ref('')
const passwordConfirmation = ref('')

const handleSubmit = () => {
  // TODO: call reset password API with token, password, passwordConfirmation
  console.log('Resetting password with token:', token)
}
</script>
