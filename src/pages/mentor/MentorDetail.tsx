import React from "react";
import MentorDetailLayout from "../../layouts/mentor/MentorDetailLayout";

const MentorDetail: React.FC = () => {
  return (
    <div className="bg-mysecondary min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        <MentorDetailLayout />
      </div>
    </div>
  );
};

export default MentorDetail;
