import { timeStamp } from "console";
import { CONFIG } from "../../config";
import { StatusCodes } from "../../enums/statusCodes";
import axios from "axios";

interface Response {
    status: number;
    timeStamp: string;
    message?: string;
}

export const updateBookingStatus = () => {
    const API_BASE_URL = CONFIG.API_URL;
    const token = localStorage.getItem('token');
    const mentorId = localStorage.getItem('mentorID');

    const updateToOngoing = async (bookingId: number, setLoading: (loading: boolean) => void, setError: (error: any) => void): Promise<any> => {
        try {
            console.log("token", token);
            setLoading(true);
            const response = await axios.patch<Response>(`${API_BASE_URL}/bookings/ongoing/${bookingId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!mentorId) {
                throw new Error('Please login to update the booking');
            }

            if (response.data?.status === StatusCodes.Forbidden || !token) {
                throw new Error('You are not allowed! Please login to update the booking');
            }

            if (response.data?.status !== StatusCodes.Success) {
                throw new Error("Error updating bookings");
            }

            setLoading(false);
            return response.data
        } catch (error: any) {
            console.error('Error update bookings:', error);
            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error('Please login to see your bookings');
                } else {
                    throw new Error(error.response.data?.message || 'An unexpected error occurred.');
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const updateToDeclined = async (bookingId: number, setLoading: (loading: boolean) => void, setError: (error: any) => void): Promise<void> => {
        try {
            setLoading(true);
            const response = await axios.patch<Response>(`${API_BASE_URL}/bookings/declined/${bookingId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!mentorId) {
                throw new Error('Please login to update the booking');
            }

            if (response.data?.status === StatusCodes.Forbidden || !token) {
                throw new Error('Please login to update the booking');
            }

            if (response.data?.status !== StatusCodes.Success) {
                throw new Error("Error updating bookings");
            }

            setLoading(false);
        } catch (error: any) {
            console.error('Error update bookings:', error);
            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error('Please login to see your bookings');
                } else {
                    throw new Error(error.response.data?.message || 'An unexpected error occurred.');
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const updateToCompleted = async (bookingId: number, setLoading: (loading: boolean) => void, setError: (error: any) => void): Promise<void> => {
        try {
            setLoading(true);
            const response = await axios.patch<Response>(`${API_BASE_URL}/bookings/completed/${bookingId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!mentorId) {
                throw new Error('Please login to update the booking');
            }

            if (response.data?.status === StatusCodes.Forbidden || !token) {
                throw new Error('Please login to update the booking');
            }

            if (response.data?.status !== StatusCodes.Success) {
                throw new Error("Error updating bookings");
            }

            setLoading(false);
        } catch (error: any) {
            console.error('Error update bookings:', error);
            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error('Please login to see your bookings');
                } else {
                    throw new Error(error.response.data?.message || 'An unexpected error occurred.');
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const updateToCancelled = async (bookingId: number, setLoading: (loading: boolean) => void, setError: (error: any) => void): Promise<void> => {
        try {
            setLoading(true);
            const response = await axios.patch<Response>(`${API_BASE_URL}/bookings/cancelled/${bookingId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!mentorId) {
                throw new Error('Please login to update the booking');
            }

            if (response.data?.status === StatusCodes.Forbidden || !token) {
                throw new Error('Please login to update the booking');
            }

            if (response.data?.status !== StatusCodes.Success) {
                throw new Error("Error updating bookings");
            }

            setLoading(false);
        } catch (error: any) {
            console.error('Error update bookings:', error);
            if (error.response) {
                if (error.response.status === 403) {
                    throw new Error('Please login to see your bookings');
                } else {
                    throw new Error(error.response.data?.message || 'An unexpected error occurred.');
                }
            }
        } finally {
            setLoading(false);
        }
    }


    return {
        updateToOngoing,
        updateToDeclined,
        updateToCompleted,
        updateToCancelled
    };

}