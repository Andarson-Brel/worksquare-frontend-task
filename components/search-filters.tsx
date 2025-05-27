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
    <div className="container mx-auto px-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {/* Property Type */}
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#007AEA" }}
            >
              <Building className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Property Type</p>
              <p className="text-xs text-gray-500">Select property type</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <Select
            value={filters.propertyType || "any"}
            onValueChange={(value) => throttledFilterChange({ propertyType: value === "any" ? "" : value })}
          >
            <SelectTrigger className="border-0 p-0 h-auto shadow-none">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#007AEA" }}
            >
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Location</p>
              <p className="text-xs text-gray-500">Select location</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <Select
            value={filters.location || "any"}
            onValueChange={(value) => throttledFilterChange({ location: value === "any" ? "" : value })}
          >
            <SelectTrigger className="border-0 p-0 h-auto shadow-none">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#007AEA" }}
            >
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Price Range</p>
              <p className="text-xs text-gray-500">₦500,000 - ₦5,000,000</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          <Select
            value={filters.priceRange || "any"}
            onValueChange={(value) => throttledFilterChange({ priceRange: value === "any" ? "" : value })}
          >
            <SelectTrigger className="border-0 p-0 h-auto shadow-none">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#007AEA" }}
            >
              <Search className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Search</p>
              <p className="text-xs text-gray-500">Search properties</p>
            </div>
          </div>
          <input
            type="text"
            placeholder="Type to search..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="w-full border-0 p-0 text-sm focus:outline-none focus:ring-0 placeholder:text-gray-400"
          />
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
