"use client"

import { Button } from "@/components/ui/button"

interface RentalTypeTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function RentalTypeTabs({ activeTab, onTabChange }: RentalTypeTabsProps) {
  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "lease", label: "Lease" },
  ]

  return (
    <div className="flex items-center gap-0 bg-primary rounded-full  p-2 shadow-lg mb-8 w-fit">
      {tabs.map((tab, index) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="lg"
          onClick={() => onTabChange(tab.id)}
          className={`px-8 py-3 rounded-full font-medium transition-all ${
            activeTab === tab.id ? "text-primary shadow-md font-bold" : "text-white hover:text-gray-900 hover:bg-gray-50"
          }`}
          style={{
            backgroundColor: activeTab === tab.id ? "#fff" : "transparent",
          }}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
