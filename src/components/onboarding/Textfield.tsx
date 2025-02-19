import React, { InputHTMLAttributes, useState } from "react";

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name?: string;
  isPassword?: boolean;
  value?: string;
}

export default function Textfield({ className, name, isPassword, value, ...rest }: TextfieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const showIcon =
    `${process.env.PUBLIC_URL}/onboarding/eye.svg`;
  const hideIcon =
    `${process.env.PUBLIC_URL}/onboarding/eye-off.svg`;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full flex justify-center items-center">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : "text"}
        name={name}
        className={`text-black placeholder:text-[#888888] rounded-3xl md:w-96 sm:min-w-80 md:h-14 sm:h-10 w-80 h-10 pr-10 pl-5 bg-[#E5E7EB] ${className}`} // Added padding to prevent overlap with the button
        value={value}
        {...rest}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-3 text-sm text-gray-500 mb-10"
          onClick={togglePasswordVisibility}
        >
          <img src={showPassword ? hideIcon : showIcon} alt="" className="bg-[#E5E7EB]" />
        </button>
      )}
    </div>
  );
}
