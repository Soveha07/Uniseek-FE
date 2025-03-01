import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 dark:bg-[#FDFAF5]">
      <div className="max-w-screen-xl h-14 flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <img
          src="/onboarding/logo.png"
          className="h-11 cursor-pointer"
          alt="UniSeek Logo"
          onClick={() => navigate("/home")}
        />

        {/* Burger menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="p-2 w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none"
          aria-expanded={isOpen}
        >
          <svg className="w-5 h-5" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      {/* Hidden menu */}
      <div className={`${isOpen ? "block" : "hidden"} w-full bg-gray-50 dark:bg-gray-800`}>
        <ul className="flex flex-col font-medium mt-4 rounded-lg">
          {[
            { name: "Home", path: "/home" },
            { name: "Mentor", path: "/mentor" },
            { name: "University", path: "/university" },
            { name: "About Us", path: "/about" },
          ].map(({ name, path }, index) => (
            <li key={index}>
              <Link to={path} className="block py-2 px-4 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-300 dark:hover:text-white">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
