import axios from "axios";
import { getPortal } from "@/router/portal";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const portal = getPortal();
  const storePath = portal === "admin"
    ? "@/modules/admin/stores/auth"
    : "@/modules/shop/stores/auth";

  // Dynamic import based on portal
  let useAuthStore;
  if (portal === "admin") {
    const mod = await import("@/modules/admin/stores/auth");
    useAuthStore = mod.useAuthStore;
  } else {
    const mod = await import("@/modules/shop/stores/auth");
    useAuthStore = mod.useAuthStore;
  }

  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

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
      authStore.setToken(null);
      authStore.setUser(null);
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default instance;
