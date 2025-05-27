"use client"

import React from "react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Building, MapPin, DollarSign, ChevronDown } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { useThrottle } from "@/hooks/use-throttle"
import { FilterState } from "@/types/listing"

interface SearchFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: Partial<FilterState>) => void
  onClearFilters: () => void
}

export function SearchFilters({ filters, onFiltersChange, onClearFilters }: SearchFiltersProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm)
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300)

  React.useEffect(() => {
    if (debouncedSearchTerm !== filters.searchTerm) {
      onFiltersChange({ searchTerm: debouncedSearchTerm })
    }
  }, [debouncedSearchTerm, filters.searchTerm, onFiltersChange])

  const throttledFilterChange = useThrottle(onFiltersChange, 100)

  const propertyTypes = ["House", "Flat", "Terrace", "Duplex", "Penthouse", "Apartment", "Mansion"]
  const locations = ["Lagos", "Abuja", "Ogun"]
  const priceRanges = ["Under ₦1M", "₦1M - ₦2M", "₦2M - ₦3M", "₦3M - ₦5M", "Above ₦5M"]

  return (
    <div className="max-w-[1440px] mx-auto px-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mx-auto border rounded-xl">
        {/* Property Type */}
        <div className="bg-white rounded-lg shadow-sm  p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#007AEA" }}
            >
              <Building className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Property Type</p>
          <Select
            value={filters.propertyType || "all"}
            onValueChange={(value) => throttledFilterChange({ propertyType: value === "all" ? "" : value })}
          >
            <SelectTrigger className="border-0 p-0 h-auto shadow-none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-sm  p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#007AEA" }}
            >
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Location</p>
             
          <Select
            value={filters.location || "all"}
            onValueChange={(value) => throttledFilterChange({ location: value === "all" ? "" : value })}
          >
            <SelectTrigger className="border-0 p-0 h-auto shadow-none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
            </div>
            
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-lg shadow-sm  p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#007AEA" }}
            >
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Price Range</p>
          <Select
            value={filters.priceRange || "all"}
            onValueChange={(value) => throttledFilterChange({ priceRange: value === "all" ? "" : value })}
          >
            <SelectTrigger className="border-0 p-0 h-auto shadow-none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className=" p-4 ">
          <div className="bg-primary rounded-lg shadow-sm  px-2 hover:shadow-md transition-shadow">


          <div className="flex items-center gap-3 mb-3">
           <div className="flex-1">
          <input
            type="text"
            placeholder="Type to search..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="bg-primary w-full border-0 p-0 text-white text-sm focus:outline-none focus:ring-0 placeholder:text-white"
          />
            </div>
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#007AEA" }}
            >
              <Search className="h-5 w-5 text-white" />
            </div>
            
          </div>
          </div>
        </div>
      </div>

      {/* Active Filters Indicator */}
      {(filters.propertyType || filters.location || filters.priceRange || filters.searchTerm) && (
        <div className="max-w-4xl mx-auto mt-4">
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-700 font-medium">
                Filters applied - Showing {/* This will be filled by parent component */} results
              </span>
            </div>
            <button onClick={onClearFilters} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
