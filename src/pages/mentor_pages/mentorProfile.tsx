import { useNavigate } from "react-router-dom";

const MentorProfile: React.FC = () => {
    const navigate = useNavigate();
    const mentorLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem("mentorID");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={mentorLogout}>
                Logout
            </button>
        </div>
    )
}

export default MentorProfile;