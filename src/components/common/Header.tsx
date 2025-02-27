import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 flex justify-between items-center">
      <button className="text-2xl">←</button>
      <h1 className="text-xl font-bold">Universities</h1>
      <button className="text-2xl">👤</button>
    </header>
  );
};

export default Header;
