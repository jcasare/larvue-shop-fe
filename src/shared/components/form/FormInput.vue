<template>
  <div>
    <div class="flex items-center justify-between">
      <label :for="id" class="block text-sm/6 font-medium text-gray-700 dark:text-gray-100">{{ label }}</label>
      <slot name="label-end" />
    </div>
    <div class="mt-2">
      <input
        :id="id"
        :type="type"
        :name="name || id"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        required
        class="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 sm:text-sm/6"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  id: String,
  type: { type: String, default: 'text' },
  name: String,
  autocomplete: String,
  modelValue: String,
})

defineEmits(['update:modelValue'])
</script>
