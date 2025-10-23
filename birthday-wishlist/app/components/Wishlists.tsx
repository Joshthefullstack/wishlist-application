// "use client";
// import { Trash2, Edit, Plus, Wand2 } from "lucide-react";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { authService } from "../services/authService";
// import ModalButton from "./ModalButton";
// import Modal from "./Modal";
// import WishlistClient from "./WishlistClient";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { deleteWishListAlert, deleteWL } from "./Alerts";

// type WishlistsProps = {
//   jsonWebToken: string;
// };

// export interface WishLists {
//   _id: string;
//   title: string;
//   description: string;
// }

// export default function Wishlists() {
//   const [userId, setUserId] = useState<string>("");
//   const router = useRouter();
//   const [refreshKey, setRefreshKey] = useState(0);

//   const triggerRefresh = () => {
//     setRefreshKey((prev) => prev + 1);
//   };

//   useEffect(() => {
//     const storedUserId = authService.getUserId();
//     if (!storedUserId) {
//       router.push("/auth/login");
//     } else {
//       setUserId(storedUserId);
//     }
//   }, [router]);
// // data not refreshing after adding
//   const [wishlists, setWishlists] = useState<WishLists[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [wishlistId, setWishListId] = useState("");

//   useEffect(() => {
//     const fetchWishlists = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/wishlists/${userId}`,
//           {}
//         );
//         const data = await res.json();
//         setWishlists(data);

//         triggerRefresh?.();
//       } catch (err) {
//         console.error("Failed to fetch:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlists();
//   }, [userId, refreshKey]);

