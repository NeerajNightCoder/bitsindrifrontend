"use client"; // Required for Next.js client components

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabase";

const UpdateProfileForm = ({ userId }: { userId: string }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    dept: "",
    about: "",
    profileimg: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Fetch existing profile data when component loads
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name, email, dept, about, profileimg")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [userId]);

  // 🔹 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // ✅ Update profile in Supabase
    const { error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("id", userId);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Profile updated successfully!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          className="p-2 border rounded-md"
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          className="p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          disabled
        />
        
        <input
          type="text"
          name="dept"
          placeholder="Department"
          value={profile.dept}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        <textarea
          name="about"
          placeholder="Tell us about yourself"
          value={profile.about}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        <input
          type="text"
          name="profileimg"
          placeholder="Profile Image URL"
          value={profile.profileimg}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
};

export default UpdateProfileForm;
