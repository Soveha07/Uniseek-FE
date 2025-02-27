import React from "react";

const RatingSection: React.FC = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center gap-1">
        ⭐⭐⭐⭐☆
      </div>
      <p className="text-sm">(150 reviews)</p>
      <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full mt-2">
        See all reviews
      </button>
    </div>
  );
};

export default RatingSection;
