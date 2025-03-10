import React from 'react';
import { formatPriceRange } from '../../../api/uni/GetUniById';

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
    </div>
  );
};

export default UniversityHeader;