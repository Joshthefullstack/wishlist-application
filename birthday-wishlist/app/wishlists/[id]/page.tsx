import React, { useState } from "react";
import Image from "next/image";
import BirthdayBoxGif from "../../../public/m024t0224_d_gift_box_06sep22.jpg";
import Wishes from "@/app/components/Wishes";
import { useEffect } from "react";
import { log } from "node:console";
import WishListTitle from "@/app/components/WishListTitle";


interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { id } = (params); 

  const wishlistId = decodeURIComponent(id);

  return (
    <div className="relative min-h-screen">
      <div className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
        <Image
          src={BirthdayBoxGif}
          alt="Birthday Gift Box"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-lg">
          Create Your Birthday Wishlist 🎉
        </h1>
      </div>

      <div>
       <WishListTitle id={wishlistId} title={"Wishes for"}/>
      </div>

      <Wishes wishlistId={wishlistId} />
    </div>
  );
};

export default Page;
