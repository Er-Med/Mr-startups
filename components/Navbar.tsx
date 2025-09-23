import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import { BadgePlus, Users } from 'lucide-react';
import NavbarClient from './NavbarClient';
const Navbar = async () => {
 const session = await auth()
 return (
  <header className="px-5 py-3 bg-transparent font-sans text-white">
   <nav className="flex items-center justify-between">
    <Link href="/">
     <Image src="https://images.unsplash.com/photo-1494375364506-901512970ad4?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="logo" width={144} height={30} />
    </Link>

    <NavbarClient session={session} />
   </nav>
  </header>
 )
}
export default Navbar
