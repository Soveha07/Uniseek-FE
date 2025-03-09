import React from "react";
import MentorCard from "../../pages/mentor/components/MentorCard";

interface Mentor {
  name: string;
  university: string;
  major: string;
  imageUrl?: string;
}

interface MentorListLayoutProps {
  mentors: Mentor[];
  view?: "mobile" | "desktop";
}

const MentorListLayout: React.FC<MentorListLayoutProps> = ({ mentors, view = "mobile" }) => {
  if (view === "mobile") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[70vh] p-4">
        {mentors.map((mentor, index) => (
          <MentorCard key={index} {...mentor} />
        ))}
      </div>
    );
  }
  
  // Desktop view
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5">
      {mentors.map((mentor, index) => (
        <div key={index} className="w-full">
          <MentorCard 
            name={mentor.name}
            university={mentor.university}
            major={mentor.major}
            imageUrl={mentor.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default MentorListLayout;
