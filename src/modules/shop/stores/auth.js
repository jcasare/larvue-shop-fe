import { defineStore } from "pinia";
import axios from "@/shared/helpers/axios";

export const useAuthStore = defineStore("shopAuth", {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("shopUser") || "null"),
    isAuthenticated: !!sessionStorage.getItem("shopUser"),
  }),

  actions: {
    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user;
      if (user) {
        sessionStorage.setItem("shopUser", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("shopUser");
      }
    },

    async login(email, password) {
      // Step 1: Get the CSRF cookie from Sanctum.
      // This hits a special endpoint that sets an XSRF-TOKEN cookie.
      // Axios automatically picks it up and sends it as X-XSRF-TOKEN
      // header on subsequent requests (POST, PUT, PATCH, DELETE).
      // Without this, Laravel rejects mutations with a 419 status.
      await axios.get("/sanctum/csrf-cookie", {
        baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/api$/, "") || "http://localhost:8000",
      });

      // Step 2: Login — Laravel starts a session and sends back
      // a session cookie. No token in the response to store.
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      this.setUser(response.data.user);
      return response;
    },

    async register(firstName, lastName, email, password, passwordConfirmation) {
      await axios.get("/sanctum/csrf-cookie", {
        baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/api$/, "") || "http://localhost:8000",
      });

      const response = await axios.post("/auth/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
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

    async googleLogin() {
      const response = await axios.get("/auth/google/redirect");
      window.location.href = response.data.url;
    },

    async handleGoogleCallback(code) {
      await axios.get("/sanctum/csrf-cookie", {
        baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/api$/, "") || "http://localhost:8000",
      });

      const response = await axios.get("/auth/google/callback", {
        params: { code },
      });
      this.setUser(response.data.user);
      return response;
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
