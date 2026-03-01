import axios from "axios";
import { getPortal } from "@/router/portal";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// No request interceptor needed — the browser automatically
// sends the session cookie on every request thanks to withCredentials.
// No more manual Bearer token attachment.

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const portal = getPortal();
      let useAuthStore;
      if (portal === "admin") {
        const mod = await import("@/modules/admin/stores/auth");
        useAuthStore = mod.useAuthStore;
      } else {
        const mod = await import("@/modules/shop/stores/auth");
        useAuthStore = mod.useAuthStore;
      }

      const { default: router } = await import("@/router");
      const authStore = useAuthStore();
      authStore.setUser(null);
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default instance;
