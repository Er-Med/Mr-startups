"use client"
import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const SearchFormReset = () => {
 const reset = () => {
  const form = document.querySelector(".search-form") as HTMLFormElement;
  if (form) form.reset()
 }
 return (
  <button
   type="reset"
   onClick={reset}
   className=" bg-white border-2 border-black rounded   hover:bg-red-50 hover:border-red-500 transition-all duration-75  flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 py-2 px-4"
   title="Clear search"
   aria-label="Clear search and reset form"
  >
   <Link href="/" className="flex items-center justify-center">
    <X className="size-6 text-black group-hover:text-red-600 transition-colors duration-75" />
   </Link>
  </button>
 )
}

export default SearchFormReset
