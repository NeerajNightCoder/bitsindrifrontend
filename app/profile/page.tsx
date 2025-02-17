// 'use client'
import { redirect } from 'next/navigation'
import Image from "next/image"
import './profile.css'
import {createClient} from '@/lib/supabase/server'
import UpdateProfileForm from './update';

const Profile=async ()=>{
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        console.log(data)
      redirect('/login')
    }
  
     const { data: { session } } = await supabase.auth.getSession();
     const user=session?.user
     console.log(session)
     const userId=user?.id

     const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (profileError) {
        console.log("Profile Fetch Error:", profileError);
        redirect('/login'); // Redirect if no profile found
    }






    return (
        <div className="w-full">
            <div className="flex gap-4 items-center relative w-1/2 m-auto ">    
                <Image className="rounded-full" alt="" width={100} height={100} src={profile.profileimg || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}/>
                <div className="flex flex-col gap-2"><h1 className="fullname">{profile?.name}</h1>
                <h2 className="info">{profile.dept} | Full stack developer</h2>
                <h2 className="socialstats"><span>35 Followers</span><span>37 Following</span></h2>
                <h3>Secretary (HnCC BIT Sindri . March 2024 - Present)</h3>
                </div>
                <button className="editBtn absolute right-0 bottom-0" >Edit My Profile</button>
                </div>
                {user?.id&&<UpdateProfileForm userId={user.id}/>}
        </div>
    )
}

export default Profile
export const dynamic = 'force-dynamic'