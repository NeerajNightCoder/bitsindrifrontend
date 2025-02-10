"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ProfilePic = ({ profilePicUrl, name }: { profilePicUrl: string; name: string }) => {
  const [size, setSize] = useState(50);
  const [zIndex, setZIndex] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null); // Use ref for the image

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (imgRef.current && !imgRef.current.contains(event.target as Node)) {
        setSize(50); // Reset size when clicking outside
        setZIndex(1); // Reset size when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {profilePicUrl ? (
        <Image
          ref={imgRef} // Attach ref to Image component
          alt="profile_pic"
          className="rounded-full"
          src={profilePicUrl}
          width={size}
          height={size}
          onClick={(e) => {
            e.stopPropagation(); // Prevent immediate closing when clicking image
            setSize(100);
            setZIndex(100)
          }}
        />
      ) : (
        <span className="size-12 font-bold text-2xl bg-orange-300 rounded-full flex justify-center items-center">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default ProfilePic;
