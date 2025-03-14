import axios from 'axios';
import { StatusCodes } from '../../enums/statusCodes';

const API_URL = 'http://localhost:3008/mentors';
export interface MentorSchedule {
  mentorId: number;
  availableDays: string[];
  availableTimes: {
    [day: string]: string[];
  };
}

// Define interfaces for the nested response structure
interface ApiResponseData {
  status: string;
  timestamp: string;
  data: MentorSchedule;
}

interface ApiResponse {
  status: string;
  timestamp: string;
  data: ApiResponseData;
}

interface BookingResponse {
  status: string;
  timestamp: string;
  data: { bookingId: number };
}
/**
 * Fetches the availability schedule for a specific mentor
 * 
 * @param mentorId The ID of the mentor to fetch schedule for
 * @returns Promise resolving to the mentor's schedule
 */
export const getMentorSchedule = async (mentorId: number): Promise<MentorSchedule> => {
  try {
    console.log(`Making API request to ${API_URL}/${mentorId}/schedule`);
    const response = await axios.get<ApiResponse | ApiResponseData>(`${API_URL}/${mentorId}/schedule`);
    console.log('Raw API response:', response);
    const responseData = response.data as any;

    if (responseData?.status === StatusCodes.Success) {
      if (responseData.data?.status === StatusCodes.Success && responseData.data.data) {
        return responseData.data.data;
      } else if (responseData.data) {
        return responseData.data;
      }
    }

    console.error('Invalid response format:', responseData);
    throw new Error('Invalid response format');
  } catch (error: any) {
    console.error('Error fetching mentor schedule:', error);
    if (error.response) {
      console.error('Response error data:', error.response.data);
      console.error('Response error status:', error.response.status);

      const status = error.response.status;
      if (status === 404) {
        throw new Error('Mentor not found or has no schedule available');
      } else if (status === 500) {
        throw new Error('Server error while fetching mentor schedule');
      } else {
        throw new Error(`Server returned error: ${status} - ${error.response.data?.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      console.error('No response received from server');
      throw new Error('Network error. Please check your connection');
    }
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch mentor schedule'
    );
  }
};

/**
 * Books a session with a mentor at a specific day and time
 * 
 * @param mentorId The ID of the mentor to book
 * @param day The day of the booking
 * @param time The time of the booking
 * @returns Promise resolving to the booking confirmation
 */
export const bookMentorSession = async (
  mentorId: number,
  day: string,
  time: string
): Promise<{ bookingId: number }> => {
  try {
    const response = await axios.post<BookingResponse>(`${API_URL}/${mentorId}/booking`, {
      day,
      time,
    });

    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid booking response format');
  } catch (error: any) {
    console.error('Error booking mentor session:', error);

    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        throw new Error('Invalid booking request. Please check your selection.');
      } else if (status === 409) {
        throw new Error('This time slot is no longer available.');
      } else if (status === 403) {
        throw new Error('You must be logged in to book a session.');
      }
    }

    throw new Error(
      error instanceof Error ? error.message : 'Failed to book mentor session'
    );
  }
};