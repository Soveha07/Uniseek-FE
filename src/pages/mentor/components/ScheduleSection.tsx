import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const currentDate = 21; 

const ScheduleSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("Tuesday");

  return (
    <div className="text-center">
      <h3 className="font-semibold">Schedule</h3>
      <div className="flex justify-center gap-2 mt-2">
        {days.map((day) => (
          <button
            key={day}
            className={`px-4 py-2 border rounded-lg ${
              selectedDay === day ? "bg-blue-600 text-white" : "border-gray-400"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day} {currentDate}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSection;
