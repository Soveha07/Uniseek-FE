import React, { useEffect, useState } from 'react';
import SocialLinks from './SocialLinks';
import ratingService, { MentorRatingsResponse } from '../../services/rating/ratingservice';

interface MentorProfileHeaderProps {
  name: string;
  rating: number;
  reviewCount: number;
  university: string;
  title: string;
  mentorId: number
}

const MentorProfileHeader: React.FC<MentorProfileHeaderProps> = ({
  name,
  rating,
  reviewCount,
  university,
  title,
  mentorId
}) => {

  const [ratings, setRatings] = useState<MentorRatingsResponse | null>(null);
  const [newRating, setNewRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await ratingService.getRatingsByMentor(mentorId);
        console.log("ratingsdata", data);
        setRatings(data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, [mentorId]);

  // Generate star rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`text-xl ${i <= Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
    );
  }

  return (
    <div className="flex flex-col ml-8 sm:ml-12 md:ml-16 mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h2>
      {/* Display average rating */}
      <div className="flex items-center mt-2">
        {/* <div className="text-3xl font-bold text-blue-600">{ratings?.avgRating ?? 0}</div> */}
        <div className="flex text-yellow-400 text-2xl">
          {(() => {
            const avg = ratings?.avgRating ?? 0;
            let roundedStars = 1;

            if (avg >= 4.5) roundedStars = 5;
            else if (avg >= 3.5) roundedStars = 4;
            else if (avg >= 2.5) roundedStars = 3;
            else if (avg >= 1.5) roundedStars = 2;
            else if (avg == 0) roundedStars = 0;

            return [...Array(5)].map((_, i) => (
              <span key={i}>{i < roundedStars ? '★' : '☆'}</span>
            ));
          })()}
        </div>
        <span className="text-m text-gray-600 ml-2">({ratings?.totalRatings ?? 0})</span>
      </div>
      <div className="flex flex-col mt-2">
        <span className="text-gray-700 font-medium">{university}</span>
        <span className="text-gray-500 text-sm mt-0.5">{title}</span>
      </div>
    </div>
  );
};

export default MentorProfileHeader;