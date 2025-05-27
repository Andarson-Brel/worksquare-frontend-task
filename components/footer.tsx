import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16" style={{ backgroundColor: "#007AEA" }}>
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">DreamDwell</h1>
          <p className="text-xl opacity-90">Estates</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          <div>
            <h3 className="font-semibold mb-2">Home</h3>
            <p className="text-sm opacity-75">Listing</p>
            <p className="text-sm opacity-75">Agent</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm opacity-75">Blog</p>
            <p className="text-sm opacity-75">Contact</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Whitepaper</h3>
            <p className="text-sm opacity-75">Contact</p>
            <p className="text-sm opacity-75">FAQs</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Facebook</h3>
            <p className="text-sm opacity-75">Instagram</p>
            <p className="text-sm opacity-75">Twitter</p>
            <p className="text-sm opacity-75">LinkedIn</p>
          </div>
        </div>

        <div className="text-center text-white/75 text-sm mt-8 pt-8 border-t border-white/20">
          © {currentYear} DreamDwell Estates - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
