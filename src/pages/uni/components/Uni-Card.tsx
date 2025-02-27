import React from "react";

interface UniversityCardProps {
  name: string;
  priceRange: string;
  type: string;
  location: string;
  imageUrl?: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({
  name,
  priceRange,
  type,
  location,
  imageUrl,
}) => {
  return (
    <div className="relative bg-gray-100 rounded-lg shadow-md p-4 mb-10 w-full max-w-md">
      {/* University Image with Default "No Image" Placeholder */}
      <div className="w-full h-40 rounded-lg overflow-hidden">
        <img
          src={imageUrl || "/Assets/UniPics/no-image.png"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* University Info */}
      <div className="p-4">
        <h3 className="font-bold text-b1">{name}</h3>
        <ul className="text-b2 text-sm mt-1">
          <li>• Price range {priceRange}</li>
          <li>• {type}</li>
          <li>• {location}</li>
        </ul>
      </div>

      {/* Overflowing "Detail" Button - Now BLUE */}
      <div className="absolute bottom-[-14px] right-4">
        <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md">
          Detail
        </button>
      </div>
    </div>
  );
};

export default UniversityCard;
