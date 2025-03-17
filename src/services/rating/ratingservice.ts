import axios from 'axios';
import { CONFIG } from '../../config';
import { ApiResponse } from '../../interfaces/response.interface';
import { StatusCodes } from '../../enums/statusCodes';

const API_BASE_URL = CONFIG.API_URL;

export interface Rating {
    id?: number;
    mentorId: number;
    studentId: string | null;
    rating: number;
    review?: string;
    student?: Student
}

export interface MentorRatingsResponse {
    mentorId: number;
    avgRating: number;
    totalRatings: number;
    ratings: Rating[];
}

export interface Student {
    displayName: string;
    photoURL: string
}

const token = localStorage.getItem("token");

const ratingService = {
    // Add a rating
    addRating: async (rating: Rating) => {
        try {
            const response = await axios.post<ApiResponse<any>>(`${API_BASE_URL}/ratings`, rating, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error adding mentor ratings:', error);
            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error('Please login to see rate the mentor');
                } else {
                    throw new Error(error.response.data?.message || 'An unexpected error occurred.');
                }
            }
        }
        throw new Error('An unexpected error occurred.');
        throw new Error('An unexpected error occurred.');
    },

    // Get ratings by mentorId
    getRatingsByMentor: async (mentorId: number): Promise<MentorRatingsResponse> => {
        try {

            const response = await axios.get<ApiResponse<any>>(`${API_BASE_URL}/ratings/${mentorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!mentorId) {
                throw new Error('Please login to see your bookings');
            }

            if (!token || response.data?.status === StatusCodes.Forbidden) {
                throw new Error('Please login to see your bookings');
            }

            return response.data.data;
        } catch (error: any) {
            console.error('Error adding mentor ratings:', error);
            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error('Please login to see rate the mentor');
                } else {
                    throw new Error(error.response.data?.message || 'An unexpected error occurred.');
                }
            }
            // Add this as a fallback to ensure a return value
            throw new Error('An unexpected error occurred.');
        }
    },
};


export default ratingService;
