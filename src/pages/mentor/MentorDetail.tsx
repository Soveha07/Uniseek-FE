import React from "react";
import Header from "../../components/common/Header";
import SocialLinks from "./components/SocialLinks";

const MentorDetail: React.FC = () => {
  return (
    <div className="bg-mysecondary min-h-screen flex flex-col items-center p-4 pb-10">
      <div className="w-full max-w-lg md:max-w-2xl">
        <Header />
        
        {/* Profile Section - Enhanced with background and shadow */}
        <div className="flex flex-col items-center mt-4 mb-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 blur"></div>
            <img
              src="/assets/images/profile-pic.png" 
              alt="Profile"
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
            />
          </div>
          <h2 className="text-2xl font-bold mt-3 text-gray-800">Just Me</h2>
          <p className="text-gray-600 font-medium">Data Science Student & Junior Data Scientist</p>
        </div>

        {/* About Section - Improved styling */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">About Me</h3>
          <p className="text-gray-700 leading-relaxed">
            A year 5 student at ITC, majoring in Data Science. Currently working as a Junior Data Scientist at EY.
            Passionate about helping students navigate their educational and career paths in the tech industry.
          </p>

          {/* Social Links - Better positioning */}
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t">
            <SocialLinks />
          </div>
        </div>

        {/* Ratings & Reviews - Enhanced UI */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full mt-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Ratings & Reviews</h3>
          
          <div className="flex items-center mb-4">
            <div className="text-2xl font-bold">4.3</div>
            <div className="flex text-yellow-400 ml-2 text-xl">
              ★★★★<span className="text-gray-300">★</span>
            </div>
            <span className="text-sm text-gray-600 ml-2">(150 reviews)</span>
          </div>

          {/* Rating Breakdown - Better visual representation */}
          <div className="space-y-2">
            {[
              { label: "5 stars", value: 15 },
              { label: "4 stars", value: 90 },
              { label: "3 stars", value: 15 },
              { label: "2 stars", value: 10 },
              { label: "1 star", value: 10 },
            ].map((rating, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="w-14 text-gray-600">{rating.label}</span>
                <div className="bg-gray-200 w-full h-2 rounded-full flex-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${rating.value}%` }}
                  />
                </div>
                <span className="text-gray-600 w-8 text-right">{rating.value}</span>
              </div>
            ))}
          </div>

          <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition flex mx-auto">
            See all reviews
          </button>
        </div>

        {/* Schedule Section - Better calendar design */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full mt-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Schedule a Meeting</h3>
          
          {/* Day selection */}
          <div className="grid grid-cols-5 gap-2 mt-3">
            {[
              {day: "Monday", date: "20", available: true},
              {day: "Tuesday", date: "21", available: true},
              {day: "Wednesday", date: "22", available: false},
              {day: "Thursday", date: "23", available: true},
              {day: "Friday", date: "24", available: true},
            ].map((item, index) => (
              <button
                key={index}
                disabled={!item.available}
                className={`p-2 border rounded-lg text-center transition
                  ${item.day === "Tuesday" 
                    ? "bg-blue-600 text-white border-blue-600" 
                    : item.available 
                      ? "bg-white hover:border-blue-400" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              >
                <div className="text-sm font-medium">{item.day}</div>
                <div className={`text-lg ${item.day === "Tuesday" ? "font-bold" : ""}`}>
                  {item.date}
                </div>
              </button>
            ))}
          </div>
          
          {/* Time selection - Added */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"].map((time, index) => (
              <button
                key={index}
                className={`p-2 border rounded-lg text-center hover:border-blue-400
                  ${time === "11:00 AM" ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        
        {/* Action Buttons - Better positioning and styling */}
        <div className="flex justify-between w-full mt-6">
          <button className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition">
            Back to List
          </button>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition">
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;
