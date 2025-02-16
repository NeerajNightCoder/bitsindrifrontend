'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import { User } from '@supabase/supabase-js';

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
  accountstatus: 'active' | 'inactive' | 'banned';
  created_at: string;
}

// Context Type
interface UserContextType {
  supabaseUser: User | null; // Raw Supabase user session
  userProfile: UserProfile | null; // Data from 'profiles' table
  loading: boolean;
}

// Create Context
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      // Get Supabase User Session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        console.error("Session Error:", sessionError);
        setSupabaseUser(null);
        setUserProfile(null);
        setLoading(false);
        return;
      }

      const user = session.user;
      setSupabaseUser(user);
      console.log(user.id)

      // Fetch Profile Data from 'profiles' table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, email, dept, followers, following, about, profileimg, accountstatus, created_at")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Profile Fetch Error:", profileError);
        setUserProfile(null);
      } else {
        setUserProfile(profile);
      }

      setLoading(false);
    };

    getUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ supabaseUser, userProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use User Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
