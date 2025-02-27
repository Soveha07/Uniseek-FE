import React from "react";

interface MentorCardProps {
  name: string;
  university: string;
  quote: string;
  imageUrl?: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ name, university, quote, imageUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      <img
        src={imageUrl || "/Assets/mentor-default.png"}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-3">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{university}</p>
        <p className="text-sm italic text-gray-700 mt-2">"{quote}"</p>
      </div>
    </div>
  );
};

export default MentorCard;
