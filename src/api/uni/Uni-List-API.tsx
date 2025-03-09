import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3008';

export interface University {
  id: number;
  name: string;
  location: string;
  description: string;
  total_enrollment: number;
  min_price: number;
  max_price: number;
  university_type: string;
  class_size: string;
  scholarship: boolean;
  exchange: boolean;
  facility: string;
  shift: string;
  photo_url: string;
}

// Define the response structure from your backend with interceptor
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// Function to fetch all universities
export const getAllUniversities = async (): Promise<University[]> => {
  try {
    console.log('Fetching from:', `${API_BASE_URL}/universities`);
    const response = await axios.get(`${API_BASE_URL}/universities`);
    
    console.log('API Raw Response:', response);
    console.log('API Data Type:', typeof response.data);
    console.log('API Data Structure:', response.data);
    
    let universities: University[] = [];
    
    if (Array.isArray(response.data)) {
      universities = response.data;
    } else if (response.data && typeof response.data === 'object') {
      const responseObj = response.data as Record<string, any>;
      if ('data' in responseObj && Array.isArray(responseObj.data)) {
        universities = responseObj.data;
      } else {
        universities = [response.data as University];
      }
    }
    
    console.log('Processed universities array:', universities);
    return universities;
  } catch (error) {
    console.error('Failed to fetch universities:', error);
    return [];
  }
};

// Function to fetch a single university by ID
export const getUniversityById = async (id: number): Promise<University | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/universities/${id}`);

    if (response.data && typeof response.data === 'object') {
      const responseObj = response.data as Record<string, any>;
      if ('data' in responseObj) {
        return responseObj.data as University;
      }
      return response.data as University;
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch university with ID ${id}:`, error);
    return null;
  }
};

// Function to format price range for display in UI
export const formatPriceRange = (min: number, max: number): string => {
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
};

// Helper function
export const mapUniversityToCardProps = (uni: University) => {
  return {
    id: uni.id,
    name: uni.name,
    priceRange: formatPriceRange(uni.min_price, uni.max_price),
    type: uni.university_type,
    location: uni.location,
    imageUrl: uni.photo_url || undefined,
  };
};