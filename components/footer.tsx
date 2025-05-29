import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 md:py-16 bg-primary rounded-tl-[50px] rounded-tr-[50px] mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo / Branding */}
        <div className="flex flex-col md:flex-row md:justify-between items-center text-white mb-8">
          <div className="text-center md:text-right max-w-full">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[150px] xl:text-[200px] 2xl:text-[220px] leading-tight">
              DreamDwell
            </h1>
            <p className="mt-2 text-lg sm:text-2xl md:text-3xl lg:text-[40px] opacity-90">
              Estates
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-white text-center">
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Home</h3>
            <p className="text-sm opacity-75">Listing</p>
            <p className="text-sm opacity-75">Agent</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">About</h3>
            <p className="text-sm opacity-75">Blog</p>
            <p className="text-sm opacity-75">Contact</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Whitepaper</h3>
            <p className="text-sm opacity-75">Contact</p>
            <p className="text-sm opacity-75">FAQs</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Social</h3>
            <p className="text-sm opacity-75">Facebook</p>
            <p className="text-sm opacity-75">Instagram</p>
            <p className="text-sm opacity-75">Twitter</p>
            <p className="text-sm opacity-75">LinkedIn</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white/75 text-sm mt-8 pt-6 border-t border-white/20">
          © {currentYear} DreamDwell Estates - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
