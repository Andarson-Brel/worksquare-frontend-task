import type { ListingsState, ListingsAction, Listing } from "@/types/listing"

const initialState: ListingsState = {
  listings: [],
  filteredListings: [],
  loading: false,
  error: null,
  filters: {
    searchTerm: "",
    propertyType: "",
    location: "",
    priceRange: "",
    rentalType: "",
  },
}

function extractPriceNumber(priceString: string): number {
  // Remove ₦ symbol and commas, then convert to number
  const cleanPrice = priceString.replace(/₦|,/g, "")
  return Number.parseInt(cleanPrice) || 0
}

function applyFilters(listings: Listing[], filters: ListingsState["filters"]): Listing[] {
  return listings.filter((listing) => {
    const matchesSearch =
      !filters.searchTerm ||
      listing.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(filters.searchTerm.toLowerCase())

    const matchesPropertyType =
      !filters.propertyType ||
      filters.propertyType === "any" ||
      listing.status[0].toLowerCase() === filters.propertyType.toLowerCase()

    const matchesLocation =
      !filters.location ||
      filters.location === "any" ||
      listing.location.toLowerCase().includes(filters.location.toLowerCase())

    const matchesRentalType =
      !filters.rentalType || listing.status[1].toLowerCase().includes(filters.rentalType.toLowerCase())

    // Price range filtering
    let matchesPriceRange = true
    if (filters.priceRange && filters.priceRange !== "any") {
      const listingPrice = extractPriceNumber(listing.price)

      switch (filters.priceRange) {
        case "Under ₦1M":
          matchesPriceRange = listingPrice < 1000000
          break
        case "₦1M - ₦2M":
          matchesPriceRange = listingPrice >= 1000000 && listingPrice <= 2000000
          break
        case "₦2M - ₦3M":
          matchesPriceRange = listingPrice >= 2000000 && listingPrice <= 3000000
          break
        case "₦3M - ₦5M":
          matchesPriceRange = listingPrice >= 3000000 && listingPrice <= 5000000
          break
        case "Above ₦5M":
          matchesPriceRange = listingPrice > 5000000
          break
        default:
          matchesPriceRange = true
      }
    }

    return matchesSearch && matchesPropertyType && matchesLocation && matchesRentalType && matchesPriceRange
  })
}

export function listingsReducer(state: ListingsState, action: ListingsAction): ListingsState {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      }

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        listings: action.payload,
        filteredListings: applyFilters(action.payload, state.filters),
      }

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case "SET_FILTER":
      const newFilters = { ...state.filters, ...action.payload }
      return {
        ...state,
        filters: newFilters,
      }

    case "APPLY_FILTERS":
      return {
        ...state,
        filteredListings: applyFilters(state.listings, state.filters),
      }

    default:
      return state
  }
}

export { initialState }
