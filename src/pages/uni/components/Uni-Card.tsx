import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../helper/capitalize";

interface UniversityCardProps {
  id: number;
  name: string;
  priceRange: string;
  type: string;
  location: string;
  imageUrl?: string;
}

// Mobile Card Component
const UniversityCard: React.FC<UniversityCardProps> = ({
  id,
  name,
  priceRange,
  type,
  location,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/universities/detail/${id}`);
  };

  console.log("imageUrl", imageUrl);

  return (
    <div className="relative bg-gray-100 rounded-lg shadow-md p-4 mt-5 mb-5 w-full max-w-md">
      <div className="w-full h-40 rounded-lg overflow-hidden">
        <img
          src={`${process.env.PUBLIC_URL}/university/${imageUrl || 'noImage.jpg'}`}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/university/noImage.jpg`;
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-b1">{name}</h3>
        <ul className="text-b2 text-sm mt-1">
          <li className="flex items-center">
            <span className="text-blue-500 text-lg mr-1">💰</span>
            <span className="font-semibold">Price Range:</span>
            <span className="ml-1">{priceRange}</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 text-lg mr-1">🏫</span>
            <span className="font-semibold">Type:</span>
            <span className="ml-1">{capitalizeFirstLetter(type)}</span>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-[-14px] right-4">
        <button
          onClick={handleDetailClick}
          className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          Detail
        </button>
      </div>
    </div>
  );
};

// Desktop Card Component
export const UniversityCardDesktop: React.FC<UniversityCardProps> = ({
  id,
  name,
  priceRange,
  type,
  location,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/universities/detail/${id}`);
  };


  return (
    <div className="relative bg-gray-100 rounded-lg shadow-md p-4 mb-10 w-full h-[420px]">
      <div className="w-full h-40 rounded-lg overflow-hidden">
        <img
          src={`${process.env.PUBLIC_URL}/university/${imageUrl || 'noImage.jpg'}`}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/university/noImage.jpg`;
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-b1 break-words whitespace-normal">{name}</h3>
        <ul className="text-b2 text-sm mt-3 space-y-2">
          <li className="flex items-center">
            <span className="text-blue-500 text-lg mr-1">💰</span>
            <span className="font-semibold">Price Range:</span>
            <span className="ml-1">{priceRange}</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 text-lg mr-1">🏫</span>
            <span className="font-semibold">Type:</span>
            <span className="ml-1">{capitalizeFirstLetter(type)}</span>
          </li>
        </ul>

      </div>

      <div className="absolute bottom-[-14px] right-4">
        <button
          onClick={handleDetailClick}
          className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default UniversityCard;
