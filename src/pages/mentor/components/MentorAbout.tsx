import React from 'react';

interface MentorAboutSectionProps {
  bio: string[];
  ratings: {
    average: number;
    count: number;
    breakdown: Array<{ label: string; value: number; percentage: string }>;
  };
}

const MentorAboutSection: React.FC<MentorAboutSectionProps> = ({ bio, ratings }) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
          </svg>
        </span>
        About Me
      </h3>
      <div className="mt-4 text-gray-700 leading-relaxed">
        {bio.map((paragraph, index) => (
          <p key={index} className={index < bio.length - 1 ? "mb-3" : "mb-6"}>
            {paragraph}
          </p>
        ))}
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
              </svg>
            </span>
            Ratings
          </h4>

          <div className="mt-4">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-blue-600">{ratings.average}</div>
              <div className="flex text-yellow-400 ml-3 text-xl">
                {[...Array(Math.floor(ratings.average))].map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {ratings.average % 1 !== 0 && <span>★</span>}
                {[...Array(5 - Math.ceil(ratings.average))].map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">({ratings.count})</span>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2 mt-4">
              {ratings.breakdown.map((rating, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="w-4 text-gray-600">{rating.label}</span>
                  <div className="bg-gray-200 w-full h-2 rounded-full flex-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: rating.percentage }}
                    />
                  </div>
                  <span className="text-gray-600 w-10 text-right">{rating.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAboutSection;