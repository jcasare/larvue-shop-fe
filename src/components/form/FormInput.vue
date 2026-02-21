<template>
  <div>
    <div class="flex items-center justify-between">
      <label :for="id" class="block text-sm/6 font-medium text-gray-100">{{ label }}</label>
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
        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
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
