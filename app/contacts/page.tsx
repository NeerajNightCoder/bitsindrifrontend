'use client'
import { useState } from 'react';
import AdminIcon from '../assets/icons/AdminIcon';
import ContactCategory from './contactCategory';
import './contactpage.css'
import ContactTable from './contactTable';

const ContactsServicePage = () => {
  const [categoryFilter,setCategoryFilter]=useState('')
  const handleCategoryChange=(category:string)=>{
    setCategoryFilter(category)
  }
  return<>
  <div className=' flex flex-col gap-12'>

   <div className='contactCategoryHolder'>
    <ContactCategory isActive={categoryFilter=='Emergency'} category='Emergency' icon={<AdminIcon/>} onClick={handleCategoryChange}/>
    <ContactCategory isActive={categoryFilter=='Admin'} category='Admin' icon={<AdminIcon/>} onClick={handleCategoryChange}/>
    <ContactCategory isActive={categoryFilter=='Maintenance'} category='Maintenance' icon={<AdminIcon/>} onClick={handleCategoryChange}/>
    <ContactCategory isActive={categoryFilter=='Transport'} category='Transport' icon={<AdminIcon/>} onClick={handleCategoryChange}/>
  </div>
  <ContactTable categoryFilter={categoryFilter}/>
  </div>
</>
};
export default ContactsServicePage;
