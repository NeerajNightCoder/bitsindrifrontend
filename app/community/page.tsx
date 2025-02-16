"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";
import { useUser } from "@/context/userContext";

interface Profile {
  id: string;
  name: string;
  email: string;
  profileimg: string | null;
  about: string | null;
  dept: string;
}

const departments = ["All", "Civil", "Electrical", "ECE", "Mechanical", "IT"];

const Community = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [following, setFollowing] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchDept, setSearchDept] = useState("All");

  const { supabaseUser } = useUser(); // Get logged-in user

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, profileimg, about, dept");

      if (error) {
        console.error("Error fetching profiles:", error);
      } else {
        setProfiles(data || []);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    if (!supabaseUser) return;

    const fetchFollowing = async () => {
      const { data, error } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", supabaseUser.id);

      if (error) {
        console.error("Error fetching following list:", error);
        return;
      }

      const followingIds = data.map((item) => item.following_id);

      if (followingIds.length > 0) {
        const { data: followingProfiles, error: profileError } = await supabase
          .from("profiles")
          .select("id, name, email, profileimg, about, dept")
          .in("id", followingIds);

        if (profileError) {
          console.error("Error fetching following profiles:", profileError);
        } else {
          setFollowing(followingProfiles || []);
        }
      }
    };

    fetchFollowing();
  }, [supabaseUser]);

  // Filter function
  const filterProfiles = (profile: Profile) => {
    return (
      profile.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchDept === "All" || profile.dept === searchDept)
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Community</h1>

      {/* Search Fields */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
        />
        <select
          value={searchDept}
          onChange={(e) => setSearchDept(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center">Loading users...</p>}

      {/* People You Follow */}
      {following.filter(filterProfiles).length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">People You Follow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {following.filter(filterProfiles).map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      )}

      {/* All Users */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profiles.filter(filterProfiles).map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ profile }: { profile: Profile }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <div className="flex flex-col items-center">
      <img
        src={profile.profileimg || "/default-avatar.png"}
        alt={profile.name}
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
      />
      <h2 className="text-lg font-semibold mt-2">{profile.name}</h2>
      <p className="text-sm text-gray-600 text-center">{profile.dept}</p>
      <p className="text-sm text-gray-600 text-center">
        {profile.about || "No bio available."}
      </p>
      <Link href={`/profile/${profile.id}`}>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Profile
        </button>
      </Link>
    </div>
  </div>
);

export default Community;
