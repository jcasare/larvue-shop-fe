<template>
  <div>
    <div class="animate-fade-in-up">
      <span class="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted dark:text-white/40">Account</span>
      <h1 class="mt-1 text-2xl font-bold tracking-tight text-ink font-display dark:text-white/90">Settings</h1>
    </div>

    <div class="mt-8 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 animate-fade-in-up" style="animation-delay: 0.1s">
      <!-- Left column — forms -->
      <div class="space-y-6 min-w-0">
        <!-- Avatar & Profile section -->
        <div class="rounded-2xl border border-border bg-surface p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <h2 class="text-sm font-bold text-ink font-display dark:text-white/80">Profile</h2>
          <p class="mt-1 text-[12px] text-ink-muted dark:text-white/40">Update your photo and personal details.</p>

          <!-- Avatar upload -->
          <div class="mt-6 flex items-center gap-5">
            <div class="relative group">
              <div class="h-20 w-20 rounded-2xl overflow-hidden border-2 border-border dark:border-white/[0.08] bg-paper dark:bg-white/[0.03] flex items-center justify-center">
                <img
                  v-if="avatarPreview || userAvatar"
                  :src="avatarPreview || userAvatar"
                  alt="Avatar"
                  class="h-full w-full object-cover"
                />
                <span v-else class="text-2xl font-bold text-ink-muted/60 font-display dark:text-white/50">
                  {{ userInitials }}
                </span>
              </div>
              <button
                type="button"
                @click="$refs.avatarInput.click()"
                class="absolute inset-0 flex items-center justify-center rounded-2xl bg-ink/0 group-hover:bg-ink/40 transition-all cursor-pointer"
              >
                <svg class="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                </svg>
              </button>
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarChange"
              />
            </div>
            <div>
              <button
                type="button"
                @click="$refs.avatarInput.click()"
                class="text-sm font-semibold text-ink hover:text-coral transition-colors dark:text-white/70 dark:hover:text-coral"
              >
                Change photo
              </button>
              <p class="mt-1 text-[11px] text-ink-muted dark:text-white/40">JPG, PNG or WebP. 2MB max.</p>
              <button
                v-if="avatarPreview || userAvatar"
                type="button"
                @click="removeAvatar"
                class="mt-1 text-[11px] font-medium text-coral/70 hover:text-coral transition-colors"
              >
                Remove photo
              </button>
            </div>
          </div>

          <!-- Profile form -->
          <form @submit.prevent="handleProfileUpdate" class="mt-6 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">First name</label>
                <input
                  v-model="profileForm.first_name"
                  type="text"
                  :class="inputClass"
                  placeholder="John"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Last name</label>
                <input
                  v-model="profileForm.last_name"
                  type="text"
                  :class="inputClass"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Email</label>
              <input
                v-model="profileForm.email"
                type="email"
                :class="inputClass"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Phone</label>
              <input
                v-model="profileForm.phone"
                type="tel"
                :class="inputClass"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <!-- Address fields -->
            <div class="border-t border-border dark:border-white/[0.06] pt-4 mt-4">
              <p class="text-xs font-semibold text-ink-light dark:text-white/35 mb-4">Address</p>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Street address</label>
                  <input
                    v-model="profileForm.address"
                    type="text"
                    :class="inputClass"
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">City</label>
                    <input
                      v-model="profileForm.city"
                      type="text"
                      :class="inputClass"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">State</label>
                    <input
                      v-model="profileForm.state"
                      type="text"
                      :class="inputClass"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">ZIP code</label>
                    <input
                      v-model="profileForm.zip"
                      type="text"
                      :class="inputClass"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Country</label>
                  <input
                    v-model="profileForm.country"
                    type="text"
                    :class="inputClass"
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>

            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="profileSuccess" class="rounded-xl border border-forest/20 bg-forest/5 px-4 py-2.5 text-sm text-forest dark:border-forest/15 dark:bg-forest/10 dark:text-forest-light">
                Profile updated successfully.
              </div>
            </Transition>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="profileError" class="rounded-xl border border-coral/20 bg-coral/5 px-4 py-2.5 text-sm text-coral">
                {{ profileError }}
              </div>
            </Transition>

            <div class="flex items-center gap-3 pt-1">
              <button
                type="submit"
                :disabled="profileLoading || !profileDirty"
                class="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
              >
                {{ profileLoading ? 'Saving...' : 'Save changes' }}
              </button>
              <button
                v-if="profileDirty"
                type="button"
                @click="resetProfileForm"
                class="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors dark:text-white/50 dark:hover:text-white/60"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Password section -->
        <div class="rounded-2xl border border-border bg-surface p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <h2 class="text-sm font-bold text-ink font-display dark:text-white/80">Password</h2>
          <p class="mt-1 text-[12px] text-ink-muted dark:text-white/40">Update your password to keep your account secure.</p>

          <form @submit.prevent="handlePasswordUpdate" class="mt-5 space-y-4">
            <div>
              <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">Current password</label>
              <input
                v-model="passwordForm.current_password"
                type="password"
                :class="inputClass"
                placeholder="Enter current password"
              />
            </div>

            <!-- New password with strength checker -->
            <div>
              <label class="block text-xs font-medium text-ink-light mb-1.5 dark:text-white/40">New password</label>
              <input
                v-model="passwordForm.password"
                type="password"
                :class="inputClass"
                placeholder="Create a strong password"
              />

              <!-- Strength bar -->
              <div v-if="passwordForm.password" class="mt-3 space-y-3">
                <div class="flex items-center gap-2">
                  <div class="flex-1 flex gap-1">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="h-1 flex-1 rounded-full transition-all duration-300"
                      :class="i <= passwordStrength.score
                        ? passwordStrength.score <= 1 ? 'bg-coral'
                          : passwordStrength.score <= 2 ? 'bg-amber'
                          : passwordStrength.score <= 3 ? 'bg-amber'
                          : 'bg-forest'
                        : 'bg-border dark:bg-white/[0.06]'"
                    ></div>
                  </div>
                  <span
                    class="text-[11px] font-semibold transition-colors duration-300 min-w-[52px] text-right"
                    :class="passwordStrength.score <= 1 ? 'text-coral'
                      : passwordStrength.score <= 2 ? 'text-amber'
                      : passwordStrength.score <= 3 ? 'text-amber'
                      : 'text-forest'"
                  >
                    {{ passwordStrength.label }}
                  </span>
                </div>

                <!-- Individual rules -->
                <div class="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <div
                    v-for="rule in passwordRules"
                    :key="rule.key"
                    class="flex items-center gap-2 transition-all duration-200"
                  >
                    <div
                      class="h-3.5 w-3.5 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
                      :class="rule.met
                        ? 'bg-forest/10 dark:bg-forest/20'
                        : 'bg-border/60 dark:bg-white/[0.04]'"
                    >
                      <svg
                        v-if="rule.met"
                        class="h-2.5 w-2.5 text-forest dark:text-green-400"
                        fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <div v-else class="h-1 w-1 rounded-full bg-ink-muted/40 dark:bg-white/15"></div>
                    </div>
                    <span
                      class="text-[11px] transition-colors duration-200"
                      :class="rule.met
                        ? 'text-ink-light dark:text-white/50'
                        : 'text-ink-muted dark:text-white/50'"
                    >
                      {{ rule.label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Confirm password with match indicator -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-medium text-ink-light dark:text-white/40">Confirm password</label>
                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-x-1"
                  enter-to-class="opacity-100 translate-x-0"
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <span
                    v-if="passwordForm.password_confirmation"
                    class="flex items-center gap-1 text-[11px] font-semibold"
                    :class="passwordsMatch ? 'text-forest dark:text-green-400' : 'text-coral'"
                  >
                    <svg v-if="passwordsMatch" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <svg v-else class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    {{ passwordsMatch ? 'Passwords match' : 'Does not match' }}
                  </span>
                </Transition>
              </div>
              <input
                v-model="passwordForm.password_confirmation"
                type="password"
                class="block w-full rounded-xl border bg-paper px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-1 transition-all dark:bg-white/[0.03] dark:text-white/90"
                :class="!passwordForm.password_confirmation
                  ? 'border-border focus:border-ink/20 focus:ring-ink/10 dark:border-white/[0.08] dark:focus:border-white/15 dark:focus:ring-white/10'
                  : passwordsMatch
                    ? 'border-forest/30 focus:border-forest/40 focus:ring-forest/15 dark:border-forest/25 dark:focus:border-forest/30 dark:focus:ring-forest/15'
                    : 'border-coral/30 focus:border-coral/40 focus:ring-coral/15 dark:border-coral/25 dark:focus:border-coral/30 dark:focus:ring-coral/15'"
                placeholder="Re-enter new password"
              />
            </div>

            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="passwordSuccess" class="rounded-xl border border-forest/20 bg-forest/5 px-4 py-2.5 text-sm text-forest dark:border-forest/15 dark:bg-forest/10 dark:text-forest-light">
                Password updated successfully.
              </div>
            </Transition>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="passwordError" class="rounded-xl border border-coral/20 bg-coral/5 px-4 py-2.5 text-sm text-coral">
                {{ passwordError }}
              </div>
            </Transition>

            <div class="pt-1">
              <button
                type="submit"
                :disabled="passwordLoading || !passwordFormValid"
                class="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink/80 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed dark:bg-white dark:text-[#080808] dark:hover:bg-white/90"
              >
                {{ passwordLoading ? 'Updating...' : 'Update password' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Danger zone -->
        <div class="rounded-2xl border border-coral/20 bg-coral/[0.02] p-6 dark:border-coral/15 dark:bg-coral/[0.03]">
          <h2 class="text-sm font-bold text-coral font-display">Danger Zone</h2>
          <p class="mt-1 text-[12px] text-ink-muted dark:text-white/40">Irreversible actions.</p>
          <button
            @click="handleLogout"
            class="mt-4 rounded-xl border border-coral/30 px-4 py-2 text-sm font-semibold text-coral hover:bg-coral/5 transition-colors"
          >
            Sign out of all devices
          </button>
        </div>
      </div>

      <!-- Right column — account sidebar -->
      <div class="space-y-6">
        <!-- Account card -->
        <div class="rounded-2xl border border-border bg-surface p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <div class="flex flex-col items-center text-center">
            <div class="h-16 w-16 rounded-2xl overflow-hidden border-2 border-border dark:border-white/[0.08] bg-gradient-to-br from-coral to-amber flex items-center justify-center">
              <img
                v-if="userAvatar"
                :src="userAvatar"
                alt="Avatar"
                class="h-full w-full object-cover"
              />
              <span v-else class="text-xl font-bold text-white font-display">
                {{ userInitials }}
              </span>
            </div>
            <h3 class="mt-3 text-sm font-bold text-ink font-display dark:text-white/80">{{ userFullName }}</h3>
            <p class="mt-0.5 text-[12px] text-ink-muted dark:text-white/50">{{ authStore.user?.email || '' }}</p>
            <span class="mt-3 inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-forest/5 px-3 py-1 text-[11px] font-medium text-forest dark:border-forest/15 dark:bg-forest/10 dark:text-green-400">
              <span class="h-1.5 w-1.5 rounded-full bg-forest dark:bg-green-400"></span>
              Active
            </span>
          </div>
        </div>

        <!-- Account info -->
        <div class="rounded-2xl border border-border bg-surface p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <h3 class="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted dark:text-white/40">Account Info</h3>
          <dl class="mt-4 space-y-4">
            <div>
              <dt class="text-[11px] text-ink-muted dark:text-white/40">Role</dt>
              <dd class="mt-0.5 text-sm font-medium text-ink dark:text-white/70">{{ authStore.user?.role || 'Administrator' }}</dd>
            </div>
            <div class="border-t border-border dark:border-white/[0.06] pt-4">
              <dt class="text-[11px] text-ink-muted dark:text-white/40">Member since</dt>
              <dd class="mt-0.5 text-sm font-medium text-ink dark:text-white/70">{{ memberSince }}</dd>
            </div>
            <div class="border-t border-border dark:border-white/[0.06] pt-4">
              <dt class="text-[11px] text-ink-muted dark:text-white/40">Last login</dt>
              <dd class="mt-0.5 text-sm font-medium text-ink dark:text-white/70">{{ lastLogin }}</dd>
            </div>
          </dl>
        </div>

        <!-- Quick actions -->
        <div class="rounded-2xl border border-border bg-surface p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <h3 class="text-xs font-bold uppercase tracking-[0.1em] text-ink-muted dark:text-white/40">Quick Actions</h3>
          <div class="mt-4 space-y-2">
            <router-link
              to="/dashboard"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-light hover:bg-ink/5 hover:text-ink transition-colors dark:text-white/40 dark:hover:bg-white/[0.04] dark:hover:text-white/70"
            >
              <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Go to Dashboard
            </router-link>
            <router-link
              to="/products"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-light hover:bg-ink/5 hover:text-ink transition-colors dark:text-white/40 dark:hover:bg-white/[0.04] dark:hover:text-white/70"
            >
              <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
              Manage Products
            </router-link>
            <router-link
              to="/orders"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-light hover:bg-ink/5 hover:text-ink transition-colors dark:text-white/40 dark:hover:bg-white/[0.04] dark:hover:text-white/70"
            >
              <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
              </svg>
              View Orders
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/admin/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// --- Sidebar computed ---
const memberSince = computed(() => {
  const date = authStore.user?.created_at
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

const lastLogin = computed(() => {
  const date = authStore.user?.last_login_at
  if (!date) return 'Just now'
  const d = new Date(date)
  const now = new Date()
  const diffMs = now - d
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

// --- Shared input class ---
const inputClass = 'block w-full rounded-xl border border-border bg-paper px-4 py-2.5 text-sm text-ink focus:border-ink/20 focus:outline-none focus:ring-1 focus:ring-ink/10 transition-all dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/90 dark:focus:border-white/15 dark:focus:ring-white/10'

// --- Profile ---
const profileForm = reactive({
  first_name: authStore.user?.first_name || '',
  last_name: authStore.user?.last_name || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
  address: authStore.user?.address || '',
  city: authStore.user?.city || '',
  state: authStore.user?.state || '',
  zip: authStore.user?.zip || '',
  country: authStore.user?.country || '',
})
const avatarFile = ref(null)
const avatarPreview = ref(null)
const avatarRemoved = ref(false)
const profileLoading = ref(false)
const profileSuccess = ref(false)
const profileError = ref('')

const userAvatar = computed(() => authStore.user?.avatar || authStore.user?.avatar_url || null)
const userInitials = computed(() => {
  const first = authStore.user?.first_name || ''
  const last = authStore.user?.last_name || ''
  if (first && last) return (first[0] + last[0]).toUpperCase()
  const name = authStore.user?.name || first || 'U'
  return name.slice(0, 2).toUpperCase()
})

const userFullName = computed(() => {
  const first = authStore.user?.first_name || ''
  const last = authStore.user?.last_name || ''
  return (first + ' ' + last).trim() || authStore.user?.name || 'User'
})

const profileFields = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country']

const profileDirty = computed(() => {
  if (avatarFile.value !== null || avatarRemoved.value) return true
  return profileFields.some(key => profileForm[key] !== (authStore.user?.[key] || ''))
})

function handleAvatarChange(event) {
  const file = event.target.files?.[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    profileError.value = 'Image must be under 2MB.'
    return
  }

  avatarFile.value = file
  avatarRemoved.value = false
  avatarPreview.value = URL.createObjectURL(file)
}

function removeAvatar() {
  avatarFile.value = null
  avatarPreview.value = null
  avatarRemoved.value = true
}

function resetProfileForm() {
  profileFields.forEach(key => {
    profileForm[key] = authStore.user?.[key] || ''
  })
  avatarFile.value = null
  avatarPreview.value = null
  avatarRemoved.value = false
  profileError.value = ''
}

async function handleProfileUpdate() {
  profileError.value = ''
  profileSuccess.value = false
  profileLoading.value = true

  try {
    const formData = new FormData()
    profileFields.forEach(key => {
      formData.append(key, profileForm[key])
    })
    if (avatarFile.value) {
      formData.append('avatar', avatarFile.value)
    }
    if (avatarRemoved.value) {
      formData.append('remove_avatar', '1')
    }

    await authStore.updateProfile(formData)
    avatarFile.value = null
    avatarPreview.value = null
    avatarRemoved.value = false
    profileSuccess.value = true
    setTimeout(() => { profileSuccess.value = false }, 3000)
  } catch (err) {
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors
      profileError.value = Object.values(errors).flat().join(' ')
    } else if (err.response?.data?.message) {
      profileError.value = err.response.data.message
    } else {
      profileError.value = 'Failed to update profile. Please try again.'
    }
  } finally {
    profileLoading.value = false
  }
}

// --- Password ---
const passwordForm = reactive({
  current_password: '',
  password: '',
  password_confirmation: '',
})
const passwordLoading = ref(false)
const passwordSuccess = ref(false)
const passwordError = ref('')

// Password strength & rules
const passwordRules = computed(() => {
  const pw = passwordForm.password
  return [
    { key: 'length', label: '8+ characters', met: pw.length >= 8 },
    { key: 'upper', label: 'Uppercase letter', met: /[A-Z]/.test(pw) },
    { key: 'lower', label: 'Lowercase letter', met: /[a-z]/.test(pw) },
    { key: 'number', label: 'Number', met: /\d/.test(pw) },
    { key: 'special', label: 'Special character', met: /[^A-Za-z0-9]/.test(pw) },
  ]
})

const passwordStrength = computed(() => {
  const met = passwordRules.value.filter(r => r.met).length
  if (met <= 1) return { score: 1, label: 'Weak' }
  if (met <= 2) return { score: 2, label: 'Fair' }
  if (met <= 3) return { score: 3, label: 'Good' }
  if (met <= 4) return { score: 3, label: 'Strong' }
  return { score: 4, label: 'Excellent' }
})

const passwordsMatch = computed(() => {
  return passwordForm.password && passwordForm.password_confirmation && passwordForm.password === passwordForm.password_confirmation
})

const passwordFormFilled = computed(() => {
  return passwordForm.current_password && passwordForm.password && passwordForm.password_confirmation
})

const passwordFormValid = computed(() => {
  return passwordFormFilled.value && passwordsMatch.value && passwordRules.value.filter(r => r.met).length >= 3
})

async function handlePasswordUpdate() {
  passwordError.value = ''
  passwordSuccess.value = false
  passwordLoading.value = true

  if (!passwordsMatch.value) {
    passwordError.value = 'Passwords do not match.'
    passwordLoading.value = false
    return
  }

  if (passwordRules.value.filter(r => r.met).length < 3) {
    passwordError.value = 'Password is too weak. Please meet at least 3 requirements.'
    passwordLoading.value = false
    return
  }

  try {
    await authStore.updatePassword({ ...passwordForm })
    passwordForm.current_password = ''
    passwordForm.password = ''
    passwordForm.password_confirmation = ''
    passwordSuccess.value = true
    setTimeout(() => { passwordSuccess.value = false }, 3000)
  } catch (err) {
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors
      passwordError.value = Object.values(errors).flat().join(' ')
    } else if (err.response?.data?.message) {
      passwordError.value = err.response.data.message
    } else {
      passwordError.value = 'Failed to update password. Please try again.'
    }
  } finally {
    passwordLoading.value = false
  }
}

// --- Logout ---
async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}

// Sync form if user data changes externally
watch(() => authStore.user, (u) => {
  if (u) {
    profileFields.forEach(key => {
      profileForm[key] = u[key] || ''
    })
  }
}, { deep: true })
</script>
