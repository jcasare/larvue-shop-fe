<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    :header="`Discounts — ${product?.name || ''}`"
    modal
    :style="{ width: '600px' }"
    :pt="{
      root: { class: 'admin-dialog' },
      header: { class: '!bg-surface !border-b !border-border dark:!bg-[#141414] dark:!border-white/[0.06]' },
      content: { class: '!bg-surface dark:!bg-[#141414]' },
      headerTitle: { class: '!text-ink !font-display !font-bold dark:!text-white/90' },
      closeButton: { class: '!text-ink-muted hover:!text-ink dark:!text-white/30 dark:hover:!text-white/60' },
    }"
  >
    <div v-if="loadingDiscounts" class="flex items-center justify-center py-10">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-ink/10 border-t-ink dark:border-white/10 dark:border-t-white/60"></div>
    </div>

    <div v-else class="space-y-6 pt-2">
      <!-- Existing discounts -->
      <div v-if="discounts.length > 0" class="space-y-3">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-white/30">Active & Scheduled</h3>
        <div
          v-for="discount in discounts"
          :key="discount.id"
          class="flex items-center justify-between rounded-xl border border-border p-3.5 dark:border-white/[0.06]"
        >
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-ink font-display dark:text-white/80">${{ Number(discount.discount_price).toFixed(2) }}</span>
              <span class="text-xs text-ink-muted line-through dark:text-white/20">${{ Number(product.price).toFixed(2) }}</span>
              <span
                :class="[
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                  discountStatus(discount).class,
                ]"
              >
                <span :class="['h-1 w-1 rounded-full', discountStatus(discount).dot]"></span>
                {{ discountStatus(discount).label }}
              </span>
            </div>
            <p class="text-[11px] text-ink-muted dark:text-white/25">
              {{ formatDate(discount.starts_at) }} — {{ formatDate(discount.ends_at) }}
            </p>
          </div>
          <div class="flex items-center gap-1">
            <button
              class="rounded-lg p-1.5 text-ink-muted hover:bg-amber/10 hover:text-amber transition-colors dark:text-white/25 dark:hover:bg-amber/10 dark:hover:text-amber"
              :title="discount.is_active ? 'Deactivate' : 'Activate'"
              @click="toggleDiscount(discount)"
            >
              <component :is="discount.is_active ? EyeIcon : EyeSlashIcon" class="h-4 w-4" />
            </button>
            <button
              class="rounded-lg p-1.5 text-ink-muted hover:bg-coral/10 hover:text-coral transition-colors dark:text-white/25 dark:hover:bg-coral/10 dark:hover:text-coral"
              title="Delete"
              @click="handleDeleteDiscount(discount.id)"
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div v-else class="py-6 text-center">
        <p class="text-sm text-ink-muted dark:text-white/25">No discounts set for this product.</p>
      </div>

      <!-- Divider -->
      <hr class="border-border dark:border-white/[0.06]" />

      <!-- Add new discount -->
      <form @submit.prevent="handleAddDiscount" class="space-y-4">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-white/30">Add New Discount</h3>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label for="discount_price" class="block text-[11px] font-medium text-ink-light mb-1 dark:text-white/35">Sale Price</label>
            <input
              id="discount_price"
              v-model="newDiscount.discount_price"
              type="number"
              step="0.01"
              min="0"
              :max="product?.price"
              required
              placeholder="0.00"
              class="block w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-white/15 dark:focus:ring-white/10"
            />
          </div>

          <div>
            <label for="starts_at" class="block text-[11px] font-medium text-ink-light mb-1 dark:text-white/35">Starts</label>
            <input
              id="starts_at"
              v-model="newDiscount.starts_at"
              type="datetime-local"
              required
              class="block w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-white/15 dark:focus:ring-white/10"
            />
          </div>

          <div>
            <label for="ends_at" class="block text-[11px] font-medium text-ink-light mb-1 dark:text-white/35">Ends</label>
            <input
              id="ends_at"
              v-model="newDiscount.ends_at"
              type="datetime-local"
              required
              class="block w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm text-ink focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-white/15 dark:focus:ring-white/10"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="rounded-xl border border-coral/20 bg-coral/5 p-3 text-sm text-coral">
          {{ errorMessage }}
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
            :disabled="saving"
          >
            {{ saving ? 'Adding...' : 'Add Discount' }}
          </button>
        </div>
      </form>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import { TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { getDiscounts, createDiscount, updateDiscount, deleteDiscount } from '@/modules/admin/api/discounts'

const props = defineProps({
  visible: { type: Boolean, default: false },
  product: { type: Object, default: null },
})

defineEmits(['update:visible'])

const discounts = ref([])
const loadingDiscounts = ref(false)
const saving = ref(false)
const errorMessage = ref('')

const newDiscount = ref({
  discount_price: '',
  starts_at: '',
  ends_at: '',
})

watch(() => props.visible, async (isVisible) => {
  if (isVisible && props.product) {
    errorMessage.value = ''
    newDiscount.value = { discount_price: '', starts_at: '', ends_at: '' }
    await fetchDiscounts()
  }
})

async function fetchDiscounts() {
  loadingDiscounts.value = true
  try {
    const response = await getDiscounts(props.product.id)
    discounts.value = response.data.data || response.data
  } catch {
    discounts.value = []
  } finally {
    loadingDiscounts.value = false
  }
}

async function handleAddDiscount() {
  saving.value = true
  errorMessage.value = ''

  try {
    await createDiscount(props.product.id, {
      discount_price: parseFloat(newDiscount.value.discount_price),
      starts_at: newDiscount.value.starts_at,
      ends_at: newDiscount.value.ends_at,
      is_active: true,
    })
    newDiscount.value = { discount_price: '', starts_at: '', ends_at: '' }
    await fetchDiscounts()
  } catch (err) {
    if (err.response?.status === 422 && err.response.data?.errors) {
      const messages = Object.values(err.response.data.errors).flat()
      errorMessage.value = messages.join(' ')
    } else {
      errorMessage.value = err.response?.data?.message || 'Failed to add discount.'
    }
  } finally {
    saving.value = false
  }
}

async function toggleDiscount(discount) {
  try {
    await updateDiscount(props.product.id, discount.id, {
      is_active: !discount.is_active,
    })
    await fetchDiscounts()
  } catch {
    errorMessage.value = 'Failed to update discount.'
  }
}

async function handleDeleteDiscount(discountId) {
  if (!confirm('Delete this discount?')) return
  try {
    await deleteDiscount(props.product.id, discountId)
    await fetchDiscounts()
  } catch {
    errorMessage.value = 'Failed to delete discount.'
  }
}

function discountStatus(discount) {
  const now = new Date()
  const start = new Date(discount.starts_at)
  const end = new Date(discount.ends_at)

  if (!discount.is_active) {
    return { label: 'Inactive', class: 'bg-ink/5 text-ink-muted dark:bg-white/5 dark:text-white/30', dot: 'bg-ink-muted dark:bg-white/30' }
  }
  if (now < start) {
    return { label: 'Scheduled', class: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400', dot: 'bg-blue-500' }
  }
  if (now > end) {
    return { label: 'Expired', class: 'bg-coral/10 text-coral', dot: 'bg-coral' }
  }
  return { label: 'Active', class: 'bg-forest/10 text-forest dark:text-emerald-400', dot: 'bg-forest dark:bg-emerald-400' }
}

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
