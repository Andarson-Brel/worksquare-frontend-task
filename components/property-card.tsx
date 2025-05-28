"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, MapPin, ArrowRight } from "lucide-react"  // Import the ArrowRight icon
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
       <CardContent className="p-0 h-full">
        <div className="flex flex-col sm:flex-row h-full items-stretch">
          {/* Image on the top for mobile, on the left for desktop/tablet */}
           <div className="relative w-full sm:w-48 sm:h-full flex-shrink-0">
            <img
              src={`/placeholder.svg?height=160&width=192&text=${listing.title.slice(0, 20)}`}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Badge variant="secondary" className="bg-white/90 text-xs">
                {listing.status[0]}
              </Badge>
              <Badge variant="outline" className="bg-white/90 text-xs">
                {listing.status[1]}
              </Badge>
            </div>
          </div>

          {/* Content below the image for mobile, on the right for desktop/tablet */}
          <div className="flex-1 p-4 h-full flex flex-col justify-between">
            <div className="mb-2">
              <p className="text-xl font-semibold text-gray-900 mb-1">{listing.price}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span className="text-[12px]">{listing.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span className="text-[12px]">{listing.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-[12px]">{listing.location}</span>
              </div>
            </div>

            <h3 className="font-medium text-gray-900 line-clamp-2 mb-3 text-xl">{listing.title}</h3>
<div>

            <Button
              size="sm"
              className="text-white font-medium bg-primary"
        
  
              onClick={handleViewDetails}
            >
              View 
              <ArrowRight className="mr-2 h-4 w-4" /> {/* Add the right arrow icon */}
            </Button>
</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
