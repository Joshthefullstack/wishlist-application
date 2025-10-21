"use client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import React from "react";
import { wishlistService } from "../services/wishlistService";

export const deleteWishListAlert = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

// 🔥 Define this as a function (do NOT run immediately)
export const deleteWL = async (
  wishlistId: string,
  userId: string,
  triggerRefresh?: () => void
) => {
  const result = await deleteWishListAlert.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    try {
      //  const res = await fetch(`http://localhost:5000/wishlists/${wishlistId}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ userId }),
      // });

      await wishlistService.deleteWishList(wishlistId, userId);

      await deleteWishListAlert.fire({
        title: "Deleted!",
        text: "Your wishlist has been deleted.",
        icon: "success",
      });
      triggerRefresh?.();
    } catch (err) {
      console.error(err);
    }
  } else if (result.dismiss === "cancel") {
    await deleteWishListAlert.fire({
      title: "Cancelled",
      text: "Your wishlist is safe 🙂",
      icon: "error",
    });
  }
};
