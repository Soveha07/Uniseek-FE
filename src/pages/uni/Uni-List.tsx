import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import UniversityListLayout from "../../layouts/uni/UniListLayout";
import Pagination from "../../components/common/Pagination";
import { getAllUniversities, formatPriceRange, University } from "../../api/uni/Uni-List-API";
import { useNavigate } from "react-router-dom";

const UniversityList: React.FC = () => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // Different items per page based on screen size
    const [itemsPerPage, setItemsPerPage] = useState(() => 
        window.innerWidth >= 768 ? 10 : 10
    );

    // Update items per page on window resize
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth >= 768 ? 10 : 10);
        }
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch universities from API
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                setLoading(true);
                const data = await getAllUniversities();
                console.log('Received data in component:', data);
                setUniversities(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch universities:", err);
                setError("Failed to load universities. Please try again later.");
                setUniversities([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    const transformedUniversities = (Array.isArray(universities) ? universities : []).map(uni => ({
        id: uni.id,
        name: uni.name,
        priceRange: formatPriceRange(uni.min_price || 0, uni.max_price || 0),
        type: uni.university_type || '',
        location: uni.location || '',
        imageUrl: uni.photo_url || "/assets/images/no-image.png"
    }));

    // Filter
    const filteredUniversities = selectedSchool 
        ? transformedUniversities.filter(uni => uni.type.toLowerCase().includes(selectedSchool.toLowerCase()))
        : transformedUniversities;

    // Slice university list for pagination
    const paginatedUniversities = filteredUniversities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="bg-mysecondary min-h-screen flex flex-col items-center p-2 sm:p-4 md:p-0">
            {/* Fixed header that doesn't scroll */}
            <div className="w-full max-w-lg md:w-full md:max-w-none">
                <div className="md:container md:mx-auto">
                    <Header />
                </div>
            </div>
            
            {/* Main content that scrolls as one unit */}
            <div className="w-full max-w-lg md:w-full md:max-w-none">
                {/* Full width container with no padding on desktop */}
                <div className="md:w-full">
                    <h2 className="text-b1 font-bold my-1 text-center md:text-2xl md:my-6">
                        List of Universities
                    </h2>
                    
                    <div className="flex flex-row items-center justify-between w-full px-6 gap-2 md:px-4 md:mb-6">
                        <div className="flex items-center gap-2">
                            <label className="text-b2 font-medium md:text-lg">School Type:</label>
                            <div className="flex gap-2">
                                {["Public", "Private"].map((type) => (
                                    <button
                                        key={type}
                                        className={`px-4 py-1 md:px-6 md:py-2 rounded-full text-white font-semibold shadow-md transition ${
                                            selectedSchool === type ? "bg-blue-600" : "bg-blue-500"
                                        }`}
                                        onClick={() => {
                                            setSelectedSchool(selectedSchool === type ? null : type);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-8">{error}</div>
                    ) : (
                        <>
                            {/* For mobile view */}
                            <div className="md:hidden overflow-y-auto max-h-[600px]">
                                <UniversityListLayout 
                                    universities={paginatedUniversities} 
                                    view="mobile" 
                                />
                            </div>
                            
                            {/* For desktop/tablet view */}
                            <div className="hidden md:block md:w-full md:px-0">
                                <UniversityListLayout 
                                    universities={paginatedUniversities} 
                                    view="desktop" 
                                />
                            </div>
                        </>
                    )}
                    
                    {/* Pagination */}
                    {!loading && !error && (
                        <div className="mt-4 mb-6 flex justify-center">
                            <Pagination
                                total={filteredUniversities.length}
                                perPage={itemsPerPage}
                                currentPage={currentPage}
                                onChange={setCurrentPage}
                            />
                        </div>
                    )}
                    
                    {/* Back Home button */}
                    <div className="flex justify-center mt-5 mb-10">
                        <button 
                            className="bg-blue-600 text-white text-sm font-semibold px-6 py-2 md:py-3 rounded-full shadow-md hover:bg-blue-700 transition"
                            onClick={handleBackHome}
                        >
                            Back Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityList;