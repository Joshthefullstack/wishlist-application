
import Image from "next/image";
import BirthdayBoxGif from "../../../public/m024t0224_d_gift_box_06sep22.jpg";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { wishlistService } from "@/app/services/wishlistService";
import ViewWishes from "@/app/components/ViewWishes";

export interface WishItem {
  id: number;
  title: string;
  description: string;
  price: string;
  imgUrl: string;
  giftGetters: string[];
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

type tParams = Promise<{ id: string }>;


export default async function ViewWishesPage(props: { params: tParams}) {
  const { id } = await props.params;

  // Extract the wishlistId (everything before the first "-")
  const wishlistId = id.split("-")[0];

  // I need to get the wishlist from the wishlistLists through the wishlistId

  // once I get the wishlist I need to get the wishes under the wishlist, so I need the whole object wishlist first




  //  If I want to add a functionality, where someone that has promised to get you a gift, would write down their name.
  // so for the person viewing the wishes, they can write down their name that they want to get this person this gift, and when they reserve their name.
  // And when the owner of the account logs in, they can see the number of people who have reserved to get them the gifts.

  return (
    <div>
      <div className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
        <Image
          src={BirthdayBoxGif} // replace with your image path
          alt="Birthday Gift Box"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-lg">
          View Birthday Wishlist 🎉
        </h1>
      </div>

        <ViewWishes wishlistId={wishlistId} />
    </div>
  );
}
