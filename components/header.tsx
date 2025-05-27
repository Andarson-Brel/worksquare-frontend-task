'use client'; // Required for using hooks in App Router

import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  // Function to determine link classes
  const getNavLinkClass = (path: string) => {
    return `font-medium transition-colors ${
      pathname === path 
        ? 'text-[#007AEA]' 
        : 'text-gray-800 hover:text-gray-200'
    }`;
  };

  return (
    <header
      className="relative bg-cover bg-center bg-no-repeat min-h-[100px] "
      style={{
        backgroundImage: "url('https://www.southernliving.com/thmb/bT7Um-9h1yGteE-qKWt2rnCcl4w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/beaufort-sc-white-house-2000-b24713dcd2bd49aebff022e8eb6577b7.jpg')",
      }}
    >
      {/* Dark overlay with increased opacity */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative container mx-auto px-4 h-[100px] flex items-center justify-between w-full">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between h-[100px] w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-white">
              <Building className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">DreamDwell</h1>
                <p className="text-xs opacity-90">Estates</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 bg-white rounded-full px-6 py-2 shadow-lg">
            <Link href="/" className={getNavLinkClass('/')}>
              Home
            </Link>
            <Link href="/property" className={getNavLinkClass('/property')}>
              Property
            </Link>
            <Link href="/contact" className={getNavLinkClass('/contact')}>
              Contact
            </Link>
          </nav>

          <Button 
            
            className="hover:bg-blue-600 text-white font-medium bg-primary"
            asChild
          >
            <Link href="/become-an-agent">
              Become an Agent
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}