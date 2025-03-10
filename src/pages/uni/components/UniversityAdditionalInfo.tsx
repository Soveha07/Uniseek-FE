import React from 'react';
import { Link } from 'react-router-dom';
import { UniversityMajor } from '../../../api/uni/GetUniById';

interface UniversityAdditionalInfoProps {
  facility?: string;
  universityMajors?: UniversityMajor[];
  universityId?: number;
}

const UniversityAdditionalInfo: React.FC<UniversityAdditionalInfoProps> = ({ 
  facility, 
  universityMajors = [],
  universityId
}) => {
  // Ensure universityMajors is an array
  const majors = Array.isArray(universityMajors) ? universityMajors : [];
  
  return (
    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </span>
        Additional Information
      </h3>

      {/* Improved Majors Section */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <span className="bg-blue-50 p-1.5 rounded-lg mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
          Available Majors 
          {majors.length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {majors.length}
            </span>
          )}
        </h4>

        {/* Major Cards Container */}
        {majors.length > 0 ? (
          <div className="relative mt-3">
            
            {/* Scrollable container */}
            <div className="flex gap-4 overflow-x-auto pb-4 px-1 -mx-1 snap-x scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 scroll-smooth">
              {majors.map((uniMajor, index) => (
                <div 
                  key={uniMajor.id || index}
                  className="flex-shrink-0 w-72 snap-start p-4 bg-gradient-to-br from-blue-50 to-blue-100/70 rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <div className="flex items-center mb-3">
                    <h5 className="font-semibold text-gray-800 text-lg text-center">
                      {uniMajor.major?.name || 'Unknown Major'}
                    </h5>
                  </div>
                  
                  {uniMajor.description && (
                    <div className="bg-white/90 rounded-lg p-3 text-gray-600 text-sm shadow-inner border border-blue-50 mb-4">
                      <p className="line-clamp-3">{uniMajor.description}</p>
                    </div>
                  )}

                  {/* Add See Mentors button */}
                  {universityId && uniMajor.major?.id && (
                    <div className="mt-3 flex justify-center">
                      <Link 
                        to={`/universities/${universityId}/majors/${uniMajor.major.id}/mentors`}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all shadow-sm hover:shadow"
                      >
                        See Mentors
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-100 rounded-lg p-6 text-center text-gray-500 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-blue-400 mb-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No majors information available for this university.</p>
          </div>
        )}
      </div>

      {/* Rest of component remains the same */}
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-50 p-1.5 rounded-lg mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Admission Requirements
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-gray-600 ml-2">
            <li>Completed application form</li>
            <li>High school transcripts</li>
            <li>Standardized test scores (if applicable)</li>
            <li>Letters of recommendation</li>
            <li>Personal statement or essay</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-50 p-1.5 rounded-lg mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            Campus Facilities
          </h4>
          <p className="text-gray-600">
            {facility || 
              'Our campus features state-of-the-art computer labs, a well-stocked library, student lounges, cafeteria, sports facilities, and modern classrooms equipped with the latest educational technology.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniversityAdditionalInfo;