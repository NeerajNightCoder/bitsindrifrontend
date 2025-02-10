'use client'
import './contactCategory.css'

const ContactCategory=({category,icon,onClick,isActive}:{category:string,icon:React.ReactElement,onClick:(category:string)=>void,isActive:boolean})=>{
    return <div className={`contactCategory ${isActive?'activeCategory':""}`} onClick={()=>onClick(category)}>
        {icon}
        <p>{category}</p>
    </div>
}


export default ContactCategory