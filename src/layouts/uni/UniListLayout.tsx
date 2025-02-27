import React from "react";
import UniversityCard from "../../pages/uni/components/Uni-Card";

interface University {
  name: string;
  priceRange: string;
  type: string;
  location: string;
  imageUrl: string;
}

interface Props {
  universities: University[];
}

const UniversityListLayout: React.FC<Props> = ({ universities }) => {
  return (
    <div className="flex flex-col gap-4">
      {universities.map((uni, index) => (
        <UniversityCard key={index} {...uni} />
      ))}
    </div>
  );
};

export default UniversityListLayout;
