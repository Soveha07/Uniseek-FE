import React from 'react';

interface Major {
  id: number;
  name: string;
  icon?: string;
}

interface UniversityAdditionalInfoProps {
  facility?: string;
  majors?: Major[];
}

const UniversityAdditionalInfo: React.FC<UniversityAdditionalInfoProps> = ({ facility, majors = [] }) => {
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

      {/* Majors Section with Horizontal Scrolling */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Available Majors</h4>
        <div className="relative">
          {/* Gradient fade effect on edges for better scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Scrollable container */}
          <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent scroll-smooth -mx-1 px-2">
            {majors.length > 0 ? (
              majors.map((major) => (
                <div 
                  key={major.id}
                  className="flex-shrink-0 w-48 p-3 mx-2 bg-blue-50 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    {major.icon ? (
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <img src={major.icon} alt={major.name} className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                    <span className="font-medium text-gray-800">{major.name}</span>
                  </div>
                </div>
              ))
            ) : (
              // Placeholder cards when no majors are available
              Array.from({ length: 5 }).map((_, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-48 p-3 mx-2 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">
                      {["Computer Science", "Business", "Engineering", "Medicine", "Arts"][index]}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Grid with other information */}
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Admission Requirements</h4>
          <ul className="list-disc list-inside space-y-1.5 text-gray-600">
            <li>Completed application form</li>
            <li>High school transcripts</li>
            <li>Standardized test scores (if applicable)</li>
            <li>Letters of recommendation</li>
            <li>Personal statement or essay</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Campus Facilities</h4>
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