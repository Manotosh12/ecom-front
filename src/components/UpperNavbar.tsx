import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  FaSearch,
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const UpperNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation(); // to get current path

  const username = 'John Doe';

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (...args: any[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(() => {
    console.log(`Searching for: ${searchQuery}`);
  }, [searchQuery]);

  const debouncedSearch = useCallback(
    debounce(() => {
      handleSearch();
    }, 300),
    [handleSearch]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch();
  };

  const handleSettings = useCallback(() => {
    navigate('/settings');
    setDropdownOpen(false);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    alert('Logging out...');
    setDropdownOpen(false);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply dark mode class on <html>
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  // Trap focus inside dropdown
  useEffect(() => {
    if (!dropdownOpen) return;

    const focusableElements = dropdownRef.current?.querySelectorAll<
      HTMLButtonElement | HTMLLIElement
    >('li[role="menuitem"]');

    let firstElement = focusableElements?.[0];
    let lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTrapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !focusableElements) return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTrapFocus);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTrapFocus);
    };
  }, [dropdownOpen]);

  // Cart sidebar handlers
  const toggleCart = () => setCartOpen((prev) => !prev);

  // Close cart if clicked outside or Escape pressed
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById('cart-sidebar');
      if (sidebar && !sidebar.contains(e.target as Node)) {
        setCartOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };

    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [cartOpen]);

  return (
    <>
      <header className="w-full bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 gap-4 md:gap-0">
          {/* Logo */}
          <div className="flex items-center text-green-700 dark:text-white font-bold text-2xl gap-2">
            🪴 <span>PlantNest</span>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-full overflow-hidden shadow-md focus-within:ring-2 ring-green-500 transition">
              <input
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search plants..."
                aria-label="Search input"
                className="flex-grow px-4 py-2 outline-none text-gray-700 dark:text-white bg-transparent"
              />
              <button
                onClick={handleSearch}
                className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition rounded-r-full"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-green-600" />
              )}
            </button>

            {/* Profile Dropdown */}
            <nav className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="User menu"
                aria-controls="user-menu"
                id="user-menu-button"
                type="button"
              >
                <img
                  src="https://i.pravatar.cc/40?img=12"
                  alt={`User Avatar of ${username}`}
                  className="w-8 h-8 rounded-full border-2 border-green-600"
                />
                <FiChevronDown className="text-gray-600 dark:text-white" />
              </button>

              {dropdownOpen && (
                <ul
                  id="user-menu"
                  className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50"
                  role="menu"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  {location.pathname !== '/settings' && (
                    <li
                      onClick={handleSettings}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center gap-2 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none"
                      role="menuitem"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSettings()}
                    >
                      <FaCog />
                      Settings
                    </li>
                  )}
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center gap-2 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none"
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogout()}
                  >
                    <FaSignOutAlt />
                    Logout
                  </li>
                </ul>
              )}
            </nav>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition focus:outline-none"
              aria-label="Shopping cart"
              type="button"
            >
              <FaShoppingCart />
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <div
        id="cart-sidebar"
        className={`
          fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50
          ${cartOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="cart-title" className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Cart
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
          {/* Cart content placeholder */}
          <p className="text-gray-700 dark:text-gray-300">Your cart is empty.</p>
        </div>
      </div>

      {/* Overlay */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default UpperNavbar;
