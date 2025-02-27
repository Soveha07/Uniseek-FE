import React from "react";

type HeaderProps = {
    title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="w-full flex items-center py-6 px-6 bg-myskyblue shadow-md fixed top-0 left-0">
            <button className="text-b1">&larr;</button>
            <h1 className="text-b2 font-semibold ml-4 bg-myskyblue">{title}</h1>
        </header>
    );
};

export default Header;
