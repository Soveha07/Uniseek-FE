import React from "react";

interface ButtonProps {
    className?: string;
    text: string;
    onClick?: () => void;

}

export default function Button({className, text, onClick}: ButtonProps) {
    return (
        <button className={`px-4 py-2 w-32 h-10 text-sm ${className}`} onClick={onClick}>
            <p className="sm:text-sm bg-transparent m-0 p-0">{text}</p>
        </button>
    )
}
