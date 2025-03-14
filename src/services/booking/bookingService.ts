import axios from 'axios';
import { CONFIG } from '../../config';

const API_BASE_URL = CONFIG.API_URL;

export const bookMentor = async (mentorId: number, day: string, time: string) => {
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
    };

    return axios.post(`${API_BASE_URL}/bookings`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};
