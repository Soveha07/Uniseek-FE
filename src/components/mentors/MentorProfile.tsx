import React from 'react';
import SocialLinks from './SocialLinks';

interface MentorProfileHeaderProps {
  name: string;
  rating: number;
  reviewCount: number;
  university: string;
  title: string;
}

const MentorProfileHeader: React.FC<MentorProfileHeaderProps> = ({
  name,
  rating,
  reviewCount,
  university,
  title
}) => {
  // Generate star rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`text-xl ${i <= Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
    );
  }

  return (
    <div className="flex flex-col ml-8 sm:ml-12 md:ml-16 mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h2>
      <div className="flex items-center gap-1 mt-1">
        {stars}
        <span className="text-gray-600 ml-1 text-sm">({rating})</span>
      </div>

      <div className="flex flex-col mt-2">
        <span className="text-gray-700 font-medium">{university}</span>
        <span className="text-gray-500 text-sm mt-0.5">{title}</span>
      </div>
    </div>
  );
};

export default MentorProfileHeader;