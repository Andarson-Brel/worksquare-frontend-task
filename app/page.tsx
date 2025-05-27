"use client"
import { RentalTypeTabs } from "@/components/rental-type-tabs";
import { SearchFilters } from "@/components/search-filters";
import { useListings } from "@/hooks/use-listings";

import React from "react"

export default function Home() {
  const { listings, filteredListings, loading, error, filters, setFilter } = useListings()
  const [activeTab, setActiveTab] = React.useState("buy")
   const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilter(newFilters)
  }
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  const handleClearFilters = () => {
    setFilter({
      searchTerm: "",
      propertyType: "",
      location: "",
      priceRange: "",
      rentalType: "",
    })
  }
  return (
    <div className="max-w-[1440px] mx-auto  py-8">
      <RentalTypeTabs activeTab={activeTab} onTabChange={handleTabChange} />
    <SearchFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />
    </div>
  );
}
