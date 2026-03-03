<template>
  <div>
    <div class="flex items-center justify-between">
      <label :for="id" class="block text-xs font-semibold text-ink-light dark:text-ink-muted">{{ label }}</label>
      <slot name="label-end" />
    </div>
    <div class="mt-1.5">
      <input
        :id="id"
        :type="type"
        :name="name || id"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        required
        class="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/30 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-border dark:bg-surface dark:text-ink dark:placeholder:text-ink-muted dark:focus:border-white/30 dark:focus:ring-white/10"
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
