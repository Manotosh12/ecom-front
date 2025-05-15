import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';

const UpperNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <header className="w-full bg-white shadow-md">
      {/* Full-width flex container */}
      <div className="flex items-center justify-between px-6 py-4 w-full">
        
        {/* Logo */}
        <div className="flex items-center text-sky-700 font-bold text-xl gap-2 min-w-[150px]">
          <FaStore className="text-2xl" />
          <span>ShopLogo</span>
        </div>

        {/* Search Input takes full width between logo and buttons */}
        <div className="flex-1 mx-6">
          <div className="flex items-center w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search products..."
              className="flex-grow px-4 py-2 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 transition"
            >
              <FaSearch />
            </button>
          </div>
        </div>

          {/* Profile & Cart */}
  <div className="flex items-center gap-4 min-w-[200px]">
    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
      <FaUser />
      <span className="hidden sm:inline">Profile</span>
    </button>
    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
      <FaShoppingCart />
      <span className="hidden sm:inline">Cart</span>
    </button>
  </div>

      </div>
    </header>
  );
};

export default UpperNavbar;


