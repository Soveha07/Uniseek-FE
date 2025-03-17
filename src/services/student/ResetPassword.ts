import axios from 'axios';
import { CONFIG } from '../../config';

const API_BASE_URL = CONFIG.API_URL;

interface ResetPasswordResponse {
  status: number;
  message?: string;
  timestamp?: string;
}

// Log the API base URL for debugging
console.log("API Base URL for password reset:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token with every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Authentication error, redirecting to login");
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const PasswordResetAPI = {
  getBaseUrl: () => API_BASE_URL,
  updatePassword: async (uid: string, newPassword: string): Promise<ResetPasswordResponse> => {
    try {
      const fullUrl = `/student/update-password/${uid}`;
      console.log(`Attempting password reset request to: ${API_BASE_URL}${fullUrl}`);
      
      const response = await api.post(
        fullUrl,
        {
          password: newPassword
        }
      );
      
      console.log("Password reset successful, response:", response.status);
      
      return {
        status: response.status,
        message: "Password updated successfully"
      };
    } catch (error: any) {
      console.error('Error updating password:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      
      throw error;
    }
  },
  
  verifyCurrentPassword: async (uid: string, currentPassword: string): Promise<boolean> => {
    // Future Implementations
    return true;
  }
};

export default PasswordResetAPI;