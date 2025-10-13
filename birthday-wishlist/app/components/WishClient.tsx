"use client";
import React, { useEffect, useState } from 'react';
import Form from './Form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';
import Swal from 'sweetalert2';
import Button from './Button';
import { wishlistService } from '../services/wishlistService';
import { wishService } from '../services/wishService';


type WishClientProps = {
  wishId?: string;
  wishlistId: string;
}

const WishClient = ({ wishId, wishlistId }: WishClientProps) => {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

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
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // await addWishAlertClassName.fire({
    //   title: "Cancelled",
    //   text: "Your wishlist is safe 🙂",
    //   icon: "error",
    // });
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
        setPrice(data.price)
      };
      fetchWish();
    }
  }, [wishId]);


  const showAlert = (mode: "add" | "edit") => {
    Swal.fire({
      title: mode === "add" ? "Success!" : "Success",
      text: mode === "add"
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
      confirmButtonText: "OK"
    })
  }

  const handleWish = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      // const url = wishId
      //   ? `http://localhost:5000/wishes/${wishId}`
      //   : "http://localhost:5000/wishes/create";

      // const method = wishId ? "PUT" : "POST";

      // const res = await fetch(url, {
      //   method,
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     title,
      //     description,
      //     price,
      //     gifters: [],
      //     imgURL: "",
      //     wishlistId,
      //     userId,
      //   }),
      // });

 const wishes = wishId
   ? await wishService.editWish(
       title,
       description,
       price,
       "",
       wishlistId,
       [],
       userId,
       wishId
     )
   : await wishService.addWish(
       title,
       description,
       price,
       "",
       wishlistId,
       [],
       userId,
     );

      if (!wishes._id) throw new Error("Request failed")
      // showAlert(true);

      if(wishId){
        showAlert("edit");
        router.push(`/wishlists/${wishlistId}`);
      } else{
        addWishAlert(wishlistId);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      setError("Something went wrong.");
      showErrorAlert()
    } finally {
      setLoading(false);
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
        <input type="file" className="file-input file-input-primary" />

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
            className="bg-red-600 text-white px-4 py-2 rounded">
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default WishClient