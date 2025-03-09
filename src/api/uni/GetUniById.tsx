import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3008';

// Add Major interface
export interface Major {
  id: number;
  name: string;
  icon?: string;
}

// Add UniversityMajor interface
export interface UniversityMajor {
  id: number;
  major: Major;
  description: string;
}

// Define the interface
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
  universityMajors?: UniversityMajor[]; 
}

export const getUniversityById = async (id: number): Promise<University | null> => {
  try {
    console.log(`Fetching university with ID ${id} from: ${API_BASE_URL}/universities/${id}`);
    
    const response = await axios.get(`${API_BASE_URL}/universities/${id}`, {
      params: {
        relations: 'universityMajors.major',
        _t: new Date().getTime() 
      }
    });
    
    console.log('API Response Status:', response.status);
    console.log('API Response Type:', typeof response.data);
    console.log('API Response Data:', JSON.stringify(response.data, null, 2));
    
    if (response.data) {
      let universityData: any = response.data;
      
      if (typeof universityData === 'object' && universityData !== null) {
        if (universityData && 'data' in universityData && universityData.data) {
          universityData = universityData.data;
          console.log('Extracted university from data property');
        }

        console.log('University data structure after extraction:', universityData);
        console.log('Has universityMajors property?', universityData && 'universityMajors' in universityData);
        
        // Initialize universityMajors as empty array if it's null or undefined
        if (!universityData.universityMajors) {
          console.log('universityMajors is null/undefined, initializing as empty array');
          universityData.universityMajors = [];
        }
        
        console.log('Final university data:', JSON.stringify(universityData, null, 2));
        
        if (universityData.universityMajors && universityData.universityMajors.length > 0) {
          console.log(`Found ${universityData.universityMajors.length} majors`);
          universityData.universityMajors.forEach((major: any, idx: number) => {
            if (!major.major) {
              console.warn(`Major at index ${idx} is missing the major property`);
            } else {
              console.log(`Major ${idx} name: ${major.major.name}`);
            }
          });
        } else {
          console.log('No majors found for this university');
        }
        return universityData as University;
      }
    }
    
    console.error('University data format not recognized:', response.data);
    return null;
  } catch (error) {
    console.error(`Failed to fetch university with ID ${id}:`, error);
    return null;
  }
};

export const formatPriceRange = (min: number, max: number): string => {
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
};