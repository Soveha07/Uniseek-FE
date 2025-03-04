import axios from 'axios';

// Define the base API URL - update this with your actual API endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3008';

// Define the interface for university data based on your database schema
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

/**
 * Fetches a single university by ID
 * @param id The university ID to fetch
 * @returns The university data or null if not found
 */
export const getUniversityById = async (id: number): Promise<University | null> => {
  try {
    console.log(`Fetching university with ID ${id} from: ${API_BASE_URL}/universities/${id}`);
    
    const response = await axios.get(`${API_BASE_URL}/universities/${id}`);
    
    // Debug logging
    console.log('API Raw Response:', response);
    console.log('API Data Type:', typeof response.data);
    console.log('API Data Structure:', response.data);
    
    // Handle different response formats
    if (response.data) {
      // Direct object response
      if (typeof response.data === 'object' && !Array.isArray(response.data)) {
        // Check if wrapped in a data property
        const responseObj = response.data as Record<string, any>;
        
        if ('data' in responseObj && typeof responseObj.data === 'object') {
          return responseObj.data as University;
        }
        
        // If not wrapped, return the object directly
        return response.data as University;
      }
    }
    
    console.error('University data format not recognized:', response.data);
    return null;
  } catch (error) {
    console.error(`Failed to fetch university with ID ${id}:`, error);
    return null;
  }
};

/**
 * Function to format price range for display in UI
 * @param min Minimum price
 * @param max Maximum price
 * @returns Formatted price range string
 */
export const formatPriceRange = (min: number, max: number): string => {
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
};