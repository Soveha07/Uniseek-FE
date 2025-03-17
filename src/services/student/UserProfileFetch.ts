import axios from 'axios';
import { CONFIG } from '../../config';

const API_BASE_URL = CONFIG.API_URL;

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  phoneNumber: string | null;
  provider?: string;
  createdAt?: string;
  updatedAt?: string | null;
  password?: string | null;
  refresh_token?: string;
  role?: string;
}

interface UserProfileResponse {
  status: number;
  message?: string;
  timestamp?: string; 
  data: UserData;
}

interface ProfileImageResponse {
  status?: number;
  message?: string;
  imageUrl: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

const UserProfileAPI = {
  getBaseUrl: () => API_BASE_URL,
  
  getUserProfile: async (uid: string): Promise<UserProfileResponse> => {
    try {
      console.log(`Fetching profile with uid: ${uid}`);
      const response = await api.get<UserProfileResponse>(`/student/${uid}`);
      console.log("Profile response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  updateUserProfile: async (uid: string, userName: string, phoneNumber: string): Promise<UserProfileResponse> => {
    try {
      const response = await api.post<UserProfileResponse>(
        `/student/update/${uid}`,
        {
          username: userName,
          phoneNumber
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  uploadProfileImage: async (uid: string, imageFile: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      // Try both endpoints to handle inconsistencies
      try {
        const response = await api.post<ProfileImageResponse>(
          `/student/upload-profile-image/${uid}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data.imageUrl;
      } catch (specificEndpointError) {
        const response = await api.post<ProfileImageResponse>(
          `/student/upload-image/${uid}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data.imageUrl;
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  },

  updateProfileImage: async (uid: string, imageFile: File, currentImageUrl: string): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('currentImageUrl', currentImageUrl);

      const response = await api.post<ProfileImageResponse>(
        `/student/update-profile-image/${uid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.imageUrl;
    } catch (error) {
      console.error('Error updating profile image:', error);
      throw error;
    }
  },

  deleteUserProfile: async (uid: string): Promise<boolean> => {
    try {
      await api.delete(`/student/${uid}`);
      return true;
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw error;
    }
  },
};

export default UserProfileAPI;