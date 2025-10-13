import Image from "next/image";
import BirthdayBoxGif from "../../public/m024t0224_d_gift_box_06sep22.jpg";
import ProfileCard from "../components/ProfileCard";
import Wishlists from "../components/Wishlists";
import Modal from "../components/Modal";
import ModalButton from "../components/ModalButton";
import { Plus } from "lucide-react";


const ViewWishList = () => {

   const jsonWebToken  = ""; // Replace with actual JWT token
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
            View Stephanie Wishlist 🎉
          </h1>
        </div>

        {/* Content Section */}
        <ProfileCard />

        <Wishlists jsonWebToken={jsonWebToken} />
      </div>
    </div>
  );
};

export default ViewWishList;
