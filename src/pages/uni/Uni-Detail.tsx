import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import BackButton from "./components/BackButton";
import UniversityBanner from "./components/UniversityBanner";
import UniversityHeader from "./components/UniversityHeader";
import UniversityAbout from "./components/UniversityAbout";
import UniversityQuickInfo from "./components/UniversityQuickInfo";
import UniversityAdditionalInfo from "./components/UniversityAdditionalInfo";
import { getUniversityById, University } from "../../api/uni/GetUniById";

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
      <div className="bg-gradient-to-b from-sky-50 to-blue-100 min-h-screen">
        <div className="container mx-auto py-6">
          <Header />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="bg-gradient-to-b from-sky-50 to-blue-100 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <Header />
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
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
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-blue-100 min-h-screen">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:max-w-none lg:px-8">
        <Header />

        <UniversityBanner 
          photoUrl={university.photo_url}
          name={university.name}
        />
        
        <UniversityHeader 
          name={university.name}
          universityType={university.university_type}
          location={university.location}
          minPrice={university.min_price}
          maxPrice={university.max_price}
          totalEnrollment={university.total_enrollment}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <UniversityAbout 
            name={university.name}
            description={university.description}
            totalEnrollment={university.total_enrollment}
            classSize={university.class_size}
            minPrice={university.min_price}
            maxPrice={university.max_price}
            shift={university.shift}
            facility={university.facility}
          />
          
          <UniversityQuickInfo 
            location={university.location}
            minPrice={university.min_price}
            maxPrice={university.max_price}
            totalEnrollment={university.total_enrollment}
            universityType={university.university_type}
            scholarship={university.scholarship}
            exchange={university.exchange}
          />

          <UniversityAdditionalInfo 
            facility={university.facility}
            universityMajors={university.universityMajors || []}
            universityId={university.id}
          />
        </div>
        
        <BackButton 
          label="Back to Universities"
          onClick={handleBackToList}
        />
      </div>
    </div>
  );
};

export default UniversityDetail;


