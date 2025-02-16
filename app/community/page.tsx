"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import Image from "next/image";
import PostCard from "../components/Community/PostCard";

interface Profile {
  id: string;
  name: string;
  email: string;
  profileimg: string | null;
  about: string | null;
  dept: string;
}

interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

const Community = () => {
  const [activeTab, setActiveTab] = useState("people");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const {  userProfile } = useUser();
  const departments = ["All", "Civil", "Electrical", "ECE", "Mechanical", "IT"];
  const [searchName, setSearchName] = useState("");
  const [searchDept, setSearchDept] = useState("All");


  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("profiles").select("id, name, email, profileimg, about, dept");
      if (error) console.error("Error fetching profiles:", error);
      else setProfiles(data || []);
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
  .from("posts")
  .select("id, content, image_url, created_at, user_id, profiles(id, name, profileimg)")
  .order("created_at", { ascending: false });

if (error) {
  console.error("Error fetching posts:", error);
}

      if (error) console.error("Error fetching posts:", error);
      else setPosts(data || []);
      console.log(data[0])
    };
    fetchPosts();
  }, []);


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
      
      <div className="flex space-x-4 mb-6 border-b pb-2">
        <button className={`px-4 py-2 ${activeTab === "people" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("people")}>
          People
        </button>
        <button className={`px-4 py-2 ${activeTab === "posts" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("posts")}>
          Posts
        </button>
      </div>
      
      {activeTab === "people" ? (
        <>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profiles.filter(filterProfiles).map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
        </div>
            </>
      ) : (
        <div className="space-y-4">
          {posts.length === 0 ? (
              <p className="text-center text-gray-600">No posts yet.</p>
            ) : (
                posts.map((post) => <PostCard key={post.id} post={post} userId={userProfile?.id} />)
            )}
        </div>
      )}
    </div>
  );
};

const ProfileCard = ({ profile }: { profile: Profile }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <div className="flex flex-col items-center">
      <Image width={100} height={100} src={profile.profileimg || "/default-avatar.png"} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" />
      <h2 className="text-lg font-semibold mt-2">{profile.name}</h2>
      <p className="text-sm text-gray-600 text-center">{profile.dept}</p>
      <p className="text-sm text-gray-600 text-center">{profile.about || "No bio available."}</p>
      <Link href={`/profile/${profile.id}`}>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Profile</button>
      </Link>
    </div>
  </div>
);

// const PostCard = ({ post }) => {
//     console.log("###############",post)
//     return (
//       <div className="bg-white shadow-lg rounded-lg p-4">
//        <Link href={`profile/${post.user_id}`}>
//         <div className="flex items-center gap-3">
//           <Image width={100 } height={100}
//             src={post.profiles?.profileimg}
//             alt={post.profiles?.name}
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div>
//             <h3 className="font-semibold">{post.profiles?.name}</h3>
//           </div>
//         </div>
//         </Link>
//         <p className="mt-2">{post.content}</p>
//         {post.image_url && (
//           <img
//             src={post.image_url}
//             alt="Post"
//             className="w-full h-40 object-cover rounded mt-2"
//           />
//         )}
//             <p className="text-sm text-gray-500">
//               {new Date(post.created_at).toLocaleString()}
//             </p>
//       </div>
//     );
//   };
  

export default Community;
