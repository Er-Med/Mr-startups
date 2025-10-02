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
          {/* Integrated Search Input and Button */}
          <div className="relative flex items-center  w-full max-w-2xl bg-[#E0E0E6] rounded p-1 has-[input:focus-within]:ring-3 has- has-[input:focus-within]:ring-primary hover:scale-105 transition-transform has-[input:focus-within]:scale-105 "
            onFocus={() => setIsFocused(true)}>
            {/* Search Input */}
            <div className="relative flex-1 flex radius gap-1  ">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-500" />
              <Input
                ref={inputRef}
                name={"query"}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={() => setIsFocused(false)}
                className="w-full h-14 pl-12 pr-4 text-base rounded-l rounded-r-none border-r-0 transition-all duration-200 font-medium focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{
                  color: '#374151',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
                placeholder={"Search for startup, category, creators..."}
                aria-label="Search for components, styles, creators"
                autoComplete="off"
                spellCheck="false"
              />
              {/* Reset Button - Only show when there's a query */}
              {query && (
                <SearchFormReset />
              )}
              {/* Integrated Search Button */}
              <Button
                type="submit"
                className="h-14 px-8 bg-primary hover:bg-primary-dark text-white font-semibold rounded border-l-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Search"
              >
                Search
              </Button>
            </div>

          </div>


        </div>
      </Form>
    </motion.div>
  );
};
export default SearchForm
