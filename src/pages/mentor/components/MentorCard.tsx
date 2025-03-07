import React from "react";
import { useNavigate } from "react-router-dom";

interface MentorCardProps {
  id?: number;
  name: string;
  university: string;
  major: string;
  imageUrl?: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ id, name, university, major, imageUrl }) => {
  const navigate = useNavigate();
  
  const handleDetailClick = () => {
    if (id) {
      navigate(`/mentors/detail/${id}`);
    } else {
      navigate(`/mentors/detail`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-10 relative">
      <img
        src={imageUrl || "/Assets/mentor-default.png"}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-3">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{university}</p>
        <p className="text-sm text-gray-700 mt-2">Major: {major}</p>
      </div>
      
      {/* Detail button */}
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
// cool
export default MentorCard;
