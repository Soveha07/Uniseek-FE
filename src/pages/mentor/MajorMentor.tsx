import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFilteredMentors, Mentor } from '../../api/mentor/GetFilteredMentors';


interface MentorCardProps {
    id?: number;
  }
const MajorMentors: React.FC<MentorCardProps> =  ({ id })  => {
  const { universityId, majorId } = useParams<{ universityId: string, majorId: string }>();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleDetailClick = () => {
    if (id) {
      navigate(`/mentors/detail/${id}`);
    } else {
      navigate(`/mentors/detail`);
    }
  };

  useEffect(() => {
    const fetchMentors = async () => {
      if (!universityId || !majorId) {
        setError('Missing universityId or majorId parameters');
        setLoading(false);
        return;
      }

      try {
        const response = await getFilteredMentors(Number(majorId), Number(universityId));
        setMentors(response);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [universityId, majorId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md max-w-md w-full">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Mentors</h1>
      
      {mentors.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100 text-center">
          <p className="text-blue-700">No mentors found for this major and university.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden mr-4">
                    {mentor.profileUrl ? (
                      <img 
                        src={mentor.profileUrl} 
                        alt={mentor.fullName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-200 text-blue-700 font-bold text-lg">
                        {mentor.fullName?.charAt(0) || "M"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{mentor.fullName}</h2>
                    <p className="text-sm text-gray-600">{mentor.major?.name || "No major info"}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{mentor.description || "No description available"}</p>
                
                <div className="flex justify-end mt-4">
                  <a 
                    href={`/mentors/detail/${mentor.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MajorMentors;