import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordResetAPI from "../../services/student/ResetPassword";

const UserResetPw: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Password validation
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    const checkPasswordStrength = (password: string) => {
        setPasswordRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        });
    };
    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPass = e.target.value;
        setNewPassword(newPass);
        checkPasswordStrength(newPass);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!newPassword || !confirmPassword) {
            setError("New password and confirmation are required");
            return;
        }

        const allRequirementsMet = Object.values(passwordRequirements).every(req => req);
        if (!allRequirementsMet) {
            setError("New password doesn't meet all requirements");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords don't match");
            return;
        }

        try {
            setIsLoading(true);
            const uid = localStorage.getItem('userID') || localStorage.getItem('userId') || localStorage.getItem('uid');

            if (!uid) {
                setError("User not found. Please login again.");
                navigate('/login');
                return;
            }

            const response = await PasswordResetAPI.updatePassword(uid, newPassword);

            if (response.status >= 200 && response.status < 300) {
                setSuccess(true);
                setError(null);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    navigate(`/userprofile/${uid}`);
                }, 2000);
            } else {
                setError(response.message || "Failed to update password");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    );

    const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
    );

    return (
        <div className="flex w-full mt-10 items-center justify-center h-auto bg-mysecondary">
            <div className="bg-myskyblue rounded-2xl w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 shadow-lg">
                <h1 className="text-2xl bg-myskyblue font-bold mb-2 text-center">Reset Password</h1>
                <p className="text-gray-500 bg-myskyblue mb-6 text-center">Please set a new password</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md mb-4">
                        Password successfully updated! Redirecting back to your profile...
                    </div>
                )}

                <form onSubmit={handleResetPassword} className="flex flex-col gap-5 bg-myskyblue">
                    <div className="flex flex-col bg-myskyblue">
                        <label htmlFor="newpassword" className="font-medium mb-2 bg-myskyblue">
                            New Password:
                        </label>
                        <div className="relative bg-myskyblue">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newpassword"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                className="rounded-md border border-gray-300 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>

                        {/* Password requirements */}
                        <div className="mt-2 text-xs space-y-1">
                            <p className={passwordRequirements.length ? "text-green-600" : "text-gray-500"}>
                                ✓ At least 8 characters
                            </p>
                            <p className={passwordRequirements.uppercase ? "text-green-600" : "text-gray-500"}>
                                ✓ At least one uppercase letter
                            </p>
                            <p className={passwordRequirements.lowercase ? "text-green-600" : "text-gray-500"}>
                                ✓ At least one lowercase letter
                            </p>
                            <p className={passwordRequirements.number ? "text-green-600" : "text-gray-500"}>
                                ✓ At least one number
                            </p>
                            <p className={passwordRequirements.special ? "text-green-600" : "text-gray-500"}>
                                ✓ At least one special character
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col bg-myskyblue">
                        <label htmlFor="confirmpassword" className="font-medium mb-2 bg-myskyblue">
                            Confirm Password:
                        </label>
                        <div className="relative bg-myskyblue">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmpassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`rounded-md border ${confirmPassword && newPassword !== confirmPassword
                                        ? "border-red-300 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-blue-500"
                                    } p-2 pr-10 focus:outline-none focus:ring-2 w-full`}
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {confirmPassword && newPassword !== confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">Passwords don't match</p>
                        )}
                    </div>

                    <div className="flex justify-center bg-myskyblue mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? "bg-blue-400" : "bg-myprimary hover:bg-blue-600"
                                } text-white w-48 py-3 rounded-md transition flex items-center justify-center`}
                        >
                            {isLoading ? (
                                <>
                                    Processing...
                                </>
                            ) : "Save Changes"}
                        </button>
                    </div>

                    <div className="flex justify-baseline text-sm bg-myskyblue">
                        <button
                            type="button"
                            disabled={isLoading}
                            className="text-[#284BAD] ml-1 hover:underline bg-myskyblue"
                            onClick={() => {
                                const uid = localStorage.getItem('userID') || localStorage.getItem('userId') || localStorage.getItem('uid');
                                navigate(`/userprofile/${uid}`);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserResetPw;
