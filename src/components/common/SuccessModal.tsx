// components/common/SuccessModal.tsx
import React from 'react';

interface SuccessModalProps {
    message: string;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <div className="flex justify-center mb-4">
                    <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 110 12 6 6 0 010-12zm2.3 4.7a1 1 0 10-1.4-1.4L10 9.586 8.7 8.3a1 1 0 10-1.4 1.4L10 12l3.6-3.6z" />
                    </svg>
                </div>
                <h3 className="text-center text-lg font-semibold text-green-600">{message}</h3>
                <div className="mt-4 text-center">
                    <button
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
