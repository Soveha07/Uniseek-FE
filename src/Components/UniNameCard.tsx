import React from "react";

interface UniNameCardProps {
    name: string;
    type: string;
    logoUrl: string;
}

const UniversityNameCard: React.FC<UniNameCardProps> = ({name, type, logoUrl}) => {
    return (
        <div className= "bg-myskyblue rounded-lg shadow-md overflow-hidden mb-6 flex">
            <img src = {logoUrl} alt = {name} className = "w-1/3 object-cover" />
            <div className= "p-6 w-2/3">
              <h3 className = "font-bold text-md">{name}</h3>
              <ul className="text-b2">
              </ul>
              <button className = "mt-2 bg-myprimary text-white text-b2 px-4 py-2 rounded"></button>

            </div>
        </div>
    );
};

export default UniversityNameCard;