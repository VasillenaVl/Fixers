import React from 'react'
//import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    {/* Left section */}
    <div>
      <p className='text-xl font-medium mb-5 inline-block align-middle'>Fix Buddy</p>
      <p className='w-full md:w-2/3 text-gray-600 leading-6'>Welcome to Fix Buddies – your trusted partner for reliable home services! We understand how challenging it can be to find the right professional to fix, improve, or maintain your home. That’s why we’ve created a platform where homeowners can connect with skilled and experienced professionals in their area, quickly and effortlessly.</p>
    </div>

    {/* Center section */}
    <div>
     <p className='text-xl font-medium mb-5'>COMPANY</p>
     <ul className='flex flex-col gap-2 text-gray-600'>
        <li>HOME</li>
        <li>ABOUT US</li>
        <li>CONTACTS</li>
        <li>Privacy policy</li>
     </ul>
    </div>

    {/* Right section */}
    <div>
    <p className='text-xl font-medium mb-5'>FOLLOW US</p>
    <ul className='flex flex-col gap-2 text-gray-600'>
        <li>
            <a href="https://www.linkedin.com/company/fixbuddy">on LinkedIn</a>
        </li>
    </ul>
    </div>
</div>
<div>
    {/* Copyright */}
    <p className='py-5 text-sm text-center'>Copyright 2024@ FixBuddy - All Rights Reserved.</p>
</div>
</div>
  )
}

export default Footer
