import React from "react";
import Button from "./Button"; // Reusing your Button component

interface BoxProps {
  title: string;
  description: string;
  imgPath: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const Box: React.FC<BoxProps> = ({ title, description, imgPath, buttonText, onButtonClick }) => {
  return (
    <div className="bg-myskyblue rounded-2xl shadow-lg p-6 flex flex-col items-center text-center w-80">
      {/* Image */}
      <img src={`${process.env.PUBLIC_URL}${imgPath}`} alt={title} className="w-80 h-32 object-cover rounded-lg mb-4" />

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 bg-myskyblue">{title}</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm my-2 bg-myskyblue">{description}</p>

      {/* Button */}
      <Button 
        className=""
        text={buttonText}
        onClick={onButtonClick}
      />
    </div>
  );
};

export default Box;
