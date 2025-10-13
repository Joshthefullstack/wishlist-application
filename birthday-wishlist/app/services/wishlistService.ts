import { api } from "./api";

export const wishlistService = {
  getWishLists: async (userId: string) => {
    return api(`/wishlists/${userId}`);
  },

  addWishList: async (title: string, description: string, userId: string) => {
    return api("/wishlists/create", {
      method: "POST",
      body: { title, description, userId },
    });
  },

  editWishList: async (
    title: string,
    description: string,
    userId: string,
    wishlistId: string | undefined
  ) => {
     return api(`/wishlists/${wishlistId}`, {
       method: "PUT",
       body: { title, description, userId },
     });
  },

  deleteWishList: async (wishlistId: string, userId: string) => {
    return api(`/wishlists/${wishlistId}`, {
      method: "DELETE",
      body: { userId },
    });
  },
};
