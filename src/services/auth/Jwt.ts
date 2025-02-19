import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../../config';
import axios from "axios";
import { log } from 'console';

interface LoginResponse {
    status: string;
    data: {
        userId: string;
        accessToken: string;
        refreshToken: string;
    };
}
export const useJwtAuthActions = () => {
    const API_BASE_URL = CONFIG.API_URL;
    const navigate = useNavigate();

    const signInWithEmailPassword = async (email: string, password: string, setLoading: (loading: boolean) => void, setError: (error: any) => void): Promise<void> => {
        try {
            setLoading(true);
            // const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
            //     method: 'POST',
            //     headers: {
            //         "Content-type": "application/json"
            //     },
            //     body: JSON.stringify({ email, password }),
            // });

            // if (!response.ok) {
            //     throw new Error("Network response was not ok");
            // }

            // const result = await response.json();

            // // Ensure the response structure matches the expected format
            // if (result.status !== "success" || !result.data) {
            //     throw new Error("Invalid response structure");
            // }

            // const data: LoginResponse = await result.data;
            // localStorage.setItem("userID", data.userId);
            // localStorage.setItem("token", data.accessToken);
            // localStorage.setItem("refreshToken", data.refreshToken)
            // localStorage.setItem('isLoggedIn', 'true');

            const response = await axios.post<LoginResponse>(`${CONFIG.API_URL}/auth/login`, {
                email,
                password,
            });

            // Ensure the response has the expected structure
            if (response.data?.status !== "success" || !response.data.data) {
                throw new Error("Unexpected response structure");
            }

            const { userId, accessToken, refreshToken } = response.data.data;

            // Store retrieved data in localStorage
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("isLoggedIn", "true");
            navigate('/home');

        } catch (error) {
            setError("Invalid email or password");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const signInWithGooglePopup = async (
        setLoading: (loading: boolean) => void,
        setError: (error: any) => void
    ): Promise<void> => {
        try {

            const popup = window.open(
                `${CONFIG.API_URL}/auth/google`,
                'Google Sign-In',
                'width=500,height=600'
            );

            if (!popup) {
                setError('Failed to open popup');
                return;
            }

            // Listen for the message from the popup when it's done
            window.addEventListener('message', (event) => {
                if (event.origin === CONFIG.API_URL && event.data.type === 'GoogleAuthSuccess') {
                    localStorage.setItem('userID', event.data.userId);
                    localStorage.setItem('token', event.data.accessToken);
                    localStorage.setItem('refreshToken', event.data.refreshToken);
                    localStorage.setItem('isLoggedIn', 'true');

                    popup.close();
                    navigate('/home');
                }
            });
        }
        catch (error) {
            setError('Failed to sign in with Google');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const createUserWithEmailPassword = async (email: string, password: string, userName: string, phoneNumber: string, setLoading: (loading: boolean) => void, setError: (error: any) => void): Promise<void> => {
        try {
            setLoading(true);
            // Prepare the data to send to the backend
            const userData = {
                username: userName,
                phone_number: phoneNumber,
                email: email,
                password: password,
            };


            console.log(userData);
            const response = await axios.post<LoginResponse>(`${CONFIG.API_URL}/student/create`, userData);

            // Ensure the response has the expected structure
            if (response.data?.status !== "success" || !response.data.data) {
                throw new Error("Unexpected response structure");
            }

            const { userId, accessToken, refreshToken } = response.data.data;

            alert("You have successfully created the account!");
            // Store retrieved data in localStorage
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("isLoggedIn", "true");

            navigate('/home');

        } catch (error) {
            setError("An error occured while creating the account");
            console.error('Error creating user:', error);
        } finally {
            setLoading(false);
        }

    };

    const logout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem("userID");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    };

    return {
        signInWithGooglePopup,
        signInWithEmailPassword,
        createUserWithEmailPassword,
        logout,
    };
};
