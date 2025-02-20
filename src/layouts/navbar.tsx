import React, { useState } from "react";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-[#FDFAF5] dark:border-[#FDFAF5]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-[#FDFAF5]">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/onboarding/logo.png" className="h-11" alt="UniSeek Logo" />
        </a>

        {/* Right Section (About Us + Burger Menu) */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <a href="#" className="text-gray-900 dark:text-gray-700 md:block">
            About Us
          </a>

          {/* Burger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className={`${isOpen ? "hidden" : "block"} md:hidden w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-700`}>
        <ul className="flex flex-col font-medium mt-4 rounded-lg">
          <li>
            <a href="#" className="block py-2 px-4 text-white bg-blue-700 rounded-sm dark:bg-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Contact
            </a>
          </li>
          <li className="md:hidden">
            <a href="#" className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              About Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
