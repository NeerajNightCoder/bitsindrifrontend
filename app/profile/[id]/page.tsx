"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase";
import Image from "next/image";
import '@/app/profile/profile.css'
import { useUser } from "@/context/userContext";

interface PublicProfile {
  id: string;
  name: string;
  email: string;
  profileimg: string | null;
  about: string | null;
  followers: number;
  following: number;
  dept:string;
}

const ProfilePage = () => {
  const supabase=createClient()
  const { id } = useParams(); // Get profile ID from the URL
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
      const {  supabaseUser } = useUser();

  const [isFollowing, setIsFollowing] = useState(false);
  

useEffect(() => {
  if (!profile || !supabaseUser) return;

  const checkFollowStatus = async () => {
    const { data } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", supabaseUser.id)
      .eq("following_id", profile.id)
      .single();

    setIsFollowing(!!data);
  };

  checkFollowStatus();
}, [ profile,supabaseUser,supabase]);


  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, profileimg, about, followers, following, dept")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [id,supabase]);


  const handleFollow = async () => {
    if (!supabaseUser) return alert("You must be logged in!");
    if(!profile) return
  
    if (isFollowing) {
      // Unfollow the user
      await supabase
        .from("follows")
        .delete()
        .eq("follower_id", supabaseUser.id)
        .eq("following_id", profile?.id);
  
      setIsFollowing(false);
    } else {
      // Follow the user
      await supabase
        .from("follows")
        .insert([{ follower_id: supabaseUser.id, following_id: profile.id }]);
  
      setIsFollowing(true);
    }
  };
  


  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  

  useEffect(() => {
    if (!profile) return;
  
    const fetchCounts = async () => {
      // Fetch followers count
      const { count: followersCount, error: followersError } = await supabase
        .from("follows")
        .select("id", { count: "exact" })
        .eq("following_id", profile.id);
  
      if (!followersError) setFollowersCount(followersCount || 0);
  
      // Fetch following count
      const { count: followingCount, error: followingError } = await supabase
        .from("follows")
        .select("id", { count: "exact" })
        .eq("follower_id", profile.id);
  
      if (!followingError) setFollowingCount(followingCount || 0);
    };
  
    fetchCounts();
  }, [profile, isFollowing,supabase]);
  


  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!profile) return <p className="text-center text-red-500">User not found.</p>;


  

  return (<div className="w-full">
        <div className="flex gap-4 items-center relative w-1/2 m-auto ">
          <Image className="rounded-full" alt="" width={100} height={100} src={profile.profileimg||"https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
          <div className="flex flex-col gap-2"><h1 className="fullname">{profile?.name}</h1>
            <h2 className="info">{profile.dept} | Full stack developer</h2>
            <h2 className="socialstats"><span>{followersCount} Followers</span><span>{followingCount} Following</span></h2>
            <h3>Secretary (HnCC BIT Sindri . March 2024 - Present)</h3>
          </div>
          <button
  className={`px-4 py-2 text-white rounded ${
    isFollowing ? "bg-red-500" : "bg-blue-500"
  }`}
  onClick={handleFollow}
>
  {isFollowing ? "Unfollow" : "Follow"}
</button>

        </div>
      </div>
  );
};

export default ProfilePage;
