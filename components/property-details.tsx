"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Bed,
  Bath,
  MapPin,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  Home,
  Car,
  Wifi,
  Shield,
  Zap,
  Droplets,
} from "lucide-react"
import type { Listing } from "@/types/listing"

interface PropertyDetailsProps {
  property: Listing
  onBack: () => void
}

export function PropertyDetails({ property, onBack }: PropertyDetailsProps) {
  const handleContact = () => {
    alert("Contact functionality would be implemented here")
  }

  const handleScheduleViewing = () => {
    alert("Schedule viewing functionality would be implemented here")
  }

  const handleFavorite = () => {
    alert("Add to favorites functionality would be implemented here")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // Mock additional property details
  const propertyFeatures = [
    { icon: Home, label: "Fully Furnished", available: true },
    { icon: Car, label: "Parking Space", available: true },
    { icon: Wifi, label: "Internet Ready", available: true },
    { icon: Shield, label: "24/7 Security", available: true },
    { icon: Zap, label: "Backup Generator", available: true },
    { icon: Droplets, label: "Swimming Pool", available: false },
  ]

  const nearbyAmenities = [
    "Shopping Mall - 2km",
    "Hospital - 1.5km",
    "School - 800m",
    "Bank - 1km",
    "Restaurant - 500m",
    "Gym - 1.2km",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-6 hover:bg-gray-100">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Images */}
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={`/placeholder.svg?height=400&width=800&text=${property.title.slice(0, 30)}`}
                alt={property.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary" className="bg-white/90">
                  {property.status[0]}
                </Badge>
                <Badge variant="outline" className="bg-white/90">
                  {property.status[1]}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" onClick={handleFavorite}>
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Property Info */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>
                <div className="text-3xl font-bold mb-4" style={{ color: "#007AEA" }}>
                  {property.price}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Home className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <div className="font-semibold">{property.status[0]}</div>
                  <div className="text-sm text-gray-600">Property Type</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Property Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  This beautiful {property.bedrooms}-bedroom {property.status[0].toLowerCase()} is located in the heart
                  of {property.location}. The property features modern finishes, spacious rooms, and excellent natural
                  lighting throughout. Perfect for families looking for comfort and convenience in a prime location. The
                  property comes with {property.bathrooms} well-appointed bathrooms and offers great value for money in
                  today's market.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Property Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {propertyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        feature.available ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      <feature.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Nearby Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {nearbyAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-600">DA</span>
                  </div>
                  <h4 className="font-semibold">DreamDwell Agent</h4>
                  <p className="text-sm text-gray-600">Property Specialist</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full text-white" style={{ backgroundColor: "#007AEA" }} onClick={handleContact}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleContact}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleScheduleViewing}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Summary */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Property Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property ID:</span>
                  <span className="font-medium">#{property.id.toString().padStart(4, "0")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium">{property.status[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listing Type:</span>
                  <span className="font-medium">{property.status[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{property.location}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Price:</span>
                  <span style={{ color: "#007AEA" }}>{property.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mortgage Calculator */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mortgage Calculator</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Loan Amount</label>
                  <input type="text" className="w-full mt-1 p-2 border rounded-lg" placeholder="₦2,000,000" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Interest Rate (%)</label>
                  <input type="text" className="w-full mt-1 p-2 border rounded-lg" placeholder="15" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Loan Term (years)</label>
                  <input type="text" className="w-full mt-1 p-2 border rounded-lg" placeholder="20" />
                </div>
                <Button variant="outline" className="w-full mt-3">
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
