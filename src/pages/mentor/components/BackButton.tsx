import React from 'react';

interface BackButtonProps {
  label: string;
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ label, onClick }) => {
  return (
    <div className="w-full flex justify-center mt-6 mb-10">
      <button
        onClick={onClick}
        className="bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        {label}
      </button>
    </div>
  );
};

export default BackButton;