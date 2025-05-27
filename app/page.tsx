"use client";
import React from "react";
import { RentalTypeTabs } from "@/components/rental-type-tabs";
import { SearchFilters } from "@/components/search-filters";
import { useListings } from "@/hooks/use-listings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const { listings, filteredListings, loading, error, filters, setFilter } =
    useListings();
  const [activeTab, setActiveTab] = React.useState("buy");
  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilter(newFilters);
  };
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleClearFilters = () => {
    setFilter({
      searchTerm: "",
      propertyType: "",
      location: "",
      priceRange: "",
      rentalType: "",
    });
  };
  return (
    <div className="max-w-[1440px] mx-auto  py-8">
      <main>
        {/* rental type component */}
        <RentalTypeTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Search Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {/* Error Rendering */}
        {error && (
          <div className="container mx-auto px-4 mb-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* listing count */}
        <div className="container mx-auto px-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {loading
                ? "Loading properties..."
                : `Showing ${filteredListings.length} of ${listings.length} properties`}
            </p>
            {(filters.propertyType ||
              filters.location ||
              filters.priceRange ||
              filters.searchTerm) && (
              <p className="text-sm text-blue-600">
                {filteredListings.length} result
                {filteredListings.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>
        </div>
        {/* Listing section */}
        
      </main>
    </div>
  );
}
