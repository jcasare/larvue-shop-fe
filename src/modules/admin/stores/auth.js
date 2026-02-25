import { defineStore } from "pinia";
import axios from "@/shared/helpers/axios";


export const useAuthStore = defineStore("adminAuth", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("adminUser") || "null"),
    token: sessionStorage.getItem("adminToken"),
    isAuthenticated: !!sessionStorage.getItem("adminToken") && !!sessionStorage.getItem("adminUser"),
  }),

  actions: {
    setToken(token) {
      this.token = token;
      this.isAuthenticated = !!token;
      if (token) {
        sessionStorage.setItem("adminToken", token);
      } else {
        sessionStorage.removeItem("adminToken");
      }
    },

    setUser(user) {
      this.user = user;
      if (user) {
        sessionStorage.setItem("adminUser", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("adminUser");
      }
    },

    async login(email, password, remember) {
      try {
        const response = await axios.post("/admin/login", {
          email,
          password,
          remember,
        });
        const token = response.data.access_token;
        this.setToken(token);
        await this.getUser();
        return response;
      } catch (error) {
        throw error;
      }
    },

    async getUser() {
      try {
        const response = await axios.get("/admin/user");
        const user = response.data.data || response.data;
        this.setUser(user);
      } catch (error) {
        this.setToken(null);
        this.setUser(null);
        throw error;
      }
    },

    async logout() {
      try {
        await axios.post("/admin/logout");
      } catch (error) {
        console.log(error);
      } finally {
        this.setToken(null);
        this.setUser(null);
      }
    },
  },

  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
  },
});
