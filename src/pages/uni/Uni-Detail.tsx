import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { getUniversityById, formatPriceRange, University } from "../../api/uni/GetUniById";

const UniversityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error("University ID not found");
        }
        const data = await getUniversityById(parseInt(id));
        if (!data) {
          throw new Error("University not found");
        }
        setUniversity(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch university details:", err);
        setError("Failed to load university details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityDetails();
  }, [id]);

  const handleBackToList = () => {
    navigate("/universities");
  };

  if (loading) {
    return (
      <div className="bg-mysecondary min-h-screen flex flex-col items-center p-2 sm:p-4 md:p-6">
        <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl">
          <Header />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="bg-mysecondary min-h-screen flex flex-col items-center p-2 sm:p-4 md:p-6">
        <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl">
          <Header />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mt-4 w-full max-w-lg md:max-w-3xl lg:max-w-5xl">
          <h2 className="text-red-500 text-xl font-bold mb-4">Error</h2>
          <p className="text-gray-700">{error || "University not found"}</p>
          <button 
            onClick={handleBackToList}
            className="mt-6 bg-blue-600 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Back to Universities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-mysecondary min-h-screen flex flex-col items-center p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl">
        <Header />
      </div>

      {/* University Header Section */}
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl mt-4">
        <div className="relative rounded-lg overflow-hidden shadow-lg h-48 md:h-64 lg:h-80">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${university.photo_url || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          
          {/* University Name */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <h1 className="text-xl md:text-3xl font-bold">{university.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="bg-blue-600 text-white text-xs md:text-sm py-1 px-2 rounded-full">
                {university.university_type}
              </span>
              <span className="text-sm md:text-base font-medium">
                {university.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* University Details Section */}
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">About {university.name}</h2>
            <p className="text-gray-600 mb-6">{university.description}</p>
            
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">University Features</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="font-medium text-gray-700">Enrollment</div>
                <div className="text-gray-500">{university.total_enrollment ? university.total_enrollment.toLocaleString() : 'N/A'} students</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Class Size</div>
                <div className="text-gray-500">{university.class_size || 'N/A'}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Tuition Range</div>
                <div className="text-gray-500">{formatPriceRange(university.min_price, university.max_price)}</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Shift Options</div>
                <div className="text-gray-500">{university.shift || 'Full-time'}</div>
              </div>
            </div>
            
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">Facilities</h3>
            <p className="text-gray-600 mb-6">{university.facility || 'Information not available.'}</p>
          </div>
        </div>
        
        {/* Right Column - Quick Info */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Location</div>
                  <div className="font-medium">{university.location}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Tuition Range</div>
                  <div className="font-medium">{formatPriceRange(university.min_price, university.max_price)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Total Students</div>
                  <div className="font-medium">{university.total_enrollment ? university.total_enrollment.toLocaleString() : 'N/A'}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Type</div>
                  <div className="font-medium">{university.university_type}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Programs Offered</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Scholarship Available: {university.scholarship ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Exchange Programs: {university.exchange ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back Button */}
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl flex justify-center mt-8 mb-6">
        <button 
          className="bg-blue-600 text-white text-sm font-semibold px-6 py-2 md:py-3 rounded-full shadow-md hover:bg-blue-700 transition"
          onClick={handleBackToList}
        >
          Back to Universities
        </button>
      </div>
    </div>
  );
};

export default UniversityDetail;


