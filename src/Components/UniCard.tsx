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
        <div className= "bg-myskyblue rounded-lg shadow-md overflow-hidden mb-6 flex">
            <img src = {imageUrl} alt = {name} className = "w-1/3 object-cover" />
            <div className= "p-6 w-2/3 bg-myskyblue ">
              <h3 className = "font-bold text-md bg-myskyblue">{name}</h3>
              <ul className="text-b2 ">
                <li className = "bg-myskyblue">Price range {priceRange}</li>
                <li className = "bg-myskyblue">{type}</li>
                <li className = "bg-myskyblue">{location}</li>
              </ul>
              <button className = "mt-2 bg-myprimary text-white text-b2 px-4 py-2 rounded">Detail</button>

            </div>
        </div>
    );
};

export default UniversityCard;