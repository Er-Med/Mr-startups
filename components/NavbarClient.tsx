"use client";

import React from 'react'
import Link from "next/link";
import { signIn } from "next-auth/react";
import { BadgePlus, Users } from 'lucide-react';
import UserDropdown from './UserDropdown';
import { Session } from 'next-auth';

interface NavbarClientProps {
 session: Session | null;
}

const NavbarClient = ({ session }: NavbarClientProps) => {
 const handleSignIn = async () => {
  await signIn('github');
 };

 return (
  <div className="flex items-center gap-4">
   {/* CTA Buttons - Different for logged in vs non-logged in users */}
   {session && session?.user ? (
    <div className="hidden md:flex gap-3">
     <Link
      href="/startup/create"
      className="px-6 py-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-lg transition-all duration-200 text-sm"
     >
      Submit Project
     </Link>
    </div>
   ) : (
    <div className="hidden md:flex gap-3">
     <button
      onClick={handleSignIn}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 text-sm"
     >
      Create
     </button>
     <button
      onClick={handleSignIn}
      className="px-6 py-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-lg transition-all duration-200 text-sm"
     >
      Join the Community
     </button>
    </div>
   )}

   {/* User Actions */}
   {session && session?.user ? (
    <>
     {/* Mobile Create Button */}
     <Link href="/startup/create" className="md:hidden">
      <span className='max-sm:hidden'> Create </span>
      <BadgePlus className='size-6 sm:hidden' />
     </Link>

     {/* User Dropdown */}
     <UserDropdown
      user={session.user}
      userId={session.user.id || ''}
     />
    </>
   ) : (
    <div className="flex md:hidden gap-3">
     <button onClick={handleSignIn}>
      <span className='max-sm:hidden'> Create </span>
      <BadgePlus className='size-6 sm:hidden' />
     </button>
     <button onClick={handleSignIn}>
      <span className='max-sm:hidden'> Join </span>
      <Users className='size-6 sm:hidden' />
     </button>
    </div>
   )
   }
  </div>
 );
};

export default NavbarClient;
