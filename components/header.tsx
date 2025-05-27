import { Button } from "@/components/ui/button"
import { Building } from "lucide-react"

export function Header() {
  return (
    <header
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/placeholder.svg?height=200&width=1200&text=Modern+House+Background')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-white">
              <Building className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">DreamDwell</h1>
                <p className="text-xs opacity-90">Estates</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-gray-200 transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors font-medium">
              Property
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors font-medium">
              Contact
            </a>
          </nav>

          <Button style={{ backgroundColor: "#007AEA" }} className="hover:bg-blue-600 text-white font-medium">
            Become an Agent
          </Button>
        </div>
      </div>
    </header>
  )
}
