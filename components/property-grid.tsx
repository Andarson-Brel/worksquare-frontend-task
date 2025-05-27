import { PropertyCard } from "./property-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Listing } from "@/types/listing"

interface PropertyGridProps {
  listings: Listing[]
  loading: boolean
}

export function PropertyGrid({ listings, loading }: PropertyGridProps) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="animate-in fade-in-0 duration-300"
          style={{ animationDelay: `${listings.indexOf(listing) * 50}ms` }}
        >
          <PropertyCard listing={listing} />
        </div>
      ))}
    </div>
  )
}
