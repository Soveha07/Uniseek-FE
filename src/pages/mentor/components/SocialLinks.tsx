import React from "react";

const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-4">
      <a href="#" className="text-blue-600">
        <img 
          src="/images/linkedin.png" 
          alt="LinkedIn" 
          className="w-6 h-6"
        />
      </a>
      <a href="#" className="text-blue-600">
        <img 
          src="/images/telegram.png" 
          alt="Telegram" 
          className="w-6 h-6"
        />
      </a>
    </div>
  );
};

export default SocialLinks;
