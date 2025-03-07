import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import MentorListLayout from "../../layouts/mentor/MentorListLayout";
import Pagination from "../../components/common/Pagination";
import { useNavigate } from "react-router-dom";

const mentorsData = [
    { name: "John Doe", university: "Harvard University", major: "Computer Science", imageUrl: "/Assets/mentors/john.png" },
    { name: "Jane Smith", university: "MIT", major: "Electrical Engineering", imageUrl: "/Assets/mentors/jane.png" },
    { name: "Alice Johnson", university: "Stanford University", major: "Business Administration", imageUrl: "/Assets/mentors/alice.png" },
    { name: "Bob Williams", university: "Oxford University", major: "Psychology", imageUrl: "/Assets/mentors/bob.png" },
    { name: "Ella Garcia", university: "Stanford University", major: "Medicine", imageUrl: "/Assets/mentors/alice.png" },
    { name: "Michael Chen", university: "Oxford University", major: "Physics", imageUrl: "/Assets/mentors/bob.png" },
    { name: "Sarah Lee", university: "Harvard University", major: "Biology", imageUrl: "/Assets/mentors/john.png" },
    { name: "David Kim", university: "MIT", major: "Mathematics", imageUrl: "/Assets/mentors/jane.png" },
    // Add more mentors as needed
];

const MentorList: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [mentorsPerPage, setMentorsPerPage] = useState(() => 
        window.innerWidth >= 768 ? 8 : 4
    );
    const totalMentors = mentorsData.length;

    // Update mentors per page on window resize
    useEffect(() => {
        const handleResize = () => {
            setMentorsPerPage(window.innerWidth >= 768 ? 8 : 4);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
    const currentMentors = mentorsData.slice(indexOfFirstMentor, indexOfLastMentor);

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
                    
                    {/* For mobile view */}
                    <div className="md:hidden">
                        <MentorListLayout 
                            mentors={currentMentors} 
                            view="mobile" 
                        />
                    </div>
                    
                    {/* For desktop/tablet view */}
                    <div className="hidden md:block">
                        <MentorListLayout 
                            mentors={currentMentors} 
                            view="desktop" 
                        />
                    </div>
                    
                    {/* Pagination */}
                    <div className="w-full flex justify-center mt-6">
                        <Pagination 
                            total={totalMentors} 
                            perPage={mentorsPerPage} 
                            currentPage={currentPage} 
                            onChange={setCurrentPage} 
                        />
                    </div>
                    
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
