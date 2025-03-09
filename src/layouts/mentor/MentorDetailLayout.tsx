import React, { ReactNode } from 'react';
import Header from '../../components/common/Header';

interface MentorDetailLayoutProps {
  children: ReactNode;
}

const MentorDetailLayout: React.FC<MentorDetailLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-blue-100 min-h-screen">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:max-w-none lg:px-8">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MentorDetailLayout;