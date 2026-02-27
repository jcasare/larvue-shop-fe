import { defineStore } from "pinia";
import axios from "@/shared/helpers/axios";

export const useAuthStore = defineStore("shopAuth", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("shopUser") || "null"),
    token: sessionStorage.getItem("shopToken"),
    isAuthenticated: !!sessionStorage.getItem("shopToken") && !!sessionStorage.getItem("shopUser"),
  }),

  actions: {
    setToken(token) {
      this.token = token;
      this.isAuthenticated = !!token;
      if (token) {
        sessionStorage.setItem("shopToken", token);
      } else {
        sessionStorage.removeItem("shopToken");
      }
    },

    setUser(user) {
      this.user = user;
      if (user) {
        sessionStorage.setItem("shopUser", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("shopUser");
      }
    },

    async login(email, password) {
      try {
        const response = await axios.post("/customer/login", {
          email,
          password,
        });
        const token = response.data.access_token;
        this.setToken(token);
        await this.getUser();
        return response;
      } catch (error) {
        throw error;
      }
    },

    async register(name, email, password, passwordConfirmation) {
      try {
        const response = await axios.post("/customer/register", {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
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
        const response = await axios.get("/customer/user");
        const user = response.data.data || response.data;
        this.setUser(user);
      } catch (error) {
        this.setToken(null);
        this.setUser(null);
        throw error;
      }
    },

    async googleLogin() {
      const response = await axios.get("/customer/auth/google/redirect");
      window.location.href = response.data.url;
    },

    async handleGoogleCallback(code) {
      const response = await axios.get("/customer/auth/google/callback", {
        params: { code },
      });
      const token = response.data.access_token;
      this.setToken(token);
      await this.getUser();
      return response;
    },

    async logout() {
      try {
        await axios.post("/customer/logout");
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
