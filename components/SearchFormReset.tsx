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
   className="h-14 w-14 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-red-50 hover:border-red-500 transition-all duration-75 active:shadow-[1px_1px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
