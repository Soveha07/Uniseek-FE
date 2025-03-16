import { useNavigate } from "react-router-dom";
import { CONFIG } from "../../config";
import { StatusCodes } from "../../enums/statusCodes";
import axios from "axios";

interface LoginResponse {
    status: number;
    data: {
        mentorId: string;
        accessToken: string;
    };
}

export const mentorSignInWithEmailPassword = async (
    email: string,
    password: string,
    setLoading: (loading: boolean) => void,
    setError: (error: any) => void,
    navigate: ReturnType<typeof useNavigate>
): Promise<void> => {
    const API_BASE_URL = CONFIG.API_URL;

    try {
        setLoading(true);

        const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/mentor/login`, {
            email,
            password,
        });

        // Ensure the response has the expected structure
        if (response.data?.status !== StatusCodes.Success || !response.data.data) {
            throw new Error("Unexpected response structure");
        }

        const { mentorId, accessToken } = response.data.data;

        // Store retrieved data in localStorage
        localStorage.setItem("mentorID", mentorId);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("isLoggedIn", "true");
        navigate('/mentor/home');

    } catch (error) {
        setError("Invalid email or password");
        console.error(error);
    } finally {
        setLoading(false);
    }
}
