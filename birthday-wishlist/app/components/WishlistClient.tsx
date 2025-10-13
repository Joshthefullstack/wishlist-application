"use client";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import Form from "./Form";
import { authService } from "../services/authService";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Button from "./Button";
import { WishLists } from "./Wishlists";
import { wishlistService } from "../services/wishlistService";

type WishListClientProps = {
  wishlistId?: string;
  wishlists?: WishLists[];
  triggerRefresh?: () => void;
};

const WishlistClient = ({ wishlistId, wishlists, triggerRefresh }: WishListClientProps) => {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const storedUserId = authService.getUserId();
    if (!storedUserId) {
      router.push("/auth/login");
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  useEffect(() => {
    if (wishlistId) {
      const wishlist = wishlists?.find((w) => w._id === wishlistId);
      setTitle(wishlist?.title || "");
      setDescription(wishlist?.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [wishlistId]); // ✅ notice wishlists removed

  const showAlert = (success: boolean) => {
    Swal.fire({
      title: success ? "Success!" : "Error!",
      text: success
        ? "Your wishlist was saved successfully."
        : "Failed to save wishlist.",
      icon: success ? "success" : "error",
      confirmButtonText: "OK",
    });
  };

  const handleWishlist = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      // const url = wishlistId
      //   ? `http://localhost:5000/wishlists/${wishlistId}`
      //   : "http://localhost:5000/wishlists/create";

      // const method = wishlistId ? "PUT" : "POST";

      // const res = await fetch(url, {
      //   method,
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ title, description, userId }),
      // });

      const wishList = wishlistId
        ? await wishlistService.editWishList(
            title,
            description,
            userId,
            wishlistId
          )
        : await wishlistService.addWishList(title, description, userId);

      if (!wishList._id) throw new Error("Request failed");

      showAlert(true);

      const modal = document.getElementById(
        wishlistId ? "WishListModalEdit" : "WishListModal"
      ) as HTMLDialogElement;
      modal?.close?.();
    } catch (err) {
      console.error("Wishlist error:", err);
      setError("Something went wrong.");
      showAlert(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleWishlist}>
        <input
          type="text"
          placeholder="Wishlist Title"
          name="title"
          className="input input-bordered w-full max-w-md mb-5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          name="description"
          className="textarea textarea-bordered w-full max-w-md resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}></textarea>

        <Button
          title={wishlistId ? "Edit Wishlist" : "Create Wishlist"}
          titleOnLoad={wishlistId ? "Editing..." : "Creating..."}
          type="submit"
          loading={loading}
          className="btn btn-neutral mt-4"
        />
      </Form>
    </div>
  );
};

export default WishlistClient;
