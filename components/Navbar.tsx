import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import NavbarClient from './NavbarClient';

interface NavbarProps {
 className?: string
}
const Navbar = async ({ className }: NavbarProps) => {
 const session = await auth()

 return (
  <header className={`px-5 p-5 font-sans text-white relative ${className}  bg-[linear-gradient(180deg,#09090b,#09090b)] `}>
   <nav className="flex items-center justify-between">
    <Link href="/" className='text-xl font-bold bg-gradient-to-b from-gray-100 to-gray-200 text-transparent bg-clip-text'>
    Mr-Startups
     {/* <Image src="/logo.png" alt="logo" width={144} height={30} /> */}
    </Link>
    <NavbarClient session={session} />
   </nav>
  </header>
 )
}
export default Navbar
