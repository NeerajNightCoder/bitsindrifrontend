"use client";

import "./globals.css";
import Sidebar from "./components/Sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Avatar from "@/app/assets/elon.webp";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

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

  useEffect(() => {
    // Fetch auth user
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) await saveUserProfile(session.user); // Ensure profile is updated
      if (data?.user) {
        setUser(data.user);
      }
    };
    getUser();


    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Login error:", error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA21BMVEVHcEz///////////////////////////////////////////////8BgkPOwgXl4K/g0xn6+/+9miPiAifp2wDHvBz87cLmFCjYywZumTDPIif19vvs6+UMh0O0xbuoqygmjkXVy1nROyfAdh3v7/Lj3aGslxrDtRLWzba7rwfODSDf1sjLUib56LSZmCJnWBTgcmwAdyzg12QAfzX58taXtaHzrpDR19X46QC7UyPl5tuncSbcAAf9++pNkGeFrzPYp6qJfyM5SyvFxZDSS1FOlTyzuXRlmXvKXQBTHkJPAAAADHRSTlMAYmBCJFyiRErwnJtNAP3+AAABeElEQVQ4jY2T6XaCQAyF26q1tswgsgyLIjuCuOGOW/f2/Z+oQY51AE/r/TWZfCe5A8nNzXWq1kuqUum7BnNBjdopf38pneoxy99SVzNpt6PCrAZdX2KlGd3l6I8uOhgvJDpOnT4UgAEdV4qAtJByFep5YKnPjb2uty8BnMuCPhXQW3piuQKgYXkkCFgUfVFewRGXATwSm5nk4EUuA5438lqgLmj4OhwWASYMyZpXVR6l6iBUesX7mlg22QBgGADsS8DYjsiGWBtkiH4XTecloL9dkygiFjq0RL8zXZYALoxUvgUeDFE8nCzkvuTztgsAQejDU04dcgCnqpFlg0llqJwKUEA7ARc23wrhBcZkySROAej1ocm3Zdmo05noEPcKgCsA0YMSCKX5vuAWgERYmRrjjMPJl8No5krI/nnlPHKa6eOYTXr6jI1xAPBRVWpoHRN7GAeyHwSymVnMhvY89m03bmKhGbu/I1UrLw7HUcHTtav3//L+pR+KVj35oODCWgAAAABJRU5ErkJggg=="
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="page-header">
          <div className="brand">
            <Link href="/">
              <p>BitSindri</p>
            </Link>
          </div>
          <Link href="/profile">
          <div className="avatar">
            <Image src={Avatar} width={1280} height={1280} alt="avatar" />
          </div>
          </Link>
          <div>
            {user ? (
              <>
                <p>Welcome, {user.email}</p>
                <button onClick={handleLogout} className="btn btn-red">Logout</button>
              </>
            ) : (
              <button onClick={handleLogin} className="btn btn-green">Login with Google</button>
            )}
          </div>
        </div>

        <div className="flex">
          <Sidebar />
          <div className="pagecontent relative bg-cyan-700 p-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
