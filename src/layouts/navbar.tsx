import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50 w-full">
      {/* Full-width wrapper */}
      <div className="w-full h-14 flex items-center justify-between px-4">

        {/* Parent container for logo and menu */}
        <div className="w-full flex items-center justify-between">

          {/* Logo - stays at the left */}
          <div className="ml-10">
            <img
              src="/onboarding/logo.png"
              className="h-11 cursor-pointer"
              alt="UniSeek Logo"
              onClick={() => navigate("/home")}
            />
          </div>

          {/* Menu - stays at the very right */}
          <div className="ml-auto mr-10"> {/* Pushes menu to the far right */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none md:hidden"
              aria-expanded={isOpen}
            >
              <svg className="w-5 h-5" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>

            {/* Navigation Menu */}
            <div
              className={`absolute md:relative top-14 md:top-0 right-0 w-full md:w-auto md:block ${isOpen ? "block" : "hidden"}`}
            >
              <ul className="flex flex-col md:flex-row font-medium mt-4 md:mt-0 rounded-lg justify-end">
                {[
                  { name: "Home", path: "/home" },
                  { name: "Mentor", path: "/mentors" },
                  { name: "University", path: "/universities" },
                  { name: "Profile", path: "/profile" },
                ].map(({ name, path }, index) => (
                  <li key={index} className="md:relative">
                    <Link
                      to={path}
                      className="block py-2 px-4 text-gray-900 rounded-sm transition-colors duration-200 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-300 dark:hover:text-white"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
