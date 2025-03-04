import React from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="relative bg-gray-100 rounded-lg shadow-md p-4 mb-10 w-full max-w-md">
      <div className="w-full h-40 rounded-lg overflow-hidden">
        <img
          src={imageUrl || "/Assets/UniPics/no-image.png"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-b1">{name}</h3>
        <ul className="text-b2 text-sm mt-1">
          <li>• Price range {priceRange}</li>
          <li>• {type}</li>
          <li>• {location}</li>
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
          src={imageUrl || "/Assets/UniPics/no-image.png"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-b1 line-clamp-1">{name}</h3>
        <ul className="text-b2 text-sm mt-1">
          <li>• Price range {priceRange}</li>
          <li>• {type}</li>
          <li>• {location}</li>
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
