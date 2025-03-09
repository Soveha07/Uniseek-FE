import React from "react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    if (path.includes("/universities")) return "Universities";
    if (path.includes("/mentors/detail")) return "Mentor Profile";
    if (path.includes("/mentors")) return "Mentors";
    return "Uniseek";
  };

  return (
    // <header className="sticky top-0 left-0 right-0 w-full p-2 flex justify-between items-center border-b z-10">
    //   <button className="text-2xl">←</button>
    //   <h1 className="text-xl font-bold">{getPageTitle()}</h1>
    //   <button className="text-2xl">👤</button>
    // </header>
    <p></p>
  );
};

export default Header;
