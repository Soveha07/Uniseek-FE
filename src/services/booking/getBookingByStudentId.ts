import axios from 'axios';
import { CONFIG } from '../../config';
import { ApiResponse } from '../../interfaces/response.interface';
import { StatusCodes } from '../../enums/statusCodes';

const API_BASE_URL = CONFIG.API_URL;

export const fetchStudentBookings = async (studentId: any) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get<ApiResponse<any>>(`${API_BASE_URL}/bookings/student/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!studentId) {
            throw new Error('Student ID is required to fetch bookings');
        }

        if (response.data?.status === StatusCodes.Forbidden || !token) {
            throw new Error('Please login to see your bookings');
        }

        if (response.data?.status !== StatusCodes.Success || !response.data.data) {
            throw new Error("Error getting bookings");
        }

        return response.data.data; // Extracting only the bookings array
    } catch (error: any) {
        console.error('Error fetching student bookings:', error);
        if (error.response) {
            if (error.response.status === 403) {
                throw new Error('Please login to see your bookings');
            } else {
                throw new Error(error.response.data?.message || 'An unexpected error occurred.');
            }
        }
    }
};
