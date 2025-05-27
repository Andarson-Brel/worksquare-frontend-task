"use client"

import { useReducer, useEffect } from "react"

import type { Listing } from "@/types/listing"
import { initialState, listingsReducer } from "../reducers/listings-reducer"

export function useListings() {
  const [state, dispatch] = useReducer(listingsReducer, initialState)

  const fetchListings = async () => {
    dispatch({ type: "FETCH_START" })

    try {
      const response = await fetch("/listings.json")
      if (!response.ok) {
        throw new Error("Failed to fetch listings")
      }
      const data: Listing[] = await response.json()
      dispatch({ type: "FETCH_SUCCESS", payload: data })
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  const setFilter = (filters: Partial<typeof state.filters>) => {
    dispatch({ type: "SET_FILTER", payload: filters })
    dispatch({ type: "APPLY_FILTERS" })
  }

  useEffect(() => {
    fetchListings()
  }, [])

  return {
    ...state,
    setFilter,
    refetch: fetchListings,
  }
}
