import React from "react";
import UniversityCard, { UniversityCardDesktop } from "../../pages/uni/components/Uni-Card";

interface University {
  id: number;
  name: string;
  priceRange: string;
  type: string;
  location: string;
  imageUrl: string;
}

interface Props {
  universities: University[];
  view?: "mobile" | "desktop";
}

const UniversityListLayout: React.FC<Props> = ({ universities, view = "mobile" }) => {
  if (view === "mobile") {
    return (
      <div className="flex flex-col gap-4 min-h-[480px]">
        {universities.map((uni) => (
          <UniversityCard 
            key={uni.id || Math.random()} 
            id={uni.id}
            name={uni.name}
            priceRange={uni.priceRange}
            type={uni.type}
            location={uni.location}
            imageUrl={uni.imageUrl}
          />
        ))}
        
        {/* Add spacer div at the end if few items */}
        {universities.length < 3 && (
          <div className="flex-grow" />
        )}
      </div>
    );
  }
  
  // Desktop view 
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 w-full px-10">
      {universities.map((uni) => (
        <div key={uni.id || Math.random()} className="w-full">
          <UniversityCardDesktop 
            id={uni.id}
            name={uni.name}
            priceRange={uni.priceRange}
            type={uni.type}
            location={uni.location}
            imageUrl={uni.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default UniversityListLayout;
