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
  <header className={`px-5 p-5 font-sans relative ${className}`} style={{ color: 'var(--color-foreground)', background: 'var(--color-background)' }}>
   <nav className="flex items-center justify-between">
    <Link href="/" className=' flex justify-center flex-col text-center  raounded-[2px]'>
     <div className="font-bold text-2xl p-[2px_8px]"><strong className=' text-primary '>MRC</strong>STARTUPS</div>
     {/* <p className="text-sm bg-foreground text-background font-semibold p-[2px]"> Pitch, Connect and Grow.</p> */}
     {/* <Image src="/logo.png" alt="logo" width={144} height={30} /> */}
    </Link>
    <NavbarClient session={session} />
   </nav>
  </header>
 )
}
export default Navbar
