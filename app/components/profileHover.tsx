import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


import { useUser } from '@/context/userContext';


const ProfileHover=()=>{
    const [hover,setHover]=useState(false)
    const {  userProfile } = useUser();
    console.log(userProfile)
    return(
        <><div className="avatar">
            <Image src={userProfile?.profileimg||""} width={1280} height={1280} alt="avatar" onMouseEnter={()=>setHover(true)}  />
        </div>{hover&&<ul onMouseLeave={()=>setHover(false)} className="profile-hover p-5 absolute right-0 z-10">
                <li><Link href="/profile">View Profile</Link></li>
                <li>Dark Mode</li>
                <li>Settings</li>
                <li>Log out</li>
            </ul>}</>
    )
}

export default ProfileHover