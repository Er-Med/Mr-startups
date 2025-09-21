"use client";

import Form from "next/form";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import SearchFormReset from "./SearchFormReset";


const SearchForm = ({ query }: { query?: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(query || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to products section when there's a search query
  useEffect(() => {
    if (query && query.trim() !== "") {
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        // Small delay to ensure the page has updated with new results
        setTimeout(() => {
          productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 100);
      }
    }
  }, [query]);



  return (
    <motion.div
      className="w-full max-w-4xl mx-auto relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Form action={"/"} scroll={false} className="w-full search-form">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
          {/* Primary Input */}
          <div className="relative flex-1 max-w-lg">
            <Input
              ref={inputRef}
              name={"query"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full h-12 sm:h-14 px-4 sm:px-6 pr-24 sm:pr-28 text-black text-base sm:text-lg bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_#3B82F6] transition-all duration-200 placeholder:text-gray-500 font-medium ${isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
              placeholder={"Search Moroccan startups..."}
              aria-label="Search for Moroccan startups"
              autoComplete="off"
              spellCheck="false"
            />


            {/* Integrated Search Button */}
            <Button
              type="submit"
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
              aria-label="Search"
            >
              <Search className="size-4" />
            </Button>

          </div>

          {/* Reset Button - Only show when there's a query */}
          {query && (
            <SearchFormReset />
          )}
        </div>
      </Form>
    </motion.div>
  );
};
export default SearchForm
