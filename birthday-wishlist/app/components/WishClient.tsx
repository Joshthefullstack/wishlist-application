"use client";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";
import Swal from "sweetalert2";
import Button from "./Button";
import { wishlistService } from "../services/wishlistService";
import { wishService } from "../services/wishService";

type WishClientProps = {
  wishId?: string;
  wishlistId: string;
};

const WishClient = ({ wishId, wishlistId }: WishClientProps) => {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const addWishAlertClassName = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const addWishAlert = async (
    wishlistId: string,
    triggerRefresh?: () => void
  ) => {
    const result = await addWishAlertClassName.fire({
      title: "Still want to continue creating wishes?",
      text: "You can continue creating wishes, or view wishes you have created.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, continue creating",
      cancelButtonText: "No, view wishes!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      showAlert("add");
      setTitle("");
      setDescription("");
      setPrice("");
    } else if (result.dismiss === "cancel") {
      router.push(`/wishlists/${wishlistId}`);
    }
  };

  useEffect(() => {
    const storedUserId = authService.getUserId();
    if (!storedUserId) {
      router.push("/auth/login");
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  useEffect(() => {
    if (wishId) {
      const fetchWish = async () => {
        const res = await fetch(
          `http://localhost:5000/wishes/getWish/${wishId}`
        );
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
      };
      fetchWish();
    }
  }, [wishId]);

  const showAlert = (mode: "add" | "edit") => {
    Swal.fire({
      title: mode === "add" ? "Success!" : "Success",
      text:
        mode === "add"
          ? "Your wish was saved successfully."
          : "Your wish was edited successfully",
      icon: mode === "add" ? "success" : "success",
      confirmButtonText: "OK",
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      title: "Error!",
      text: "Failed to make changes to wish",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const handleWish = async () => {

    setLoading(true);
    setError(null);

    const formData = new FormData();


    try { 
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("wishlistId", wishlistId);
    formData.append("userId", userId);

    if (image) {
      formData.append("img", image); // must match multer field name
    }


      const wishes = wishId
      ? await wishService.editWish(formData, wishId)
      : await wishService.addWish(formData);


      if (!wishes._id) throw new Error("Request failed");
      // showAlert(true);

      if (wishId) {
        showAlert("edit");
        router.push(`/wishlists/${wishlistId}`);
      } else {
        addWishAlert(wishlistId);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      setError("Something went wrong.");
      showErrorAlert();
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <Form onSubmit={handleWish} className="mt-6 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Wish title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Wish description"
          className="border p-2 rounded resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <span>Image:</span>
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-primary"
          onChange={() => {handleFileChange}}
        />

        <div className="flex gap-4 justify-end">
          <Button
            title={wishId ? "Edit Wish" : "Save Wish"}
            titleOnLoad={wishId ? "Editing..." : "Saving..."}
            type="submit"
            loading={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          />
          <Link
            href={`/wishlists/`}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default WishClient;
