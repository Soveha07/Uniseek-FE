import React from "react";

interface UniversityCardProps {
    name: string;
    priceRange: string;
    type: string;
    location: string;
    imageUrl: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({name, priceRange, type, location, imageUrl}) => {
    return (
        <div className= "bg-skyblue rounded-lg shadow-md overflow-hidden mb-6 flex">
            <img src = {imageUrl} alt = {name} className = "w-1/3 object-cover" />
            <div className= "p-6 w-2/3">
              <h3 className = "font-bold text-md">{name}</h3>
              <ul className="text-sm">
                <li>Price range {priceRange}</li>
                <li>{type}</li>
                <li>{location}</li>
              </ul>
              <button className = "mt-2 bg-primary text-white text-sm px-4 py-2 rounded">Detail</button>

            </div>
        </div>
    );
};

export default UniversityCard;