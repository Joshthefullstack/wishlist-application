import Image from "next/image";
import BirthdayBoxGif from "../../public/m024t0224_d_gift_box_06sep22.jpg";
import ProfileCard from "../components/ProfileCard";
import Wishlists from "../components/Wishlists";
import Modal from "../components/Modal";
import ModalButton from "../components/ModalButton";
import plusIcon from "../../public/plus.svg";
import { Plus } from "lucide-react";
import WishlistClient from "../components/WishlistClient";

const WishList = () => {
  const jsonWebToken = "your_jwt_token_here"; // Replace with actual JWT token
  // You can use the JWT token in your fetch requests or other logic as needed
  // Example fetch request with JWT token
  // fetch('https://api.example.com/data', {
  //   headers: {
  //     'Authorization': `Bearer ${jsonWebToken}`
  //   }
  // })

  return (
    <div>
      <div className="relative min-h-screen">
        {/* Hero Section */}
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

        {/* Content Section */}
        <ProfileCard />

        <div className="flex justify-end mr-10 sm:justify-end w-full relative">
          <ModalButton
            wishListModal="WishListModal"
            title="Create Wishlist"
            className="btn bg-blue-700 mt-5 mr-5 flex items-center gap-1 text-1xl"
            icon={<Plus size={20} />}
          />
        </div>

        <Modal
          ModalId={"WishListModal"}
          ModalTitle="Create A WishList"
          ModalBtnTitle="Create Wishlist">
          <WishlistClient />
        </Modal>

        <Wishlists />
      </div>
    </div>
  );
};

export default WishList;
