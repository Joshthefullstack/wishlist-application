"use client";
import React, { useEffect, useState } from "react";
import { WishLists } from "./Wishlists";
import { wishlistService } from "../services/wishlistService";

type WishListTitleProps = {
  id: string;
  title: string;
};

const WishListTitle = ({ id, title }: WishListTitleProps) => {
  const [wishlist, setWishlist] = useState<WishLists>();
  const wishlistId = id;

   useEffect(() => {
     const fetchWishlist = async () => {
       try {
        const data = await wishlistService.getWishListItem(wishlistId)
        //  console.log(data)
         setWishlist(data);
       } catch (error) {
         console.error("Error fetching wishlist:", error);
       } finally {
        //  setLoading(false);
       }
     };

     if (id) fetchWishlist();
   }, [id]);

  return (
    <div>
      <h2 className="relative z-10 text-3xl md:text-4xl mt-10 font-bold drop-shadow-lg text-center">
       {wishlist?.title ?  `${title}: ${wishlist?.title}` : "Loading..."}
      </h2>
    </div>
  );
};

export default WishListTitle;
