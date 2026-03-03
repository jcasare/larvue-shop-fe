<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 animate-fade-in-up">
      <div>
        <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/25">Catalog</span>
        <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">Categories</h1>
        <p class="mt-1 text-sm text-ink-muted dark:text-white/30">{{ categories.length }} categories</p>
      </div>
      <button
        @click="openModal()"
        class="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
      >
        <PlusIcon class="h-4 w-4" />
        Add Category
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 6" :key="i" class="rounded-2xl border border-border p-5 dark:border-white/[0.06]">
        <div class="h-4 w-24 rounded-full shimmer"></div>
        <div class="mt-3 h-3 w-40 rounded-full shimmer"></div>
        <div class="mt-4 flex gap-2">
          <div class="h-8 w-16 rounded-lg shimmer"></div>
          <div class="h-8 w-16 rounded-lg shimmer"></div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="categories.length === 0" class="py-20 text-center animate-fade-in-up">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 dark:bg-white/[0.04]">
        <TagIcon class="h-7 w-7 text-ink-muted dark:text-white/20" />
      </div>
      <h3 class="mt-5 text-lg font-semibold text-ink font-display dark:text-white/80">No categories yet</h3>
      <p class="mt-2 text-sm text-ink-muted max-w-sm mx-auto dark:text-white/25">Create your first category to organize your products.</p>
      <button
        @click="openModal()"
        class="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
      >
        <PlusIcon class="h-4 w-4" />
        Create Category
      </button>
    </div>

    <!-- Categories grid -->
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(cat, i) in categories"
        :key="cat.id"
        class="group rounded-2xl border border-border bg-surface p-5 transition-all hover:border-border-light hover:shadow-lg hover:shadow-ink/[0.03] animate-fade-in-up dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.1]"
        :style="{ animationDelay: `${i * 0.03}s` }"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-bold text-ink font-display truncate dark:text-white/85">{{ cat.name }}</h3>
            <p class="mt-1 text-[12px] text-ink-muted dark:text-white/30">
              {{ cat.slug || '—' }}
            </p>
            <p v-if="cat.description" class="mt-2 text-[12px] text-ink-light line-clamp-2 dark:text-white/35">
              {{ cat.description }}
            </p>
          </div>
          <span class="shrink-0 ml-3 inline-flex items-center rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-bold text-ink-muted dark:bg-white/[0.06] dark:text-white/30">
            {{ cat.product_count ?? cat.products_count ?? cat.products?.length ?? 0 }} products
          </span>
        </div>

        <div class="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            @click="openModal(cat)"
            class="rounded-lg border border-border px-3 py-1.5 text-[11px] font-semibold text-ink-light hover:border-ink/20 hover:text-ink transition-colors dark:border-white/[0.08] dark:text-white/40 dark:hover:border-white/20 dark:hover:text-white/70"
          >
            Edit
          </button>
          <button
            @click="handleDelete(cat)"
            class="rounded-lg border border-border px-3 py-1.5 text-[11px] font-semibold text-ink-light hover:border-coral/30 hover:text-coral transition-colors dark:border-white/[0.08] dark:text-white/40 dark:hover:border-coral/30 dark:hover:text-coral"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="modalOpen" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="fixed inset-0 bg-ink/50 backdrop-blur-sm dark:bg-black/60" @click="modalOpen = false"></div>
          <div class="flex min-h-full items-center justify-center p-4">
            <div class="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl animate-scale-in dark:border-white/[0.08] dark:bg-[#141414]" @click.stop>
              <h2 class="text-lg font-bold text-ink font-display dark:text-white/90">
                {{ editingCategory ? 'Edit Category' : 'New Category' }}
              </h2>

              <form @submit.prevent="handleSubmit" class="mt-5 space-y-4">
                <div>
                  <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Name</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/20 dark:focus:border-white/15 dark:focus:ring-white/10"
                    placeholder="e.g. Apparel"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Slug</label>
                  <input
                    v-model="form.slug"
                    type="text"
                    class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/20 dark:focus:border-white/15 dark:focus:ring-white/10"
                    placeholder="auto-generated if empty"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Description <span class="text-ink-muted dark:text-white/20">(optional)</span></label>
                  <textarea
                    v-model="form.description"
                    rows="3"
                    class="block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all resize-none dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/20 dark:focus:border-white/15 dark:focus:ring-white/10"
                    placeholder="Brief description..."
                  />
                </div>

                <div v-if="formError" class="rounded-xl border border-coral/20 bg-coral/5 p-3 text-sm text-coral">
                  {{ formError }}
                </div>

                <div class="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    @click="modalOpen = false"
                    class="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-ink-light hover:bg-ink/5 transition-colors dark:border-white/[0.08] dark:text-white/40 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
                  >
                    {{ saving ? 'Saving...' : (editingCategory ? 'Update' : 'Create') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete confirmation -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="deleteConfirmOpen" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="fixed inset-0 bg-ink/50 backdrop-blur-sm dark:bg-black/60" @click="deleteConfirmOpen = false"></div>
          <div class="flex min-h-full items-center justify-center p-4">
            <div class="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-2xl animate-scale-in dark:border-white/[0.08] dark:bg-[#141414]" @click.stop>
              <h2 class="text-lg font-bold text-ink font-display dark:text-white/90">Delete category</h2>
              <p class="mt-2 text-sm text-ink-muted dark:text-white/30">
                Are you sure you want to delete <strong class="text-ink dark:text-white/70">{{ deletingCategory?.name }}</strong>? This action cannot be undone.
              </p>
              <div class="mt-6 flex justify-end gap-3">
                <button
                  @click="deleteConfirmOpen = false"
                  class="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-ink-light hover:bg-ink/5 transition-colors dark:border-white/[0.08] dark:text-white/40 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  @click="confirmDelete"
                  :disabled="deleting"
                  class="rounded-xl bg-coral px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-coral-dark active:scale-[0.98] disabled:opacity-50"
                >
                  {{ deleting ? 'Deleting...' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, TagIcon } from '@heroicons/vue/24/outline'
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/modules/admin/api/categories'

const categories = ref([])
const loading = ref(true)

const modalOpen = ref(false)
const editingCategory = ref(null)
const saving = ref(false)
const formError = ref('')

const deleteConfirmOpen = ref(false)
const deletingCategory = ref(null)
const deleting = ref(false)

const form = ref({ name: '', slug: '', description: '' })

function openModal(cat = null) {
  editingCategory.value = cat
  formError.value = ''
  if (cat) {
    form.value = { name: cat.name, slug: cat.slug || '', description: cat.description || '' }
  } else {
    form.value = { name: '', slug: '', description: '' }
  }
  modalOpen.value = true
}

async function fetchCategories() {
  loading.value = true
  try {
    const res = await getCategories()
    categories.value = res.data.data || res.data
  } catch {
    categories.value = []
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  saving.value = true
  formError.value = ''
  try {
    const data = { ...form.value }
    if (!data.slug) delete data.slug
    if (editingCategory.value) {
      await updateCategory(editingCategory.value.id, data)
    } else {
      await createCategory(data)
    }
    modalOpen.value = false
    await fetchCategories()
  } catch (err) {
    if (err.response?.status === 422 && err.response.data?.errors) {
      const messages = Object.values(err.response.data.errors).flat()
      formError.value = messages.join(' ')
    } else {
      formError.value = err.response?.data?.message || 'Something went wrong.'
    }
  } finally {
    saving.value = false
  }
}

function handleDelete(cat) {
  deletingCategory.value = cat
  deleteConfirmOpen.value = true
}

async function confirmDelete() {
  deleting.value = true
  try {
    await deleteCategory(deletingCategory.value.id)
    deleteConfirmOpen.value = false
    await fetchCategories()
  } catch {
    // Silently handle
  } finally {
    deleting.value = false
  }
}

onMounted(fetchCategories)
</script>
