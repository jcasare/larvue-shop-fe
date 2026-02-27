import { defineStore } from "pinia";
import { useAuthStore } from "@/modules/shop/stores/auth";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  syncCart,
  clearCartApi,
} from "@/modules/shop/api/cart";

const STORAGE_KEY = "shopCart";

function loadLocalCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const useCartStore = defineStore("shopCart", {
  state: () => ({
    items: loadLocalCart(),
    syncing: false,
  }),

  getters: {
    count: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    total: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    isEmpty: (state) => state.items.length === 0,

    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.getAuthenticated;
    },
  },

  actions: {
    // Add item — persists locally for guests, syncs to backend for authed users
    async addItem(product, quantity = 1) {
      const existing = this.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          image: product.image_url || product.image,
          quantity,
        });
      }
      saveLocalCart(this.items);

      if (this.isAuthenticated) {
        try {
          await addCartItem(product.id, quantity);
        } catch {
          // Local cart is already updated — backend will sync on next load
        }
      }
    },

    // Remove item
    async removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      saveLocalCart(this.items);

      if (this.isAuthenticated) {
        try {
          await removeCartItem(productId);
        } catch {
          // Silently fail — local state is source of truth for UX
        }
      }
    },

    // Update quantity
    async updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          return this.removeItem(productId);
        }
        item.quantity = quantity;
        saveLocalCart(this.items);

        if (this.isAuthenticated) {
          try {
            await updateCartItem(productId, quantity);
          } catch {
            // Silently fail
          }
        }
      }
    },

    // Clear cart
    async clearCart() {
      this.items = [];
      saveLocalCart(this.items);

      if (this.isAuthenticated) {
        try {
          await clearCartApi();
        } catch {
          // Silently fail
        }
      }
    },

    // Fetch cart from backend (for authed users)
    async fetchCart() {
      if (!this.isAuthenticated) return;

      try {
        const response = await getCart();
        const serverItems = (response.data.data ?? response.data).map(
          (item) => ({
            id: item.product_id ?? item.id,
            name: item.product?.name ?? item.name,
            price: parseFloat(item.product?.price ?? item.price),
            image:
              item.product?.image_url ??
              item.product?.image ??
              item.image,
            quantity: item.quantity,
          })
        );
        this.items = serverItems;
        saveLocalCart(this.items);
      } catch {
        // Keep local cart if backend fails
      }
    },

    // Merge local guest cart into server cart on login, then fetch merged result
    async mergeAndSync() {
      if (!this.isAuthenticated) return;

      const localItems = loadLocalCart();
      this.syncing = true;

      try {
        if (localItems.length > 0) {
          // Send local items to server to merge with existing server cart
          await syncCart(
            localItems.map((item) => ({
              product_id: item.id,
              quantity: item.quantity,
            }))
          );
        }
        // Fetch the merged cart from server
        await this.fetchCart();
      } catch {
        // If sync fails, keep local items
      } finally {
        this.syncing = false;
      }
    },
  },
});
