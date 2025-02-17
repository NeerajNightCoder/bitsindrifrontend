"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supabase";
import Cookies from "js-cookie"; // For setting cookies
import Image from "next/image";

export default function AuthPage() {
  const [user, setUser] = useState<any>(null);
  const supabase=createClient()

  useEffect(() => {
    // 🔹 Load session from cookies on page reload
    const storedSession = Cookies.get("supabase_session");
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      console.log('parsedsession',parsedSession.user)
      setUser(parsedSession.user);
    }

    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Fetched session:", session);

      if (session?.user) {
        setUser(session.user);
        console.log('session',session.user);
        Cookies.set("supabase_session", JSON.stringify(session), {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          Cookies.set("supabase_session", JSON.stringify(session), { expires: 7 });
        } else {
          setUser(null);
          Cookies.remove("supabase_session");
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [supabase]);

  const signInWithGoogle = async () => {
    console.log("Initiating Google Sign-In...");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "select_account", // Forces Google to show account selection
        },
      },
    });
  
    if (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };
  
  
  

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign-Out Error:", error.message);
    } else {
      setUser(null);
      Cookies.remove("supabase_session");
    }
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
                src={user.user_metadata.avatar_url||'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
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