//   return (
//     <div className="mt-10 flex items-center justify-center">
//       {wishlists.length > 0 ? (
//         <div className="rounded-lg w-[1600px]">
//           <div className="overflow-x-auto rounded-lg">
//             <table className="min-w-full border bg-white rounded-lg shadow-lg">
//               <thead className="bg-blue-500 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left font-semibold">Title</th>
//                   <th className="px-6 py-3 text-left font-semibold">
//                     No. of wish
//                   </th>
//                   {userId.length > 0 ? (
//                     <th className="px-6 py-3 text-right font-semibold">
//                       Actions
//                     </th>
//                   ) : (
//                     ""
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {wishlists.map((wishlist) => (
//                   <Link
//                     key={wishlist._id}
//                     href={
//                       userId.length > 0
//                         ? `/wishlists/${wishlist._id}`
//                         : `/viewWishlists/${wishlist.title}`
//                     }
//                     className="contents" // 👈 super important
//                   >
//                     <tr className="border-b hover:bg-blue-50 transition cursor-pointer">
//                       <td className="px-6 py-4 text-blue-600 font-medium">
//                         {wishlist.title}
//                       </td>
//                       <td className="px-6 py-4 text-blue-600 font-medium">
//                         {/* {item.quantity} */}2
//                       </td>
//                       {userId.length > 0 ? (
//                         <td className="px-6 py-4 flex justify-end gap-3">
//                           {/* <button
//                         onClick={(e) => e.stopPropagation()}
//                         className="p-2 rounded-full hover:bg-green-100 text-green-600"> */}
//                           <Link
//                             href={`/wishlists/${wishlist._id}/addWishes`}
//                             onClick={(e) => e.stopPropagation()} // prevent row link
//                             className="p-2 rounded-full hover:bg-green-100 text-green-600">
//                             <Plus size={20} />
//                           </Link>
//                           {/* </button> */}
//                           <Link
//                             href={``}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setWishListId(wishlist._id);
//                             }}
//                             className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600">
//                             <ModalButton
//                               wishListModal={"WishListModalEdit"}
//                               icon={<Edit size={20} />} // 👈 works fine
//                             />
//                           </Link>
//                           <Link
//                             href={`/wishlists/${wishlist.title}/magic`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               console.log("this is generate icon");
//                             }}
//                             className="p-2 rounded-full hover:bg-purple-100 text-purple-600">
//                             <Wand2 size={20} />
//                           </Link>
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               // handle delete logic here
//                               deleteWL(wishlist._id, userId, triggerRefresh);
//                             }}
//                             className="p-2 rounded-full hover:bg-red-100 text-red-600">
//                             <Trash2
//                               size={20}
//                               onClick={() => console.log("this is the icon")}
//                             />
//                           </button>
//                         </td>
//                       ) : (
//                         ""
//                       )}
//                     </tr>
//                   </Link>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="relative z-10 text-1xl md:text-3xl font-bold drop-shadow-xl">
//           No wishlists added yet.
//         </div>
//       )}

//       <Modal
//         ModalId={"WishListModalEdit"}
//         ModalTitle="Edit A WishList"
//         ModalBtnTitle="Edit Wishlist">
//         <WishlistClient
//           wishlistId={wishlistId}
//           wishlists={wishlists}
//           triggerRefresh={triggerRefresh}
//         />
//       </Modal>
//     </div>
//   );
// }





"use client";
import { Trash2, Edit, Plus, Wand2, Eye } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { authService } from "../services/authService";
import ModalButton from "./ModalButton";
import Modal from "./Modal";
import WishlistClient from "./WishlistClient";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteWL } from "./Alerts";
import { wishlistService } from "../services/wishlistService";
import ShareButton from "./ShareButton";

type WishlistsProps = {
  jsonWebToken: string;
};

export interface WishLists {
  _id: string;
  title: string;
  description: string;
  wishes: string[];

}

export default function Wishlists() {
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [wishlists, setWishlists] = useState<WishLists[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistId, setWishListId] = useState("");

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    const storedUserId = authService.getUserId();
    if (!storedUserId) {
      router.push("/auth/login");
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const wishlists = await wishlistService.getWishLists(userId);
        setWishlists(wishlists);

        triggerRefresh?.();
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchWishlists();
  }, [userId, refreshKey]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Loading wishlists...
      </div>
    );

  return (
    <div className="mt-10 px-4 md:px-8 flex flex-col items-center justify-center w-full">
      {wishlists.length > 0 ? (
        <div className="w-full max-w-[1600px] rounded-lg overflow-hidden">
          <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
            <table className="min-w-full border text-sm md:text-base">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left font-semibold">
                    Title
                  </th>
                  <th className="px-2 md:px-4 py-3 text-left font-semibold whitespace-nowrap">
                    No. of Wishes
                  </th>
                  {userId && (
                    <th className="px-4 md:px-6 py-3 text-right font-semibold">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {wishlists.map((wishlist) => (
                  <div key={wishlist._id} className="contents">
                    <tr className="border-b hover:bg-blue-50 transition cursor-pointer">
                      <td className="px-4 md:px-6 py-3 text-blue-600 font-medium truncate">
                        {wishlist.title}
                      </td>
                      <td className="px-4 md:px-6 py-3 text-blue-600 font-medium">
                        {wishlist.wishes.length}
                      </td>
                      {userId && (
                        <td className="px-6 py-4">
                          <div className="flex justify-center sm:justify-end gap-2 sm:gap-3">
                            <Link
                              href={
                                userId
                                  ? `/wishlists/${wishlist._id}`
                                  : `/viewWishlists/${wishlist.title}`
                              }>
                              <Eye className="text-blue-600" />
                            </Link>

                            <Link
                              href={`/wishlists/${wishlist._id}/addWishes`}
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 sm:p-2 rounded-full hover:bg-green-100 text-green-600">
                              <Plus size={18} className="sm:w-5 sm:h-5" />
                            </Link>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setWishListId(wishlist._id);
                              }}
                              className="p-1.5 sm:p-2 rounded-full hover:bg-yellow-100 text-yellow-600">
                              <ModalButton
                                wishListModal={"WishListModalEdit"}
                                icon={
                                  <Edit size={18} className="sm:w-5 sm:h-5" />
                                }
                              />
                            </button>
                            {/* When they click this generate, it is just going to copy a link to the wiishlists for them */}
                            <Link
                              href={``}
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 sm:p-2 rounded-full hover:bg-purple-100 text-purple-600">
                              {/* <Wand2 size={18} className="sm:w-5 sm:h-5" /> */}

                              <ShareButton
                                wishlistId={wishlist._id}
                                title={wishlist.title}
                                icon={
                                  <Wand2 size={18} className="sm:w-5 sm:h-5" />
                                }
                              />
                            </Link>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                deleteWL(wishlist._id, userId, triggerRefresh);
                              }}
                              className="p-1.5 sm:p-2 rounded-full hover:bg-red-100 text-red-600">
                              <Trash2 size={18} className="sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-semibold text-gray-600">
          No wishlists added yet.
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        ModalId={"WishListModalEdit"}
        ModalTitle="Edit A WishList"
        ModalBtnTitle="Edit Wishlist">
        <WishlistClient
          wishlistId={wishlistId}
          wishlists={wishlists}
          triggerRefresh={triggerRefresh}
        />
      </Modal>
    </div>
  );
}
