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
        {label}
      </button>
    </div>
  );
};

export default BackButton;