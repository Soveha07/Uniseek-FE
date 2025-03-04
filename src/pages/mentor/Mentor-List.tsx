import React, { useState } from "react";
import Header from "../../components/common/Header";
import MentorListLayout from "../../layouts/mentor/MentorListLayout";
import Pagination from "../../components/common/Pagination";

const mentorsData = [
    { name: "John Doe", university: "Harvard University", quote: "Believe in yourself.", imageUrl: "/Assets/mentors/john.png" },
    { name: "Jane Smith", university: "MIT", quote: "Never stop learning.", imageUrl: "/Assets/mentors/jane.png" },
    { name: "Alice Johnson", university: "Stanford University", quote: "Dream big.", imageUrl: "/Assets/mentors/alice.png" },
    { name: "Bob Williams", university: "Oxford University", quote: "Stay curious.", imageUrl: "/Assets/mentors/bob.png" },
    { name: "Alice Johnson", university: "Stanford University", quote: "Dream big.", imageUrl: "/Assets/mentors/alice.png" },
    { name: "Bob Williams", university: "Oxford University", quote: "Stay curious.", imageUrl: "/Assets/mentors/bob.png" },
    { name: "Alice Johnson", university: "Stanford University", quote: "Dream big.", imageUrl: "/Assets/mentors/alice.png" },
    { name: "Bob Williams", university: "Oxford University", quote: "Stay curious.", imageUrl: "/Assets/mentors/bob.png" },
    { name: "Alice Johnson", university: "Stanford University", quote: "Dream big.", imageUrl: "/Assets/mentors/alice.png" },
    { name: "Bob Williams", university: "Oxford University", quote: "Stay curious.", imageUrl: "/Assets/mentors/bob.png" },
];

const MentorList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const mentorsPerPage = 4; 
    const totalMentors = mentorsData.length;

    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
    const currentMentors = mentorsData.slice(indexOfFirstMentor, indexOfLastMentor);

    return (
        <div className="bg-mysecondary min-h-screen flex flex-col items-center p-2 sm:p-4 md:p-6">
            <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl">
                <Header />
                <h2 className="text-b1 font-bold my-2 text-center md:text-2xl md:my-3">
                    Find a Mentor to Guide You!
                </h2>
            </div>

            <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl overflow-y-auto max-h-[600px] px-4">
                {/* For mobile view */}
                <div className="md:hidden">
                    <MentorListLayout mentors={currentMentors} />
                </div>
                
                {/* For desktop/tablet view */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentMentors.map((mentor, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition">
                            <div className="flex flex-col items-center">
                                <img 
                                    src={mentor.imageUrl} 
                                    alt={mentor.name} 
                                    className="w-24 h-24 object-cover rounded-full mb-3"
                                />
                                <h3 className="font-semibold text-lg">{mentor.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{mentor.university}</p>
                                <p className="italic text-gray-600 text-center mb-4">"{mentor.quote}"</p>
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl flex justify-center mt-2 md:mt-4">
                <Pagination 
                    total={totalMentors} 
                    perPage={mentorsPerPage} 
                    currentPage={currentPage} 
                    onChange={setCurrentPage} 
                />
            </div>

            <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl flex justify-center mt-6 md:mt-6">
                <button className="bg-blue-600 text-white text-sm font-semibold px-6 py-3 md:py-3 rounded-full shadow-md hover:bg-blue-700 transition">
                    Back Home
                </button>
            </div>
        </div>
    );
};

export default MentorList;
