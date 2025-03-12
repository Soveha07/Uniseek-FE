import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import MentorListLayout from "../../layouts/mentor/MentorListLayout";
import Pagination from "../../components/common/Pagination";
import { useNavigate } from "react-router-dom";
import { getMentors, Mentor as ApiMentor } from "../../api/mentor/GetMentors";

// Fallback data 
const fallbackMentors: ApiMentor[] = [
    { 
      id: 1, 
      fullName: "John Doe", 
      name: "John Doe",
      universityName: "Harvard University", 
      university: "Harvard University",
      majorName: "Computer Science", 
      major: "Computer Science",
      profileUrl: "/Assets/mentors/john.png",
      imageUrl: "/Assets/mentors/john.png" 
    },
    { 
      id: 2, 
      fullName: "Jane Smith", 
      name: "Jane Smith",
      universityName: "MIT", 
      university: "MIT",
      majorName: "Electrical Engineering", 
      major: "Electrical Engineering",
      profileUrl: "/Assets/mentors/jane.png",
      imageUrl: "/Assets/mentors/jane.png" 
    },
];

const MentorList: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    
    const [mentorsPerPage, setMentorsPerPage] = useState<number>(() => {
        return window.innerWidth >= 768 ? 10 : 10; 
    });

    const [fetchLimit, setFetchLimit] = useState<number>(() => {
        return window.innerWidth >= 768 ? 10 : 10;
    });
    
    const [mentors, setMentors] = useState<ApiMentor[]>([]);
    const [totalMentors, setTotalMentors] = useState(1); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newValue = width >= 768 ? 10 : 10;
            
            if (mentorsPerPage !== newValue) {
                console.log(`Resize: changing mentorsPerPage from ${mentorsPerPage} to ${newValue}`);
                setMentorsPerPage(newValue);
                setFetchLimit(newValue);
                setCurrentPage(1);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mentorsPerPage]);
    
    // Fetch mentors data
    useEffect(() => {
        const fetchMentors = async () => {
            setLoading(true);
            try {
                // Use fetchLimit for API call
                const result = await getMentors(currentPage, fetchLimit);
                console.log('API result:', result);
                
                if (result.mentors && result.mentors.length > 0) {
                    setMentors(result.mentors);
                    
                    const calculatedTotal = Math.max(9, result.total);
                    console.log(`Setting totalMentors to ${calculatedTotal}`);
                    setTotalMentors(calculatedTotal);
                    
                    setError(null);
                } else {
                    console.log('No mentors found, using fallback');
                    setMentors(fallbackMentors);
                    setTotalMentors(9); 
                }
            } catch (err) {
                console.error('Error fetching mentors:', err);
                setError('Failed to load mentors. Please try again later.');
                setMentors(fallbackMentors);
                setTotalMentors(9); 
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, [currentPage, fetchLimit]);
    
    const totalPages = Math.ceil(totalMentors / mentorsPerPage);
    
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
                    ) : mentors.length === 0 ? (
                        <div className="text-center p-8 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Mentors Found</h3>
                            <p className="text-gray-600">There are no mentors available at this time.</p>
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
                    {!loading && !error && mentors.length > 0 && (
                        <div className="w-full flex flex-col items-center mt-6">
                            <Pagination 
                                total={totalMentors} 
                                perPage={mentorsPerPage} 
                                currentPage={currentPage} 
                                onChange={(page) => {
                                    console.log(`Page changing from ${currentPage} to ${page}`);
                                    setCurrentPage(page);
                                }} 
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
