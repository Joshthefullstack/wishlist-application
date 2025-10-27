import { api } from "./api";

export const wishService = {
  getWishes: async (wishlistId: string) => {
    return api(`/wishes/${wishlistId}`);
  },

  addWish: async (
    title: string,
    description: string,
    price: string,
    imgURL: string,
    wishlistId: string,
    gifters: Array<string>,
    userId: string
  ) => {
    return api("/wishes/create", {
      method: "POST",
      body: { title, description, price, imgURL, wishlistId, gifters, userId },
    });
  },

  editWish: async (
    title: string,
    description: string,
    price: string,
    imgURL: string,
    wishlistId: string,
    gifters: Array<string>,
    userId: string,
    wishId: string
  ) => {
    return api(`/wishes/${wishId}`, {
      method: "PUT",
      body: { title, description, price, imgURL, wishlistId, gifters, userId },
    });
  },

  deleteWish: async (wishId: string, wishlistId: string) => {
    return api(`/wishes/delete/${wishId}`, {
      method: "DELETE",
      body: { wishlistId },
    });
  },

  editWishGifter: async (
    gifters: string,
    wishId: string
  ) => {
    return api(`/wishes/giftGetter/${wishId}`, {
      method: "PATCH",
      body: { gifters },
    });
  },
};
