import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const { useAuthStore } = await import("@/stores/auth");
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
      const { useAuthStore } = await import("@/stores/auth");
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
