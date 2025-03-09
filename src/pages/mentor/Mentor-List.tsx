import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import MentorListLayout from "../../layouts/mentor/MentorListLayout";
import Pagination from "../../components/common/Pagination";
import { useNavigate } from "react-router-dom";
import { getMentors, Mentor } from "../../api/mentor/GetMentors";

// Fallback data in case API fails
const fallbackMentors = [
    { id: 1, name: "John Doe", university: "Harvard University", major: "Computer Science", imageUrl: "/Assets/mentors/john.png" },
    { id: 2, name: "Jane Smith", university: "MIT", major: "Electrical Engineering", imageUrl: "/Assets/mentors/jane.png" },
    // Add more as needed...
];

const MentorList: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [mentorsPerPage, setMentorsPerPage] = useState(() => 
        window.innerWidth >= 768 ? 8 : 4
    );
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [totalMentors, setTotalMentors] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Update mentors per page on window resize
    useEffect(() => {
        const handleResize = () => {
            setMentorsPerPage(window.innerWidth >= 768 ? 8 : 4);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch mentors when page or mentorsPerPage changes
    useEffect(() => {
        const fetchMentors = async () => {
            setLoading(true);
            try {
                const result = await getMentors(currentPage, mentorsPerPage);
                if (result.mentors.length > 0) {
                    setMentors(result.mentors);
                    setTotalMentors(result.total);
                    setError(null);
                } else {
                    // If no mentors returned, use fallback data
                    console.log('No mentors returned from API, using fallback data');
                    setMentors(fallbackMentors);
                    setTotalMentors(fallbackMentors.length);
                }
            } catch (err) {
                console.error('Error fetching mentors:', err);
                setError('Failed to load mentors. Please try again later.');
                // Use fallback data on error
                setMentors(fallbackMentors);
                setTotalMentors(fallbackMentors.length);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, [currentPage, mentorsPerPage]);

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="bg-mysecondary min-h-screen flex flex-col items-center p-2 sm:p-4 md:p-0">
            <div className="w-full max-w-lg md:w-full md:max-w-none">
                <div className="md:container md:mx-auto">
                    <Header />
                </div>
            </div>
            
            <div className="w-full max-w-lg md:w-full md:max-w-none">
                <div className="md:w-full">
                    <h2 className="text-b1 font-bold my-2 text-center md:text-2xl md:my-6">
                        Find a Mentor to Guide You!
                    </h2>
                    
                    {loading ? (
                        <div className="w-full flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="w-full bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    ) : (
                        <>
                            {/* For mobile view */}
                            <div className="md:hidden">
                                <MentorListLayout 
                                    mentors={mentors} 
                                    view="mobile" 
                                />
                            </div>
                            
                            {/* For desktop/tablet view */}
                            <div className="hidden md:block">
                                <MentorListLayout 
                                    mentors={mentors} 
                                    view="desktop" 
                                />
                            </div>
                        </>
                    )}
                    
                    {/* Pagination */}
                    {!loading && !error && (
                        <div className="w-full flex justify-center mt-6">
                            <Pagination 
                                total={totalMentors} 
                                perPage={mentorsPerPage} 
                                currentPage={currentPage} 
                                onChange={setCurrentPage} 
                            />
                        </div>
                    )}
                    
                    <div className="w-full flex justify-center mt-6 mb-10">
                        <button 
                            onClick={handleBackHome}
                            className="bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
                        >
                            Back Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorList;
