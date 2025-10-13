// import React from "react";
// import Image from "next/image";
// import birthdayImage from "../../../public/couples-celebrating-birthday.jpg";
// import Link from "next/link";
// import SignUpClient from "@/app/components/SignUpClient";


// const SignUp = () => {
//   return (
//     <div className="flex justify-start gap-24 items-center min-h-screen">
//       <Image
//         src={birthdayImage}
//         alt=""
//         className="w-80px m-3 rounded-md"
//         width={1300}
//       />

//       <div>
//         <div>
//           <fieldset className="fieldset w-96 mt-0 ml-0  bg-base-200 border-base-300 rounded-box w-xs border p-4">
//             <legend className="fieldset-legend text-lg">Create Account</legend>

//             <SignUpClient />

//             <p className="mt-3">
//               Already signed up?{" "}
//               <Link href={"/auth/login"} className="text-blue-500">
//                 Login
//               </Link>
//             </p>
//           </fieldset>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;




"use client";

import React from "react";
import Image from "next/image";
import birthdayImage from "../../../public/couples-celebrating-birthday.jpg";
import Link from "next/link";
import SignUpClient from "@/app/components/SignUpClient";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#06090f] text-white">
      {/* Left Section with Image & Text Overlay */}
      <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
        <Image
          src={birthdayImage}
          alt="Couple celebrating birthday"
          fill
          className="object-cover brightness-90 rounded-none md:rounded-r-lg"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            "Make Every Gift Count"
          </h1>
          <p className="text-base md:text-lg text-gray-200 max-w-md leading-relaxed">
            Join the celebration! Create wishlists that make birthdays more
            meaningful for you and your loved ones 🎈
          </p>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center px-6 md:px-12 py-10">
        <div className="w-full max-w-sm bg-[#010b23] p-8 rounded-2xl">
          <fieldset>
            <legend className="text-2xl font-semibold text-center mb-6">
              Create Account
            </legend>

            <SignUpClient />

            <p className="mt-6 text-sm text-gray-300 text-center">
              Already signed up?{" "}
              <Link
                href="/auth/login"
                className="text-blue-400 font-medium hover:underline">
                Login
              </Link>
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

