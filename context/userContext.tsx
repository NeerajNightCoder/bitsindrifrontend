"use client";

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie"; // Import for cookie handling
import { createClient } from "@/lib/supabase/supabase";
import { User } from "@supabase/supabase-js";

// Define Profile Type
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  dept?: string;
  followers: number;
  following: number;
  about?: string;
  profileimg?: string;
  accountstatus: "active" | "inactive" | "banned";
  created_at: string;
}

// Context Type
interface UserContextType {
  supabaseUser: User | null; // Raw Supabase user session
  userProfile: UserProfile | null; // Data from 'profiles' table
  loading: boolean;
  setUserProfile:Dispatch<SetStateAction<UserProfile | null>>
}

// Create Context
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const sessionCookie = Cookies.get("supabase_session");
  const supabase=createClient()
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      // ✅ Get session from cookies instead of API
      if (!sessionCookie) {
        console.log("No session cookie found");
        setSupabaseUser(null);
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        const session = JSON.parse(sessionCookie);
        setSupabaseUser(session.user);
        console.log("User ID from cookie:", session.user.id);

        // ✅ Fetch Profile Data from 'profiles' table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, name, email, dept, followers, following, about, profileimg, accountstatus, created_at")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Profile Fetch Error:", profileError);
          setUserProfile(null);
        } else {
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Error parsing session:", error);
        setSupabaseUser(null);
        setUserProfile(null);
      }

      setLoading(false);
    };

    getUser();

    // ✅ Listen for auth state changes (e.g., login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        Cookies.set("supabase_session", JSON.stringify(session), { expires: 7 });
      } else {
        setSupabaseUser(null);
        setUserProfile(null);
        Cookies.remove("supabase_session");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [sessionCookie]);

  return (
    <UserContext.Provider value={{ supabaseUser, userProfile, loading,setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use User Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
