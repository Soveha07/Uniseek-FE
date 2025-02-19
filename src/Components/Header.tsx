import React from "react";

const Header: React.FC = () => {
    return (
        <header className= "w-full flex items-center  py-6 px-6 bg-myskyblue shadow-md fixed top-0 left-0">
            <button className= "text-b1">&larr;</button>
            <h1 className = "text-lg font-semibold ml-4 bg-myskyblue"> University Listdown </h1>
            
        </header>
    );
};

export default Header;