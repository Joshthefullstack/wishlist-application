// import Image from "next/image";
// import birthdayImage from "../../../public/office-coworkers-celebrating-event-with-balloons.jpg";
// import Link from "next/link";
// import Button from "@/app/components/Button";
// import Form from "@/app/components/Form";
// import LoginClient from "@/app/components/LoginClient";

// const Login = () => {


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
//           <fieldset className="fieldset w-96  bg-base-200 border-base-300 rounded-box w-xs border shadow-2xl max-w-sm p-4">
//             <legend className="fieldset-legend text-lg">Welcome Back</legend>

//             <LoginClient />

//             <div className="mt-3 flex items-center gap-14">
//               <p className="">
//                 Don't have an account?{" "}
//                 <Link href={"/auth/signup"} className="text-blue-500">
//                   Sign Up
//                 </Link>
//               </p>
//               <div>
//                 <a className="link link-hover">Forgot password?</a>
//               </div>
//             </div>
//           </fieldset>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Login;



// import Image from "next/image";
// import birthdayImage from "../../../public/office-coworkers-celebrating-event-with-balloons.jpg";
// import Link from "next/link";
// import LoginClient from "@/app/components/LoginClient";

// const Login = () => {
//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-12 gap-10 md:gap-10">
//       {/* Image Section */}
//       <div className="w-full md:w-1/2 flex justify-center">
//         <Image
//           src={birthdayImage}
//           alt="Office celebration"
//           className="rounded-lg object-cover w-full h-[250px] md:h-[500px] shadow-md"
//           priority
//         />
//       </div>

//       {/* Form Section */}
//       <div className="w-full md:w-[400px] border border-gray-200 rounded-xl shadow-lg p-6 md:p-8">
//         <fieldset className="fieldset">
//           <legend className="text-2xl font-semibold text-center mb-4">
//             Welcome Back 🎉
//           </legend>

//           <LoginClient />

//           <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center gap-3 text-sm">
//             <p className="text-center md:text-left">
//               Don’t have an account?{" "}
//               <Link href="/auth/signup" className="text-blue-600 font-medium">
//                 Sign Up
//               </Link>
//             </p>

//             <a
//               href="#"
//               className="text-blue-500 hover:underline text-center md:text-right">
//               Forgot password?
//             </a>
//           </div>
//         </fieldset>
//       </div>
//     </div>
//   );
// };

// export default Login;



import Image from "next/image";
import birthdayImage from "../../../public/office-coworkers-celebrating-event-with-balloons.jpg";
import Link from "next/link";
import LoginClient from "@/app/components/LoginClient";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#06090f] text-white">
      {/* Left Section with Image & Text Overlay */}
      <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
        <Image
          src={birthdayImage}
          alt="Birthday celebration"
          fill
          className="object-cover brightness-90 rounded-none md:rounded-r-lg"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            "Let's help make your birthday special"
          </h1>
          <p className="text-base md:text-lg text-gray-200 max-w leading-relaxed">
            Celebrate your special day by creating a wishlist to share to your
            friends and families, let your loved ones know you what you would
            like for your special day.
          </p>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center px-6 md:px-12 py-10">
        <div className="w-full max-w-sm bg-[#010b23] p-8 rounded-2xl shadow-xl">
          <fieldset>
            <legend className="text-2xl font-semibold text-center mb-6">
              Welcome Back 🎉
            </legend>

            <LoginClient />

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
              <p className="text-gray-300 text-center md:text-left">
                Don’t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-400 font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
              <a
                href="#"
                className="text-blue-400 hover:underline text-center md:text-right">
                Forgot password?
              </a>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;

