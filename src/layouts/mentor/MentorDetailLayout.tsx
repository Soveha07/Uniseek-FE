import React from "react";
import MentorDetailHeader from "../../pages/mentor/components/MentorDetailHeader";
import AboutSection from "../../pages/mentor/components/AboutSection";
import SocialLinks from "../../pages/mentor/components/SocialLinks";
import RatingSection from "../../pages/mentor/components/RatingSection";
import ScheduleSection from "../../pages/mentor/components/ScheduleSection";
import BookButton from "../../pages/mentor/components/BookButton";

const MentorDetailLayout: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <MentorDetailHeader />
      <AboutSection />
      <SocialLinks />
      <RatingSection />
      <ScheduleSection />
      <BookButton />
    </div>
  );
};

export default MentorDetailLayout;
