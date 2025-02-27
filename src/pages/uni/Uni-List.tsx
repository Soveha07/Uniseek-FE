import React, { useState } from "react";
import Header from "../../components/common/Header";
import UniversityListLayout from "../../layouts/uni/UniListLayout";
import Pagination from "../../components/common/Pagination";

const universities = [
    { name: "Royal University of Phnom Penh", priceRange: "$350-$1,200", type: "Public School", location: "Urban", imageUrl: "/assets/images/rupp.png" },
    { name: "Institute of Technology of Cambodia", priceRange: "$450-$850", type: "Public School", location: "Urban", imageUrl: "/assets/images/itc.png" },
    { name: "National University of Management", priceRange: "$500-$900", type: "Private School", location: "Urban", imageUrl: "/assets/images/num.png" },
    { name: "Western University", priceRange: "$400-$800", type: "Private School", location: "Urban", imageUrl: "/assets/images/western.png" },
    { name: "American University of Phnom Penh", priceRange: "$600-$1,500", type: "Private School", location: "Urban", imageUrl: "/assets/images/aupp.png" },
];

const UniversityList: React.FC = () => {
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Slice university list
    const paginatedUniversities = universities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-mysecondary min-h-screen flex flex-col items-center p-2">
            <div className="w-full max-w-lg">
                <Header />
                <h2 className="text-b1 font-bold my-2 text-center">
                    List of Universities you may need to explore more ...
                </h2>
                <div className="flex flex-col items-start w-full max-w-lg mb-2">
                    <label className="ml-6 text-b2 font-medium mb-2">School Type :</label>
                    <div className="flex gap-2">
                        {["Public", "Private"].map((type) => (
                            <button
                                key={type}
                                className={`px-4 py-1 rounded-full text-white font-semibold shadow-md transition ${
                                    selectedSchool === type ? "bg-blue-600" : "bg-blue-500"
                                }`}
                                onClick={() => setSelectedSchool(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full max-w-lg overflow-y-auto h-[60vh] px-4">
                <UniversityListLayout universities={paginatedUniversities} />
            </div>
            <div className="w-full max-w-lg flex justify-center mt-1">
                <Pagination
                    total={universities.length}
                    perPage={itemsPerPage}
                    currentPage={currentPage}
                    onChange={setCurrentPage}
                />
            </div>
            <div className="w-full max-w-lg flex justify-center mt-4">
                <button className="bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md">
                    Back Home
                </button>
            </div>
        </div>
    );
};

export default UniversityList;
