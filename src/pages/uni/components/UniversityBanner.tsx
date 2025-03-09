import React from 'react';

interface UniversityBannerProps {
  photoUrl: string;
  name: string;
}

const UniversityBanner: React.FC<UniversityBannerProps> = ({ photoUrl, name }) => {
  return (
    <div className="relative w-full h-40 md:h-48 lg:h-56 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 rounded-xl mb-16 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ 
          backgroundImage: `url(${photoUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'})`,
        }}
      >
      </div>
      
      {/* University logo/image */}
      <div className="absolute -bottom-12 left-8 sm:left-12 md:left-16">
        <div className="relative">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-85 blur"></div>
          <img
            src={photoUrl || 'https://via.placeholder.com/150'}
            alt={name}
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default UniversityBanner;