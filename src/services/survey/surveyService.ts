import axios from 'axios';
import { CONFIG } from '../../config';
import { University } from '../../interfaces/university.interface';
import { ApiResponse } from '../../interfaces/response.interface';

const API_BASE_URL = CONFIG.API_URL;

export const submitSurvey = async (surveyData: any): Promise<University[]> => {
    try {
        const response = await axios.post<ApiResponse<University[]>>(`${API_BASE_URL}/survey-responses`, surveyData);
        if (response.data?.status !== "success" || !response.data.data) {
            throw new Error("Error submitting survey");
        }

        console.log("api response", response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error submitting survey:', error);
        throw error;
    }
};
