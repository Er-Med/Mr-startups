import { cn } from '@/lib/utils'
import { Filter, Grid, List, SortAsc } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface FilterBarProps {
 searchValue?: string
 onSearchChange?: (value: string) => void
 onSortChange?: (sort: string) => void
 onViewToggle?: (view: 'grid' | 'list') => void
 currentView?: 'grid' | 'list'
 showViewToggle?: boolean
 className?: string
}

const FilterBar = ({
 searchValue = '',
 onSearchChange,
 onSortChange,
 onViewToggle,
 currentView = 'grid',
 showViewToggle = false,
 className
}: FilterBarProps) => {
 const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'name', label: 'Name A-Z' },
 ]

 return (
  <div className={cn("filter-bar", className)}>
   {/* Search Input */}
   <div className="filter-search">
    <Input
     type="text"
     placeholder="Filter by name, category..."
     value={searchValue}
     onChange={(e) => onSearchChange?.(e.target.value)}
     className="filter-search-input"
    />
   </div>

   {/* Controls */}
   <div className="filter-controls">
    {/* View Toggle */}
    {showViewToggle && (
     <div className="filter-view-toggle">
      <Button
       variant={currentView === 'grid' ? 'default' : 'outline'}
       size="sm"
       onClick={() => onViewToggle?.('grid')}
       className="filter-view-btn"
      >
       <Grid className="size-4" />
      </Button>
      <Button
       variant={currentView === 'list' ? 'default' : 'outline'}
       size="sm"
       onClick={() => onViewToggle?.('list')}
       className="filter-view-btn"
      >
       <List className="size-4" />
      </Button>
     </div>
    )}

    {/* Sort Dropdown */}
    <div className="filter-sort">
     <select
      onChange={(e) => onSortChange?.(e.target.value)}
      className="filter-sort-select"
      defaultValue="newest"
     >
      {sortOptions.map((option) => (
       <option key={option.value} value={option.value}>
        {option.label}
       </option>
      ))}
     </select>
    </div>
   </div>
  </div>
 )
}

export default FilterBar
