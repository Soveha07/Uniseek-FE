import React from "react";
import Button from "./Button";

interface BoxProps {
  className?: string;
  title: string;
  description: string;
  imgPath: string;
  buttonText: string;
  onClick?: () => void;
}

const Box: React.FC<BoxProps> = ({ className, title, description, imgPath, buttonText, onClick }) => {
  return (
    <div className={`bg-myskyblue rounded-2xl shadow-lg p-6 flex flex-col items-start text-left w-80 ${className}`}>
      <img src={`${process.env.PUBLIC_URL}${imgPath}`} alt={title} className="w-80 h-32 object-cover rounded-lg mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 bg-myskyblue">{title}</h2>
      <p className="text-gray-600 text-sm my-2 bg-myskyblue">{description}</p>
      <Button
        className="bg-myprimary text-white rounded-full mt-4 mr-32"
        text={buttonText}
        onClick={onClick}
      />
    </div>
  );
};

export default Box;
