import React from 'react';

interface MentorScheduleSectionProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  availableDays: string[];
  availableTimes: string[];
  unavailableDays?: string[];
}

const MentorScheduleSection: React.FC<MentorScheduleSectionProps> = ({ 
  selectedDay, 
  setSelectedDay, 
  selectedTime, 
  setSelectedTime,
  availableDays,
  availableTimes,
  unavailableDays = []
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
          {/* Calendar icon */}
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
        </span>
        Schedule a Meeting
      </h3>

      <p className="mt-2 text-sm text-gray-600">Select a day and time for your mentoring session</p>

      {/* Day selection */}
      <div className="mt-5">
        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Available Days</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {availableDays.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              disabled={unavailableDays.includes(day)}
              className={`p-2 border rounded-lg text-center transition
                ${selectedDay === day
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : !unavailableDays.includes(day)
                    ? "bg-white hover:border-blue-400"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Time selection */}
      <div className="mt-6">
        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Available Times</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-2 border rounded-lg text-center transition
                ${selectedTime === time
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white hover:border-blue-400"}`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Session info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-semibold text-blue-800 mb-2">Your session</h4>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Day:</span>
          <span className="font-medium">{selectedDay}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Time:</span>
          <span className="font-medium">{selectedTime}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">60 minutes</span>
        </div>
      </div>

      <button className="w-full mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Book Your Session
      </button>
    </div>
  );
};

export default MentorScheduleSection;