import React from 'react';

interface UniversityBannerProps {
  photoUrl: string;
  name: string;
}

const UniversityBanner: React.FC<UniversityBannerProps> = ({ photoUrl, name }) => {
  return (
    <div className="relative w-full h-40 md:h-48 lg:h-56 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-300 rounded-xl mb-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')`,
        }}
      >
      </div>

      {/* University logo/image */}
      <div className="absolute -bottom-12 left-8 sm:left-12 md:left-16 bg-transparent">
        <div className="relative rounded-full border-4 border-blue-500 p-1">
          <div className=""></div>

          <img
            src={`${process.env.PUBLIC_URL}/university/${photoUrl || 'noImage.jpg'}`}
            alt={name}
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-contain border-4 border-white shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/university/noImage.jpg`;
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default UniversityBanner;