import axios from 'axios';
import { CONFIG } from '../../config';

const API_BASE_URL = CONFIG.API_URL;

export const submitSurvey = async (surveyData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/survey-responses`, surveyData);
        return response.data;
    } catch (error) {
        console.error('Error submitting survey:', error);
        throw error;
    }
};
