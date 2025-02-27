import React from "react";

interface UniversityInfoProps {
  name: string;
  type: string;
  unilogo: string;  // New prop for the logo
}

const UniNameCard: React.FC<UniversityInfoProps> = ({ name, type, unilogo }) => {
  return (
    <div className="mt-4 p-4 bg-myskyblue rounded-lg flex items-center">
      <img src={unilogo} alt={`${name} logo`} className="h-20 w-20 rounded-full mb-2" />
      <div className = "ml-2 bg-myskyblue flex-col">
      <h2 className="text-b1 bg-myskyblue font-bold">{name}</h2>
      <span className="bg-myprimary text-white text-b3 px-2 py-1 rounded-md">
        {type}
      </span>
    </div>
    </div>
    
  );
};

export default UniNameCard;
