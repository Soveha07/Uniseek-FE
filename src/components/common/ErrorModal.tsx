import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorModalProps {
    title?: string;
    message: string;
    onClose: () => void;
}

const ErrorModal = ({ title = 'Error', message, onClose }: ErrorModalProps) => {
    const userId = localStorage.getItem("userID")
    const navigate = useNavigate()
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-red-600">{title}</h2>
                <p className="text-gray-700">{message}</p>
                <div className="mt-4 flex justify-end">
                    {message === "Phone number is required. Please provide it to continue." ? (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                            onClick={() => navigate(`/userProfile/${userId}`)}
                        >
                            Add Phone Number
                        </button>
                    ) : null}

                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
