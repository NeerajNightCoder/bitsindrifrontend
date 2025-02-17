'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/userContext";
import { createClient } from "@/lib/supabase/supabase";
import Cookies from "js-cookie";

const ProfileHover = () => {
  const [hover, setHover] = useState(false);
  const { userProfile } = useUser();
  console.log(userProfile)
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const supabase=createClient()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setHover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      Cookies.remove("supabase_session"); // Remove session cookie
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>{userProfile?<div className="relative" ref={dropdownRef}>
    <div className="avatar cursor-pointer" onMouseEnter={() => setHover(true)}>
      <Image
        src={userProfile?.profileimg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        width={40}
        height={40}
        className="rounded-full border-2 border-gray-300"
        alt="User Avatar"
      />
    </div>

    {hover && (
      <ul
        onMouseLeave={() => setHover(false)}
        className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-10"
      >
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link href="/profile">View Profile</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dark Mode</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
        <li
          onClick={handleLogout}
          className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
        >
          Log out
        </li>
      </ul>
    )}
  </div>:(
              <Link href="/login" className="btn btn-green">Login</Link>
            )}</>
  );
};

export default ProfileHover;
