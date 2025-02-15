import React from "react";
import UniversityCard from "../Components/UniCard";

interface University {
  name: string;
  priceRange: string;
  type: string;
  location: string;
  imageUrl: string;
}

interface UniversityListLayoutProps {
  universities: University[];
}

const UniversityListLayout: React.FC<UniversityListLayoutProps> = ({ universities }) => {
  return (
    <div className="w-full max-w-md ">
      {universities.map((uni, index) => (
        <UniversityCard key={index} {...uni} />
      ))}
    </div>
  );
};

export default UniversityListLayout;
