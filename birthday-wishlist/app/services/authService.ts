import { api } from "./api";


export const authService = {
  getUserId: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userId");
    }
    return null;
  },

  login: async (email: string | undefined, password: string | undefined) => {

    return api("/auth/login", {
      method: "POST",
      body: { email, password },
    });
  },

  signUp: async (email: string | undefined, password: string | undefined) => {
    return api("/auth/register", {
      method: "POST",
      body: { email, password },
    });
  },
};
