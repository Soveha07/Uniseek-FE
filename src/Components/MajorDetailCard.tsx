import React from "react";

interface MajorCardProps {
  title: string;
  description: string;
}

const MajorDetailCard: React.FC<MajorCardProps> = ({ title, description }) => {
  return (
    <div className="mt-3 p-4 bg-myskyblue rounded-lg">
      <h4 className="text-md bg-myskyblue font-bold">{title}</h4>
      <p className="text-gray-700 text-b3 mt-2 bg-myskyblue">{description}</p>
      <button className="mt-3 bg-myprimary text-white px-4 py-2 rounded-lg">
        Get Mentor
      </button>
    </div>
  );
};

export default MajorDetailCard;
