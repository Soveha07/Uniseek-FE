import React from "react";
import MentorCard from "../../pages/mentor/components/MentorCard";
import { Mentor as ApiMentor } from "../../api/mentor/GetMentors";

interface MentorListLayoutProps {
  mentors: ApiMentor[];
  view?: "mobile" | "desktop";
}

const MentorListLayout: React.FC<MentorListLayoutProps> = ({ mentors, view = "mobile" }) => {
  console.log(`Rendering MentorListLayout with ${mentors.length} mentors in ${view} view`);
  console.log('First mentor sample:', mentors[0]);
  
  if (view === "mobile") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[60vh] p-4">
        {mentors.map((mentor, index) => (
          <MentorCard 
            key={mentor.id || index} 
            id={mentor.id} 
            name={mentor.name || mentor.fullName || ''}
            university={mentor.university || mentor.universityName || ''}
            major={mentor.major || mentor.majorName || ''}
            imageUrl={mentor.imageUrl || mentor.profileUrl}
          />
        ))}
      </div>
    );
  }
  
  // Desktop view
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5">
      {mentors.map((mentor, index) => (
        <div key={mentor.id || index} className="w-full">
          <MentorCard 
            id={mentor.id}
            name={mentor.name || mentor.fullName || ''}
            university={mentor.university || mentor.universityName || ''}
            major={mentor.major || mentor.majorName || ''}
            imageUrl={mentor.imageUrl || mentor.profileUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default MentorListLayout;
