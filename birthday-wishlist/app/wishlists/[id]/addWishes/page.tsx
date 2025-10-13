import React from "react";
import Image from "next/image";
import BirthdayBoxGif from "../../../../public/m024t0224_d_gift_box_06sep22.jpg";
import Link from "next/link";
import WishClient from "@/app/components/WishClient";
import WishListTitle from "@/app/components/WishListTitle";


export default function AddWishesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; 

  const wishlistId = decodeURIComponent(id);
  
  return (
    <div className="">
      <div className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
        <Image
          src={BirthdayBoxGif} // replace with your image path
          alt="Birthday Gift Box"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-lg">
          Create Your Birthday Wishlist 🎉
        </h1>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mt-10">
          <WishListTitle id={wishlistId} title={"Add Wishes for"} />
        </h1>
  
          <WishClient wishlistId={wishlistId} />
      </div>
    </div>
  );
}
