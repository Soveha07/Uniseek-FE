import React from "react";
import MentorCard from "../../pages/mentor/components/MentorCard";

interface MentorListLayoutProps {
  mentors: { name: string; university: string; quote: string; imageUrl?: string }[];
}

const MentorListLayout: React.FC<MentorListLayoutProps> = ({ mentors }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[70vh] p-4">
      {mentors.map((mentor, index) => (
        <MentorCard key={index} {...mentor} />
      ))}
    </div>
  );
};

export default MentorListLayout;
