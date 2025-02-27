import React from "react";

const MentorDetailHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/assets/images/mentor.png"
        alt="Mentor"
        className="w-24 h-24 rounded-full"
      />
      <h2 className="text-xl font-bold mt-2">Just Me</h2>
    </div>
  );
};

export default MentorDetailHeader;
