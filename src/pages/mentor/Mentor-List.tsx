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
    const mentorsPerPage = 6;
    const totalMentors = mentorsData.length;

    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
    const currentMentors = mentorsData.slice(indexOfFirstMentor, indexOfLastMentor);

    return (
        <div className="bg-mysecondary min-h-screen flex flex-col items-center p-4">
            <Header />
            <h2 className="text-b1 font-bold my-4 text-center">
                Find a Mentor to Guide You!
            </h2>

            <MentorListLayout mentors={currentMentors} />

            <Pagination total={totalMentors} perPage={mentorsPerPage} currentPage={currentPage} onChange={setCurrentPage} />

            <div className="w-full max-w-lg flex justify-center mt-4">
                <button className="bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md">
                    Back Home
                </button>
            </div>
        </div>
    );
};

export default MentorList;
