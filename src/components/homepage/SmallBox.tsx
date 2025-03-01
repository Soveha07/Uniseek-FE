import React, { FC } from "react";
import Button from "./Button";

interface SmallBoxProps {
    className?: string;
    title: string;
    description: string;
    buttonText: string;
    onClick?: () => void;
}

const SmallBox: React.FC<SmallBoxProps> = ({ className, title, description, buttonText, onClick }) => {
    return (
        <div className={`border-1 md:border-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center w-72 h-56 ${className}`}>
            <h2 className="flex flex-col items-start text-left text-lg font-semibold text-gray-900 bg-white">{title}</h2>
            <p className="flex flex-col items-start text-left text-gray-600 text-sm my-2 bg-white">{description}</p>
            <Button
                className="bg-myprimary text-white rounded-md w-52 mt-6"
                text={buttonText}
                onClick={onClick}
            />
        </div>
    );
};

export default SmallBox;