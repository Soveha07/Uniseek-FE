import React from "react";

interface ButtonProps {
    className?: string;
    text: string;
    onClick?: () => void;

}

export default function Button({className,text, onClick}: ButtonProps) {
    return (
        <button className={`rounded-3xl mt-2 px-7 md:w-96 sm:min-w-80 md:h-14 sm:h-10 w-80 h-10 ${className}`} onClick={onClick}>
            <h1 className="md:text-xl sm:text-sm bg-transparent m-0 p-0">{text}</h1>
        </button>
    )
}
