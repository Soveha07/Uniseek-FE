import React from 'react';

interface MentorHeroBannerProps {
  profileImage: string;
}

const MentorHeroBanner: React.FC<MentorHeroBannerProps> = ({ profileImage }) => {
  return (
    <div className="relative w-full h-32 md:h-48 lg:h-52 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 rounded-xl mb-16 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className="w-full h-full">
          <rect fill="none" stroke="#fff" strokeWidth="2" x="150" y="150" width="100" height="100" />
          <rect fill="none" stroke="#fff" strokeWidth="2" x="350" y="150" width="100" height="100" />
          <rect fill="none" stroke="#fff" strokeWidth="2" x="550" y="150" width="100" height="100" />
          <rect fill="none" stroke="#fff" strokeWidth="2" x="150" y="350" width="100" height="100" />
          <rect fill="none" stroke="#fff" strokeWidth="2" x="350" y="350" width="100" height="100" />
          <rect fill="none" stroke="#fff" strokeWidth="2" x="550" y="350" width="100" height="100" />
          <rect fill="none" stroke="#fff" strokeWidth="2" x="150" y="550" width="100" height="100" />
          <rect fill="none" stroke="#fff" strokeWidth="2" x="350" y="550" width="100" height="100" />
          <rect fill="none" stroke="#fff" strokeWidth="2" x="550" y="550" width="100" height="100" />
        </svg>
      </div>

      {/* Profile Image */}
      <div className="absolute -bottom-12 left-8 sm:left-12 md:left-16">
        <div className="relative">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-85 blur"></div>
          <img
            src={profileImage || "/assets/images/profile-pic.png"}
            alt="Profile"
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MentorHeroBanner;