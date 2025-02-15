import Link from "next/link"

const ProfileHover=()=>{
    return(
        <ul className="profile-hover p-5 absolute right-0 z-10">
            <li><Link href="/profile">View Profile</Link></li>
            <li>Dark Mode</li>
            <li>Settings</li>
            <li>Log out</li>
        </ul>
    )
}

export default ProfileHover