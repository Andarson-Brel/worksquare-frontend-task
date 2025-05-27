"use client";
import React from "react";
import { RentalTypeTabs } from "@/components/rental-type-tabs";
import { SearchFilters } from "@/components/search-filters";
import { useListings } from "@/hooks/use-listings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PropertyGrid } from "@/components/property-grid";
import NewsletterSection from "@/components/news-letter";

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
    <div className="max-w-[1440px]  mx-auto  py-8">
      <main className="container mx-auto px-4">
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
         <div className="container mx-auto px-4">
          <PropertyGrid listings={filteredListings} loading={loading} />
        </div>
      </main>
       {/* Newsletter Section */}
      <section className="py-24 mt-16 bg-[#F4F7FA]   ">
        <div className="container mx-auto px-4   px-4 rounded-[50px] bg-primary p-4 sm:p-8">
          <div className="w-full mx-auto  text-white flex gap-4 ">
          <div className="w-[50%]">

            <h2 className="text-[70px] font-bold mb-2">Sign up for our Newsletter</h2>
            <p className="mb-6 opacity-90">
              Stay informed about the latest properties at DreamDwell Estates by subscribing to regular updates directly
              to your inbox.
            </p>
          </div>
            <div className="flex flex-col justify-center items-center gap-2 flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 bg-transparent border border-white w-full"
              />
              <button className="bg-white text-blue-600 px-24 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors w-fit">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <NewsletterSection/> */}
    </div>
  );
}
