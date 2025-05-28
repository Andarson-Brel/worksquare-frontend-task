"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { PropertyDetails } from "@/components/property-details"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Listing } from "@/types/listing"

interface PropertyPageProps {
  // Next.js now hands you a promise for params
  params: Promise<{ id: string }>
}

export default function PropertyPage({ params }: PropertyPageProps) {
    const { id } = use(params)
  const [property, setProperty] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

   useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch("/data/listings.json")
        if (!res.ok) throw new Error("Failed to fetch")
        const listings: Listing[] = await res.json()
        const found = listings.find(l => l.id === Number(id))
        if (!found) throw new Error("Property not found")
        setProperty(found)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Property not found"}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <PropertyDetails property={property} onBack={() => router.back()} />
    </div>
  )
}
