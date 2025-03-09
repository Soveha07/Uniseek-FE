import axios from 'axios';

// Define the base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3008';

// Define API response interface
interface ApiResponse {
  status: string;
  data: any;
  total?: number;
  page?: number;
  limit?: number;
}

// Define the Mentor interface
export interface Mentor {
  id: number;
  fullName: string;
  name?: string; 
  universityName: string;
  university?: string; 
  majorName: string;
  major?: string;
  profileUrl?: string;
  imageUrl?: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  telegramLink?: string;
}

// Process mentors array helper function
const processMentorsArray = (
  mentorsArray: any[], 
  responseData: any
): { mentorsData: Mentor[], total: number } => {
  const mentorsData = mentorsArray.map((mentor: any) => ({
    id: mentor.id,
    fullName: mentor.full_name || mentor.fullName || '',
    name: mentor.full_name || mentor.fullName || mentor.name || '',
    universityName: mentor.university?.name || mentor.universityName || '',
    university: mentor.university?.name || mentor.universityName || mentor.university || '',
    majorName: mentor.major?.name || mentor.majorName || '',
    major: mentor.major?.name || mentor.majorName || mentor.major || '',
    profileUrl: mentor.profile_url || mentor.profileUrl || '',
    imageUrl: mentor.profile_url || mentor.profileUrl || mentor.imageUrl || '',
    description: mentor.description || '',
    email: mentor.email || '',
    phoneNumber: mentor.phone_number || mentor.phoneNumber || '',
    telegramLink: mentor.telegram_link || mentor.telegramLink || ''
  }));
  
  const total = responseData.total || mentorsArray.length;
  
  return { mentorsData, total };
};

// Function to get all mentors with optional pagination
export const getMentors = async (page = 1, limit = 10): Promise<{ mentors: Mentor[], total: number }> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/mentors`, {
      params: {
        page,
        limit,
        _t: new Date().getTime()
      }
    });
    
    let mentorsData: Mentor[] = [];
    let total = response.data.total || 0;
    
    const responseData = response.data as any;
    
    if (responseData && responseData.status === 'success') {
      if (responseData.data && Array.isArray(responseData.data)) {
        const result = processMentorsArray(responseData.data, responseData);
        mentorsData = result.mentorsData;
        total = result.total;
      }
      else if (Array.isArray(responseData)) {
        const result = processMentorsArray(responseData, responseData);
        mentorsData = result.mentorsData;
        total = result.total;
      }
      else if (responseData.mentors && Array.isArray(responseData.mentors)) {
        const result = processMentorsArray(responseData.mentors, responseData);
        mentorsData = result.mentorsData;
        total = result.total;
      }
      else if (responseData.data && responseData.data.mentors && Array.isArray(responseData.data.mentors)) {
        const result = processMentorsArray(responseData.data.mentors, responseData);
        mentorsData = result.mentorsData;
        total = result.total;
      }
      else if (responseData.data && typeof responseData.data === 'object') {
        const potentialArrayProps = Object.entries(responseData.data)
          .find(([_, value]) => Array.isArray(value));
        
        if (potentialArrayProps) {
          const result = processMentorsArray(potentialArrayProps[1] as any[], responseData);
          mentorsData = result.mentorsData;
          total = result.total;
        } else if (responseData.data.id) {
          const result = processMentorsArray([responseData.data], responseData);
          mentorsData = result.mentorsData;
          total = result.total;
        }
      }
      
      total = responseData.total || total;
      console.log('Found total count in API response:', total);
    }
    
    return { mentors: mentorsData, total };
  } catch (error) {
    console.error('Failed to fetch mentors:', error);
    return { mentors: [], total: 0 };
  }
};

// Function to get a specific mentor by ID
export const getMentorById = async (id: number): Promise<Mentor | null> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/mentors/${id}`);
    const responseData = response.data as any;
    
    if (responseData && responseData.status === 'success') {
      const mentorData = responseData.data;

      return {
        id: mentorData.id,
        fullName: mentorData.full_name || mentorData.fullName || '',
        name: mentorData.full_name || mentorData.fullName || mentorData.name || '',
        universityName: mentorData.university?.name || mentorData.universityName || '',
        university: mentorData.university?.name || mentorData.universityName || mentorData.university || '',
        majorName: mentorData.major?.name || mentorData.majorName || '',
        major: mentorData.major?.name || mentorData.majorName || mentorData.major || '',
        profileUrl: mentorData.profile_url || mentorData.profileUrl || '',
        imageUrl: mentorData.profile_url || mentorData.profileUrl || mentorData.imageUrl || '',
        description: mentorData.description || '',
        email: mentorData.email || '',
        phoneNumber: mentorData.phone_number || mentorData.phoneNumber || '',
        telegramLink: mentorData.telegram_link || mentorData.telegramLink || ''
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch mentor with ID ${id}:`, error);
    return null;
  }
};