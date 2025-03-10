import React from 'react';
import { formatPriceRange } from '../../../api/uni/GetUniById';
import { capitalizeFirstLetter } from '../helper/capitalize';

interface UniversityHeaderProps {
  name: string;
  universityType: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  totalEnrollment?: number;
}

const UniversityHeader: React.FC<UniversityHeaderProps> = ({
  name,
  universityType,
  location,
  minPrice,
  maxPrice,
  totalEnrollment
}) => {

  return (
    <div className="flex flex-col ml-8 sm:ml-12 md:ml-16 mb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h1>
      <div className="flex items-center gap-2 mt-2">
        <span className="bg-blue-600 text-white text-xs md:text-sm py-1 px-2 rounded-full">
          {capitalizeFirstLetter(universityType)}
        </span>
        {/* <span className="text-gray-600 font-medium mt-0">
          {location}
        </span> */}
      </div>
      {/* <div className="flex items-center gap-2 mt-3">
        <span className="text-gray-600">
          <span className="font-semibold">Tuition:</span> {formatPriceRange(minPrice, maxPrice)}
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600">
          <span className="font-semibold">Students:</span> {totalEnrollment ? totalEnrollment.toLocaleString() : 'N/A'}
        </span>
      </div> */}
    </div>
  );
};

export default UniversityHeader;