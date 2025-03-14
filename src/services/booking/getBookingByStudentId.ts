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
        if (response.data?.status !== StatusCodes.Success || !response.data.data) {
            throw new Error("Error getting bookings");
        }

        return response.data.data; // Extracting only the bookings array
    } catch (error) {
        console.error('Error fetching student bookings:', error);
        throw error;
    }
};
