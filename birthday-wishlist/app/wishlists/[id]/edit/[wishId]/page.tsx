import Image from "next/image";
import BirthdayBoxGif from "../../../../../public/m024t0224_d_gift_box_06sep22.jpg";
import WishClient from "@/app/components/WishClient";
import WishListTitle from "@/app/components/WishListTitle";

export default function EditWishPage({
  params,
}: {
  params: { id: string; wishId: string };
}) {
  const wishlistId = decodeURIComponent(params.id);
  const wishId = decodeURIComponent(params.wishId);

  return (
    <div>
      <div className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
        <Image
          src={BirthdayBoxGif}
          alt="Birthday Gift Box"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-lg">
          Edit Your Wish 🎁
        </h1>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <WishListTitle id={wishlistId} title="Edit Wishes for" />
        <WishClient wishId={wishId} wishlistId={wishlistId} />
      </div>
    </div>
  );
}
