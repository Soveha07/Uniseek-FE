import axios from "axios";

const API_URL = "http://localhost:3008/mentors";

// Define the Mentor interface and export it
export interface Mentor {
  id: number;
  fullName: string;
  description?: string;
  profileUrl?: string;
  email?: string;
  phoneNumber?: string;
  telegramLink?: string;
  universityId?: number;
  majorId?: number;
  university?: {
    id: number;
    name: string;
    location?: string;
    photo_url?: string;
  };
  major?: {
    id: number;
    name: string;
    photoUrl?: string;
  };
}

export const getFilteredMentors = async (majorId: number, universityId: number): Promise<Mentor[]> => {
  try {
    const response = await axios.get(`${API_URL}/filter`, {
      params: {
        majorId,
        universityId
      }
    });
    
    const responseData = response.data as any;
    
    if (responseData?.data?.data && Array.isArray(responseData.data.data)) {
      return responseData.data.data;
    } else if (responseData?.data && Array.isArray(responseData.data)) {
      return responseData.data;
    } else if (Array.isArray(responseData)) {
      return responseData;
    }
    
    return [];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch filtered mentors"
    );
  }
};