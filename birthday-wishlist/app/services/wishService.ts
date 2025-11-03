import { api } from "./api";

export const wishService = {
  getWishes: async (wishlistId: string) => {
    return api(`/wishes/${wishlistId}`);
  },

  addWish: async (formData: FormData) => {
    return api("/wishes/create", {
      method: "POST",
      body: formData,
    });
  },

  editWish: async (formData: FormData, wishId: string) => {
    return api(`/wishes/${wishId}`, {
      method: "PUT",
      body: formData,
    });
  },

  deleteWish: async (wishId: string, wishlistId: string) => {
    return api(`/wishes/delete/${wishId}`, {
      method: "DELETE",
      body: { wishlistId },
    });
  },

  editWishGifter: async (gifter: string, wishId: string) => {
    return api(`/wishes/giftGetter/${wishId}`, {
      method: "PATCH",
      body: { gifter },
    });
  },
};
