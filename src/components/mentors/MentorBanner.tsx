import React from 'react';

interface MentorHeroBannerProps {
  profileImage: string;
}

const MentorHeroBanner: React.FC<MentorHeroBannerProps> = ({ profileImage }) => {
  return (
    <div className="relative w-full h-40 md:h-48 lg:h-56 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-600 rounded-xl mb-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://mentoryuva.org/assets/img/new_banner1.jpg')`,
        }}
      >
      </div>

      {/* Profile Image */}
      <div className="absolute -bottom-12 left-8 sm:left-12 md:left-16 bg-transparent">
        <div className="relative rounded-full border-4 border-blue-500 p-1">
          <div className=""></div>

          <img
            src={profileImage
              ? `${profileImage}`
              : `${process.env.PUBLIC_URL}/noProfile.png`}
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-contain border-4 border-white shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/noProfile.png`;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MentorHeroBanner;