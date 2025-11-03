// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { authService } from "../services/authService";
// import Swal from "sweetalert2";
// import Link from "next/link";
// import { wishService } from "../services/wishService";

// export interface WishItem {
//   _id: string;
//   title: string;
//   description: string;
//   price: string;
//   imgUrl: string;
//   gifters: string[];
// }

// type WishesProps = {
//   wishlistId: string;
// };

// const Wishes = ({ wishlistId }: WishesProps) => {
//   const [userId, setUserId] = useState<string>("");
//   const router = useRouter();
//   const [refreshKey, setRefreshKey] = useState(0);

//   const [edit, setEdit] = useState<boolean>(false);

//   const triggerRefresh = () => {
//     setRefreshKey((prev) => prev + 1);
//   };

//   const goToEdit = (wishId: string) => {
//     router.push(`/wishlists/${wishlistId}/edit/${wishId}`);
//   };

//   useEffect(() => {
//     const storedUserId = authService.getUserId();
//     if (!storedUserId) {
//       router.push("/auth/login");
//     } else {
//       setUserId(storedUserId);
//     }
//   }, [router]);

//   const [wishes, setWishes] = useState<WishItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [wishId, setWishId] = useState("");

//   const deleteWishAlert = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-success",
//       cancelButton: "btn btn-danger",
//     },
//     buttonsStyling: false,
//   });

//   const deleteWish = async (
//     wishId: string,
//     wishlistId: string,
//     triggerRefresh?: () => void
//   ) => {
//     const result = await deleteWishAlert.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//       reverseButtons: true,
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/wishes/delete/${wishId}`,
//           {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ wishlistId }),
//           }
//         );

//         await deleteWishAlert.fire({
//           title: "Deleted!",
//           text: "Your wish has been deleted.",
//           icon: "success",
//         });
//         triggerRefresh?.();
//       } catch (err) {
//         console.error(err);
//       }
//     } else if (result.dismiss === "cancel") {
//       await deleteWishAlert.fire({
//         title: "Cancelled",
//         text: "Your wish is safe 🙂",
//         icon: "error",
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchWishes = async () => {
//       try {
//         const wishes = await wishService.getWishes(wishlistId);
//         // console.log("Updated wwishlists", data);
//         setWishes(wishes);
//         triggerRefresh?.();
//       } catch (err) {
//         console.error("Failed to fetch:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishes();
//   }, [userId, refreshKey]);

//   //  If I want to add a functionality, where someone that has promised to get you a gift, would write down their name.
//   // so for the person viewing the wishes, they can write down their name that they want to get this person this gift, and when they reserve their name.
//   // And when the owner of the account logs in, they can see the number of people who have reserved to get them the gifts.

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-60 text-gray-500">
//         Loading wishlists...
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-4 mt-14">
//       {wishes.length > 0 ? (
//         wishes.map((wish) => (
//           <div
//             className="collapse collapse-arrow bg-slate-100 border border-base-300"
//             key={wish._id}
//           >
//             <input type="radio" name="my-accordion-2" />
//             <div className="collapse-title font-semibold text-blue-900">
//               {wish.title}
//             </div>

//             <div className="collapse-content text-sm flex flex-col gap-1 text-blue-900">
//               <span className="">Why I need this {wish.title}?</span>
//               <span>{wish.description}</span>
//               <span>
//                 <b>Price: ₦{wish.price}</b>
//               </span>
//               <span>Who is getting this gift for me?</span>
//               {wish.gifters.map((getter) => (
//                 <span key={getter}>
//                   {getter.length > 0
//                     ? getter
//                     : "No one has volunteered to get this gift for you yet."}
//                 </span>
//               ))}
//               <Image
//                 src={`https://wishlist-application-backend.onrender.com${wish.imgUrl}`}
//                 alt={wish.title}
//                 width={200}
//                 height={200}
//                 className="mt-5 mb-3"
//               />
//               <div className="flex gap-3 mt-3">
//                 <button
//                   className="btn btn-warning"
//                   onClick={() => goToEdit(wish._id)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-error"
//                   onClick={() => {
//                     deleteWish(wish._id, wishlistId, triggerRefresh);
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>
//           <h3 className="relative z-10 text-3xl md:text-3xl mt-10 font-bold drop-shadow-lg text-center">
//             No wish added yet.
//           </h3>
//         </div>
//       )}

//       <div className="flex justify-end mr-10 sm:justify-end w-full relative">
       

//         <Link href={"/wishlists"} className="btn btn-error">
//           Go Back
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Wishes;







"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";
import Swal from "sweetalert2";
import Link from "next/link";
import { wishService } from "../services/wishService";

export interface WishItem {
  _id: string;
  title: string;
  description: string;
  price: string;
  imgURL: string;
  gifters: string[];
}

type WishesProps = {
  wishlistId: string;
};

const Wishes = ({ wishlistId }: WishesProps) => {
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);


    const deleteWishAlert = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
    
      const deleteWish = async (
        wishId: string,
        wishlistId: string,
        triggerRefresh?: () => void
      ) => {
        const result = await deleteWishAlert.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        });
    
        if (result.isConfirmed) {
          try {
           
            await wishService.deleteWish(wishId, wishlistId);

            await deleteWishAlert.fire({
              title: "Deleted!",
              text: "Your wish has been deleted.",
              icon: "success",
            });
            triggerRefresh?.();
          } catch (err) {
            console.error(err);
          }
        } else if (result.dismiss === "cancel") {
          await deleteWishAlert.fire({
            title: "Cancelled",
            text: "Your wish is safe 🙂",
            icon: "error",
          });
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
    if (!mounted || !userId) return;
    const fetchWishes = async () => {
      try {
        const wishes = await wishService.getWishes(wishlistId);
        setWishes(wishes);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishes();
  }, [mounted, userId, wishlistId, refreshKey]);

  if (!mounted) return null; // prevent SSR mismatch

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Loading wishes...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 mt-14">
      {wishes.length > 0 ? (
        wishes.map((wish) => (
          <div
            className="collapse collapse-arrow bg-slate-100 border border-base-300"
            key={wish._id}
          >
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold text-blue-900">
              {wish.title}
            </div>
            <div className="collapse-content text-sm flex flex-col gap-1 text-blue-900">
              <span>Why I need this {wish.title}?</span>
              <span>{wish.description}</span>
              <span>
                <b>Price: ₦{wish.price}</b>
              </span>
              <span>Who is getting this gift for me?</span>
              {wish.gifters.map((getter) => (
                <span key={getter}>
                  {getter.length > 0
                    ? getter
                    : "No one has volunteered to get this gift for you yet."}
                </span>
              ))}
              {wish.imgURL && (
                <img
                  src={`https://wishlist-application-backend.onrender.com${wish.imgURL}`}
                  alt={wish.title}
                  width={200}
                  height={200}
                  className="mt-5 mb-3"
                />
              )}
              <div className="flex gap-3 mt-3">
                <button
                  className="btn btn-warning"
                  onClick={() => router.push(`/wishlists/${wishlistId}/edit/${wish._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() =>
                    deleteWish(wish._id, wishlistId, () =>
                      setRefreshKey((k) => k + 1)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h3 className="text-3xl font-bold text-center mt-10">
            No wish added yet.
          </h3>
        </div>
      )}
      <div className="flex justify-end mr-10">
        <Link href="/wishlists" className="btn btn-error">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Wishes;
