import axios from 'axios';

// Define the base API URL - update this with your actual API endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3008';

// Define the Mentor interface
export interface Mentor {
  id: number;
  name: string;
  university: string;
  major: string;
  imageUrl: string;
  bio?: string;
  email?: string;
  linkedIn?: string;
  expertise?: string[];
  yearsOfExperience?: number;
}

// Function to get all mentors with optional pagination
export const getMentors = async (page: number = 1, limit: number = 10): Promise<{
  mentors: Mentor[];
  total: number;
}> => {
  try {
    console.log(`Fetching mentors - page ${page}, limit ${limit}`);
    
    const response = await axios.get<{ data?: Mentor[], total?: number } | Mentor[]>(`${API_BASE_URL}/mentors`, {
      params: {
        page,
        limit,
        _t: new Date().getTime() // Prevent caching
      }
    });
    
    console.log('API Response:', response.data);
    
    let mentorsData: Mentor[] = [];
    let total = 0;
    
    if (response.data) {
      // Handle different response structures
      if ('data' in response.data && Array.isArray(response.data.data)) {
        mentorsData = response.data.data;
        total = response.data.total || mentorsData.length;
      } else if (Array.isArray(response.data)) {
        mentorsData = response.data;
        total = mentorsData.length;
      }
      
      console.log(`Retrieved ${mentorsData.length} mentors out of ${total} total`);
      return { mentors: mentorsData, total };
    }
    
    return { mentors: [], total: 0 };
  } catch (error) {
    console.error('Failed to fetch mentors:', error);
    return { mentors: [], total: 0 };
  }
};

// Function to get a specific mentor by ID
export const getMentorById = async (id: number): Promise<Mentor | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mentors/${id}`);
    
    if (response.data) {
      let mentorData: any = response.data;
      
      // Handle nested response structure
      if (mentorData.data) {
        mentorData = mentorData.data;
      }
      
      return mentorData as Mentor;
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch mentor with ID ${id}:`, error);
    return null;
  }
};