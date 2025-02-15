import React from "react";

const Header: React.FC = () => {
    return (
        <header className= "w-full flex items-center  py-6 px-6 bg-skyblue shadow-md fixed top-0 left-0">
            <button className= "text-xl">&larr;</button>
            <h1 className = "text-lg font-semibold ml-4"> University Listdown </h1>
            
        </header>
    );
};

export default Header;