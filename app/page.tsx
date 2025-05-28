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
       <section className="py-12 md:py-24 mt-12 md:mt-16 bg-[#F4F7FA]">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="bg-primary rounded-[50px] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center text-white gap-6">
        {/* Heading and Description */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] font-bold mb-2">
            Sign up for our Newsletter
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 opacity-90">
            Stay informed about the latest properties at DreamDwell Estates by subscribing to regular updates directly to your inbox.
          </p>
        </div>
        {/* Input and Button */}
        <div className="w-full md:w-1/2 flex flex-col justify-center md:justify-end items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-transparent border border-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-full max-w-md"
          />
          <button className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto">
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
