import { defineStore } from "pinia";
import axios from "@/helpers/axios";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("user") || "null"),
    token: sessionStorage.getItem("token"),
    isAuthenticated: !!sessionStorage.getItem("token") && !!sessionStorage.getItem("user"),
  }),
  
  actions: {
    setToken(token) {
      this.token = token;
      this.isAuthenticated = !!token;
      if (token) {
        sessionStorage.setItem("token", token);
      } else {
        sessionStorage.removeItem("token");
      }
    },

    setUser(user) {
      this.user = user;
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("user");
      }
    },

    async login(email, password, remember) {
      try {
      const response = await axios.post("/login", {
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
        const response = await axios.get("/user");
        this.setUser(response.data);
      } catch (error) {
        this.setToken(null);
        this.setUser(null);
        throw error;
      }
    },

    async logout() {
      try {
        await axios.post("/logout");
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
