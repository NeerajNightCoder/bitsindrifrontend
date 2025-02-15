"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AuthPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await saveUserProfile(session.user); // Ensure profile is updated
      }
    };

    fetchUser();

    // Listen for auth state changes (should be outside signInWithGoogle)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await saveUserProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe() // Correct cleanup
    };
  }, []);

  // Function to save user profile to Supabase
  const saveUserProfile = async (user: any) => {
    console.log("Saving user profile...");
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: user.user_metadata.full_name || user.email,
      avatar_url: user.user_metadata.avatar_url || "",
      email: user.email,
    });

    if (error) console.error("Error saving profile:", error.message);
    else console.log("User profile saved/updated successfully!");
  };

  const signInWithGoogle = async () => {
    console.log("1. Initiating Google Sign-In...");
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });
  
    if (error) {
      console.error("Google Sign-In Error:", error.message);
      return;
    }
  
    // ✅ Wait until authentication is completed
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      console.log("2. Authentication successful, saving profile...");
      await saveUserProfile(session.user);
      setUser(session.user); // Ensure UI updates
    }
  };
  

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign-Out Error:", error.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-full max-w-md">
        {user ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-700">
              Welcome, {user.user_metadata.full_name} 👋
            </h2>
            {user.user_metadata.avatar_url && (
              <Image
                src={user.user_metadata.avatar_url}
                alt="User Avatar"
                width={80}
                height={80}
                className="rounded-full mx-auto mt-4"
              />
            )}
            <p className="text-gray-500 mt-2">You are now logged in.</p>
            <button
              onClick={signOut}
              className="mt-6 w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-700">
              You need to be logged in to proceed
            </h2>
            <p className="text-gray-500 mt-2">Please sign in with Google to continue.</p>
            <button
              onClick={signInWithGoogle}
              className="mt-6 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
            >
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}
