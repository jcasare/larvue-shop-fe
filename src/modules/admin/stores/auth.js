import { defineStore } from "pinia";
import axios from "@/shared/helpers/axios";

export const useAuthStore = defineStore("adminAuth", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("adminUser") || "null"),
    isAuthenticated: !!sessionStorage.getItem("adminUser"),
  }),

  actions: {
    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user;
      if (user) {
        sessionStorage.setItem("adminUser", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("adminUser");
      }
    },

    async login(email, password, remember) {
      await axios.get("/sanctum/csrf-cookie", {
        baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/api$/, "") || "http://localhost:8000",
      });

      const response = await axios.post("/auth/login", {
        email,
        password,
        remember,
      });
      this.setUser(response.data.user);
      return response;
    },

    async getUser() {
      try {
        const response = await axios.get("/auth/user");
        const user = response.data.data || response.data;
        this.setUser(user);
      } catch (error) {
        this.setUser(null);
        throw error;
      }
    },

    async logout() {
      try {
        await axios.post("/auth/logout");
      } catch (error) {
        console.log(error);
      } finally {
        this.setUser(null);
      }
    },
  },

  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
  },
});
