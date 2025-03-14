import axios from 'axios';
import { CONFIG } from '../../config';
import { ApiResponse } from '../../interfaces/response.interface';
import { StatusCodes } from '../../enums/statusCodes';

const API_BASE_URL = CONFIG.API_URL;

export const bookMentor = async (mentorId: number, day: string, time: string) => {
    try {
        const token = localStorage.getItem('token');
        const studentId = localStorage.getItem('userID');

        if (!token) {
            throw new Error('Please log in.');
        }

        if (!studentId) {
            throw new Error('Please log in.');
        }

        const payload = {
            student_id: studentId,
            mentor_id: mentorId,
            day,
            time,
        }

        const response = await axios.post<ApiResponse<any>>(`${API_BASE_URL}/bookings`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error fetching student bookings:', error);
        if (error.response) {
            // Check if there is an errorCode and return custom error messages
            const { errorCode, message } = error.response.data;

            if (errorCode === 1000) {
                // Custom message for errorCode 1000
                throw new Error('Phone number is required. Please provide it to continue.');
            } else {
                // Default error message if no specific errorCode matches
                throw new Error(message || 'An unexpected error occurred.');
            }
        }
    }
}

