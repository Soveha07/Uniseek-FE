import { ReactNode } from 'react';

interface ErrorModalProps {
    title?: string;
    message: string;
    onClose: () => void;
}

const ErrorModal = ({ title = 'Error', message, onClose }: ErrorModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-red-600">{title}</h2>
                <p className="text-gray-700">{message}</p>
                <div className="mt-4 flex justify-end">
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
