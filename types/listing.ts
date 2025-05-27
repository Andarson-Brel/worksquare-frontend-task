export interface Listing {
  id: number
  price: string
  bedrooms: number
  bathrooms: number
  location: string
  title: string
  status: string[]
  image: string
}


export interface FilterState {
  searchTerm: string
  propertyType: string
  location: string
  priceRange: string
  rentalType: string
}
export interface ListingsState {
  listings: Listing[]
  filteredListings: Listing[]
  loading: boolean
  error: string | null
  filters: FilterState
}
export type ListingsAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Listing[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SET_FILTER"; payload: Partial<FilterState> }
  | { type: "APPLY_FILTERS" }
