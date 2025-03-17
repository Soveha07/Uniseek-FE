import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProfileAPI from "../../services/student/UserProfileFetch";
import Loading from "../../components/common/Loading";

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const { uid: paramUid } = useParams<{ uid: string }>();
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState("Unknown");
    const [phoneNum, setPhoneNum] = useState("099 999 9999");
    const [email, setEmail] = useState("unknown@gmail.com");
    const [photoURL, setPhotoURL] = useState("/onboarding/google.png");
    const [rawResponse, setRawResponse] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showDebug, setShowDebug] = useState(false);
    const [apiBaseUrl, setApiBaseUrl] = useState<string>("");

    console.log("UserProfile rendered with param uid:", paramUid);

    useEffect(() => {
        const baseUrl = UserProfileAPI.getBaseUrl();
        setApiBaseUrl(baseUrl);
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userUid = paramUid || localStorage.getItem('userID');

                console.log("UserProfile component - Fetching for UID:", userUid);

                if (!userUid) {
                    console.log("No uid found, redirecting to login");
                    setLoading(false);
                    setErrorMessage("User not authenticated");
                    navigate('/login');
                    return;
                }

                // Use the API service instead of direct axios calls for consistency
                const profileResponse = await UserProfileAPI.getUserProfile(userUid);
                console.log("Profile response:", profileResponse);
                setRawResponse(profileResponse);

                if (profileResponse && profileResponse.data) {
                    const userData = profileResponse.data;
                    setName(userData.displayName || "Unknown");
                    setEmail(userData.email || "unknown@gmail.com");
                    setPhoneNum(userData.phoneNumber || "099 999 9999");
                    setPhotoURL(userData.photoURL || "/onboarding/google.png");
                    setErrorMessage(null);
                } else {
                    setErrorMessage("Failed to load profile data");
                }
            } catch (error: any) {
                console.error("Profile fetch error:", error);

                if (error.response) {
                    setErrorMessage(`Server error: ${error.response.status} - ${error.response.statusText}`);
                } else if (error.request) {
                    setErrorMessage("No response received from server.");
                } else {
                    setErrorMessage(`Request error: ${error.message || 'Unknown error'}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [paramUid, navigate]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            try {
                setIsUpdating(true);
                setErrorMessage("Updating profile...");

                const userUid = paramUid ||
                    localStorage.getItem('userID');

                if (!userUid) {
                    navigate('/login');
                    return;
                }

                await UserProfileAPI.updateUserProfile(userUid, name, phoneNum);

                const updatedProfile = await UserProfileAPI.getUserProfile(userUid);
                setRawResponse(updatedProfile);
                setErrorMessage(null);
            } catch (error: any) {
                console.error("Error updating profile:", error);
                setErrorMessage(`Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
                setIsUpdating(false);
            }
        }

        setIsEdit(!isEdit);
    };

    const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                setIsUploading(true);

                const userUid = paramUid ||
                    localStorage.getItem('userID');

                if (!userUid) {
                    navigate('/login');
                    return;
                }

                const file = e.target.files[0];

                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setPhotoURL(event.target.result as string);
                    }
                };
                reader.readAsDataURL(file);

                let imageUrl;

                if (photoURL && !photoURL.includes("/onboarding/google.png")) {
                    imageUrl = await UserProfileAPI.updateProfileImage(userUid, file, photoURL);
                } else {
                    imageUrl = await UserProfileAPI.uploadProfileImage(userUid, file);
                }

                setPhotoURL(imageUrl);

                const updatedProfile = await UserProfileAPI.getUserProfile(userUid);
                setRawResponse(updatedProfile);

            } catch (error) {
                console.error("Failed to upload profile image:", error);
                alert("Failed to upload profile image. Please try again.");

                const userUid = paramUid ||
                    localStorage.getItem('userID');

                if (userUid) {
                    const profile = await UserProfileAPI.getUserProfile(userUid);
                    if (profile.data && profile.data.photoURL) {
                        setPhotoURL(profile.data.photoURL);
                    }
                }
            } finally {
                setIsUploading(false);
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
            {/* Debug Panel */}
            {showDebug && (
                <div className="mb-4 bg-gray-800 text-white p-4 rounded-lg text-xs">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base font-bold">Debug Panel</h3>
                        <button
                            onClick={() => setShowDebug(false)}
                            className="text-white hover:text-gray-300"
                        >
                            Close
                        </button>
                    </div>

                    <div className="mb-2">
                        <div className="font-bold mb-1">API Configuration:</div>
                        <div>Base URL: {apiBaseUrl || "Loading..."}</div>
                        <div>Endpoint: /student/{paramUid}</div>
                    </div>

                    {errorMessage && (
                        <div className="mb-2 p-2 bg-red-800 rounded">
                            <div className="font-bold">Error:</div>
                            <div>{errorMessage}</div>
                        </div>
                    )}

                    <div>
                        <strong>Raw Response:</strong>
                        <pre className="mt-1 bg-gray-700 p-2 rounded overflow-auto max-h-40">
                            {JSON.stringify(rawResponse, null, 2) || "No data"}
                        </pre>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-36 sm:h-48 rounded-t-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-center"></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-b-xl shadow-lg">
                    {/* Profile Section */}
                    <div className="relative px-4 sm:px-8 pb-6 sm:pb-8">
                        {/* Profile Picture */}
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 sm:left-8 sm:transform-none">
                            <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden relative">
                                {isUploading ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 bg-opacity-75">
                                        <Loading />
                                    </div>
                                ) : null}
                                <img
                                    src={photoURL}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                    onError={() => setPhotoURL("/onboarding/google.png")}
                                />
                            </div>
                        </div>

                        {/* Name and Title */}
                        <div className="pt-16 pb-2 sm:pt-20 sm:pb-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center">
                            <div className="text-center sm:text-left mb-4 sm:mb-0">
                                {isEdit ? (
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-2xl sm:text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none text-center sm:text-left"
                                    />
                                ) : (
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{name}</h1>
                                )}
                                <p className="text-gray-600 mt-1">Student</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                                {isEdit ? (
                                    <>
                                        <label
                                            htmlFor="profile-image-upload"
                                            className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transform transition hover:scale-105 
                                                ${isUploading
                                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                    : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"}`}
                                        >
                                            {isUploading ? "Uploading..." : "Upload Photo"}
                                            <input
                                                type="file"
                                                id="profile-image-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleProfileImageChange}
                                                disabled={isUploading}
                                            />
                                        </label>
                                        <button
                                            type="submit"
                                            className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transform transition hover:scale-105 
                                                ${isUpdating || isUploading
                                                    ? "bg-blue-400 cursor-not-allowed"
                                                    : "bg-blue-600 hover:bg-blue-700"} text-white`}
                                            disabled={isUploading || isUpdating}
                                        >
                                            {isUpdating ? "Updating..." : "Save Profile"}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-md text-sm font-medium shadow-sm transform transition hover:scale-105 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
                                        >
                                            Edit Profile
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/userresetpw")}
                                            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 shadow-sm transform transition hover:scale-105"
                                        >
                                            Reset Password
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="border-t border-gray-200 relative">
                        {isUpdating && (
                            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                                <Loading />
                            </div>
                        )}

                        <div className="px-4 py-4 sm:px-8 sm:py-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Personal Information</h2>

                            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    {isEdit ? (
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                                            {name}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    {isEdit ? (
                                        <input
                                            value={phoneNum}
                                            onChange={(e) => setPhoneNum(e.target.value)}
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        />
                                    ) : (
                                        <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                                            {phoneNum || "Not set"}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                                        {email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
