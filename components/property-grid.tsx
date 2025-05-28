import React, { useState, useMemo } from "react"
import { PropertyCard } from "./property-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Listing } from "@/types/listing"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PropertyGridProps {
  listings: Listing[]
  loading: boolean
}

const ITEMS_PER_PAGE = 12

export function PropertyGrid({ listings, loading }: PropertyGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(() => Math.ceil(listings.length / ITEMS_PER_PAGE), [listings])

  const currentListings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return listings.slice(start, start + ITEMS_PER_PAGE)
  }, [currentPage, listings])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex bg-white rounded-lg overflow-hidden shadow-sm">
            <Skeleton className="w-48 h-40 flex-shrink-0" />
            <div className="flex-1 p-4 space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0v-5a2 2 0 00-2-2h-4a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v10m8-10V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v4m6 0h2m-6 4h2m-6 4h2"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
          <p className="text-gray-500">Try adjusting your search criteria to find more properties.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {currentListings.map((listing, idx) => (
          <div
            key={listing.id}
            className="animate-in fade-in-0 duration-300"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <PropertyCard listing={listing} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
            aria-label="Previous Page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border ${page === currentPage ? 'bg-primary text-white' : ''}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
            aria-label="Next Page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  )
}
