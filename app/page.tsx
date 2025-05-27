"use client"
import { RentalTypeTabs } from "@/components/rental-type-tabs";
import React from "react"

export default function Home() {
  const [activeTab, setActiveTab] = React.useState("buy")
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div className="max-w-[1440px] mx-auto  py-8">
      <RentalTypeTabs activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
