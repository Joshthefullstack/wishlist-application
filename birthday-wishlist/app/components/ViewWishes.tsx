"use client";
import React, { useEffect, useState } from "react";
import { WishItem } from "../viewWishlists/[id]/page";
import Image from "next/image";
import { wishService } from "../services/wishService";

type WishesProps = {
  wishlistId: string;
};

const ViewWishes = ({ wishlistId }: WishesProps) => {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const wishes = await wishService.getWishes(wishlistId);
        // console.log("Updated wwishlists", data);
        setWishes(wishes);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, [wishlistId]);

  const [gifter, setGifter] = useState("");

  const addGifter = async (wishId: string) => {
    setError("");

    try {
      const updateGifter = await wishService.editWishGifter(gifter, wishId);

      if (updateGifter.message === "") {
        alert("Error trying to update gifter");
      }
      alert("Gifter has been added");
    } catch (err) {
      console.error("Wishlist error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // I also need to work on the functionality of adding the gift getters name to the list of wishes

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Loading wishes...
      </div>
    );

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 space-y-4 mt-2">
        {wishes.length > 0 ? (
          wishes.map((wish) => (
            <div
              className="collapse collapse-arrow bg-slate-100 border border-base-300"
              key={wish._id}>
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold text-blue-900">
                {wish.title}
              </div>

              <div className="collapse-content text-sm flex flex-col gap-1 text-blue-900">
                <span className="">Why I need this {wish.title}?</span>
                <span>{wish.description}</span>
                <span>
                  <b>Price: {wish.price}</b>
                </span>

                <Image
                  src={wish.imgUrl}
                  alt={wish.title}
                  width={200}
                  height={200}
                  className="mt-5 mb-3"
                />

                <span>
                  Do you wish to get this gift for this special individual,
                  please, reserve your name below.
                </span>
                <div className="flex items-center gap-5">
                  <input
                    type="text"
                    placeholder="Reserve Gift"
                    className="border bg-gray-600 text-white  p-3 rounded w-[600px]"
                    onChange={(e) => {
                      setGifter(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addGifter(wish._id);
                    }}>
                    Add Name
                  </button>
                </div>
                <p>{error}</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h3 className="relative z-10 text-3xl md:text-3xl mt-10 font-bold drop-shadow-lg text-center">
              No wish added yet.
            </h3>
          </div>
        )}
        {}
      </div>
    </div>
  );
};

export default ViewWishes;
