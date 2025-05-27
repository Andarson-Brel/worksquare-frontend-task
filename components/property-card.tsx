"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Listing } from "@/types/listing"

interface PropertyCardProps {
  listing: Listing
}

export function PropertyCard({ listing }: PropertyCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/property/${listing.id}`)
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="flex">
          {/* Image on the left */}
          <div className="relative w-48 h-40 flex-shrink-0">
            <img
              src={`/placeholder.svg?height=160&width=192&text=${listing.title.slice(0, 20)}`}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 flex gap-1">
              <Badge variant="secondary" className="bg-white/90 text-xs">
                {listing.status[0]}
              </Badge>
              <Badge variant="outline" className="bg-white/90 text-xs">
                {listing.status[1]}
              </Badge>
            </div>
          </div>

          {/* Content on the right */}
          <div className="flex-1 p-4">
            <div className="mb-2">
              <p className="text-2xl font-bold text-gray-900 mb-1">{listing.price}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{listing.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{listing.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{listing.location}</span>
              </div>
            </div>

            <h3 className="font-medium text-gray-900 line-clamp-2 mb-3 text-sm">{listing.title}</h3>

            <Button
              size="sm"
              className="text-white font-medium"
              style={{ backgroundColor: "#007AEA" }}
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
