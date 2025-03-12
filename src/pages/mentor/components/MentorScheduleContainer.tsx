import React, { useEffect, useState } from 'react';
import { getMentorSchedule, bookMentorSession } from '../../../api/mentor/MentorSchedule';

interface MentorScheduleContainerProps {
  mentorId: number;
}

const MentorScheduleContainer: React.FC<MentorScheduleContainerProps> = ({ mentorId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [timesByDay, setTimesByDay] = useState<{[day: string]: string[]}>({});
  const [unavailableDays, setUnavailableDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const scheduleData = await getMentorSchedule(mentorId);
        
        if (scheduleData.availableDays.length > 0) {
          setAvailableDays(scheduleData.availableDays);

          setTimesByDay(scheduleData.availableTimes);

          const firstDay = scheduleData.availableDays[0];
          setSelectedDay(firstDay);
          
          if (scheduleData.availableTimes[firstDay]) {
            setAvailableTimes(scheduleData.availableTimes[firstDay]);
            
            if (scheduleData.availableTimes[firstDay].length > 0) {
              setSelectedTime(scheduleData.availableTimes[firstDay][0]);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch mentor schedule:', err);
        setError('Failed to load mentor availability. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [mentorId]);

  useEffect(() => {
    if (selectedDay && timesByDay[selectedDay]) {
      setAvailableTimes(timesByDay[selectedDay]);
      if (timesByDay[selectedDay].length > 0) {
        setSelectedTime(timesByDay[selectedDay][0]);
      } else {
        setSelectedTime('');
      }
    }
  }, [selectedDay, timesByDay]);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
  };

  const handleBookSession = async () => {
    if (!selectedDay || !selectedTime) {
      alert('Please select both a day and time for your session.');
      return;
    }

    setBookingLoading(true);
    try {
      await bookMentorSession(mentorId, selectedDay, selectedTime);
      alert(`Session booked successfully for ${selectedDay} at ${selectedTime}`);
    } catch (error) {
      console.error('Booking error:', error);
      alert(`Failed to book session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="text-red-500 text-center">
          <svg className="w-10 h-10 mx-auto text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (availableDays.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="text-gray-500 text-center">
          <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>This mentor has no available time slots.</p>
        </div>
      </div>
    );
  }

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
              onClick={() => handleDaySelect(day)}
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
      <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
        <h4 className="font-semibold text-blue-800 mb-2">Your session</h4>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Day:</span>
          <span className="font-medium">{selectedDay || '-'}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Time:</span>
          <span className="font-medium">{selectedTime || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">60 minutes</span>
        </div>
      </div>

      <button 
        className="w-full mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
        onClick={handleBookSession}
        disabled={!selectedDay || !selectedTime || bookingLoading}
      >
        {bookingLoading ? (
          <>
            <span className='bg-blue-600'>Booking...</span>
          </>
        ) : (
          'Book Your Session'
        )}
      </button>
    </div>
  );
};

export default MentorScheduleContainer;