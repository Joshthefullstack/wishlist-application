"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import ProfileIcon from "../../public/profile-icon.png";
import Link from "next/link";

const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* Profile Dropdown */}
      <div className="absolute top-4 right-6">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <Image
              src={ProfileIcon} // replace with your profile image path
              alt="Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-10">
              <Link
                href={"/auth/login"}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
