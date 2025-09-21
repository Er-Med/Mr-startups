"use client";

import { cn } from '@/lib/utils'
import React from 'react'
import { motion } from 'framer-motion'

interface ProductsSectionProps {
 children: React.ReactNode
 className?: string
}

const ProductsSection = ({
 children,
 className
}: ProductsSectionProps) => {
 return (
  <motion.section
   className={cn("products-section", className)}
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6, ease: "easeOut" }}
  >
   <div className="products-container">
    {/* Content */}
    <div className="products-content">
     {children}
    </div>
   </div>
  </motion.section>
 )
}

export default ProductsSection
