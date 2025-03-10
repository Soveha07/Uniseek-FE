import React from 'react';
import { formatPriceRange } from '../../../api/uni/GetUniById';

interface UniversityAboutProps {
  name: string;
  description: string;
  totalEnrollment?: number;
  classSize?: string;
  minPrice: number;
  maxPrice: number;
  shift?: string;
  facility?: string;
}

const UniversityAbout: React.FC<UniversityAboutProps> = ({
  name,
  description,
  totalEnrollment,
  classSize,
  minPrice,
  maxPrice,
  shift,
  facility
}) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        About {name}
      </h2>
      <div className="mt-4 text-gray-700 leading-relaxed">
        <p className="mb-6">{description}</p>

        <div>
          <h2 className="font-bold text-gray-900 mb-3">Admission Requirements</h2>
          <ul className="list-disc list-inside space-y-1.5 text-gray-600">
            <li>Completed application form</li>
            <li>High school transcripts</li>
            <li>Standardized test scores (if applicable)</li>
            <li>Letters of recommendation</li>
            <li>Personal statement or essay</li>
          </ul>
        </div>

        {/* <h3 className="text-base font-semibold text-gray-800 mb-3">University Features</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="font-medium text-gray-700">Enrollment</div>
            <div className="text-gray-500">{totalEnrollment ? totalEnrollment.toLocaleString() : 'N/A'} students</div>
          </div>
          <div>
            <div className="font-medium text-gray-700">Tuition Range</div>
            <div className="text-gray-500">{formatPriceRange(minPrice, maxPrice)}</div>
          </div>
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Facilities</h3>
        <p className="text-gray-600">{facility || 'Information not available.'}</p> */}
      </div>
    </div>
  );
};

export default UniversityAbout;