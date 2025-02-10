import Image from "next/image";
import TelePhone from '@/app/assets/icons/telephone-fill 1.png'
const ContactTable=({categoryFilter}:{categoryFilter:string})=>{
    const contacts= [
        {
          name: "Dr. Aisha Khan",
          category: "Emergency",
          specialization: "Cardiologist",
          phone: "+91 9876543210",
          email: "aisha.khan@example.com",
          profilePic: "https://th.bing.com/th/id/OIP.5KNXh6kstSXx9Hg3_XrCXwAAAA?w=166&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          name: "John Smith",
          category: "Admin",
          specialization: "Software Engineer",
          phone: "+1 234 567 8901",
          email: "john.smith@example.com",
          profilePic: "https://th.bing.com/th/id/OIP.5KNXh6kstSXx9Hg3_XrCXwAAAA?w=166&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          name: "Emily Johnson",
          category: "Admin",
          specialization: "Corporate Law",
          phone: "+44 789 654 3210",
          email: "emily.johnson@example.com",
          profilePic: "",
        },
        {
          name: "Dr. Rajesh Verma",
          category: "Emergency",
          specialization: "Neurologist",
          phone: "+91 9876504321",
          email: "rajesh.verma@example.com",
          profilePic: "https://th.bing.com/th/id/OIP.5KNXh6kstSXx9Hg3_XrCXwAAAA?w=166&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          name: "Sophia Martinez",
          category: "Maintenance",
          specialization: "Graphic Designer",
          phone: "+33 456 789 012",
          email: "sophia.martinez@example.com",
          profilePic: "https://th.bing.com/th/id/OIP.5KNXh6kstSXx9Hg3_XrCXwAAAA?w=166&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          name: "Michael Lee",
          category: "Transport",
          specialization: "Mathematics",
          phone: "+61 423 567 890",
          email: "michael.lee@example.com",
          profilePic: "https://th.bing.com/th/id/OIP.5KNXh6kstSXx9Hg3_XrCXwAAAA?w=166&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          name: "Olivia Brown",
          category: "Transport",
          specialization: "Astrophysics",
          phone: "+1 908 234 5678",
          email: "olivia.brown@example.com",
          profilePic: "",
        },
        {
          name: "Dr. Vikram Patel",
          category: "Admin",
          specialization: "Orthopedic Surgeon",
          phone: "+91 9998887776",
          email: "vikram.patel@example.com",
          profilePic: "https://th.bing.com/th/id/OIP.5KNXh6kstSXx9Hg3_XrCXwAAAA?w=166&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          name: "Anna Roberts",
          category: "Maintenance",
          specialization: "Mechanical Engineer",
          phone: "+49 176 123 4567",
          email: "anna.roberts@example.com",
          profilePic: "https://th.bing.com/th/id/OIP.5KNXh6kstSXx9Hg3_XrCXwAAAA?w=166&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          name: "David Wilson",
          category: "Maintenance",
          specialization: "Startup Founder",
          phone: "+1 321 654 0987",
          email: "david.wilson@example.com",
          profilePic: "",
        },
      ];
      
      

    return(
        <div className="max-h-96 overflow-y-auto">
    <table className="contact-table">
      <thead className="sticky top-0">
        <tr>
          <th>Name</th>
          <th className="">Contact</th>
        </tr>
        </thead>
        <tbody className="  max-h-40 overflow-y-auto">
          {contacts.filter(contact=>!categoryFilter || contact.category==categoryFilter).map(contact=><tr key={contact.phone}>
            
            <td>{contact.profilePic?<Image alt="profile_pic" className="rounded-full" src={contact.profilePic} width={50} height={50}/>:<span className="size-12 font-bold text-2xl bg-orange-300 5 rounded-full flex justify-center items-center">{contact.name.charAt(0).toUpperCase()}</span>}<span className="w-48 "> {contact.name}</span></td>
            <td className="contact">{contact.phone}<Image src={TelePhone} alt="" width={15} height={15}/></td>
            
          </tr>)}
          
        </tbody>
    </table>
  </div>
    )
}

export default ContactTable