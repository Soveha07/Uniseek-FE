import React, { useEffect, useState } from 'react';
import ratingService, { MentorRatingsResponse, Rating } from '../../services/rating/ratingservice';
import Loading from '../common/Loading';

interface MentorAboutSectionProps {
  bio: string[];
  mentorId: number;
}

const MentorAboutSection: React.FC<MentorAboutSectionProps> = ({ bio, mentorId }) => {
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

  const handleStarClick = (rating: number) => {
    setNewRating(rating);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newRating < 1 || newRating > 5) {
      alert('Rating must be between 1 and 5.');
      return;
    }

    try {
      const studentId = localStorage.getItem('userID') || '';
      const ratingData: Rating = {
        mentorId,
        studentId,
        rating: newRating,
        review,
      };

      console.log(ratingData);

      await ratingService.addRating(ratingData);
      alert('Rating submitted successfully!');

      const updatedRatings = await ratingService.getRatingsByMentor(mentorId);
      setRatings(updatedRatings);
      setNewRating(0);
      setReview('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-md transition-all hover:shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
      <div className="mt-4 text-gray-700 leading-relaxed">
        {bio.map((paragraph, index) => (
          <p key={index} className={index < bio.length - 1 ? 'mb-3' : 'mb-6'}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="border-t border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800">Ratings</h4>
        {loading ? (
          <Loading></Loading>
        ) : (
          <>
            {/* Display average rating */}
            <div className="flex items-center mt-4">
              <div className="text-3xl font-bold text-blue-600">{ratings?.avgRating ?? 0}</div>
              <div className="flex text-yellow-400 ml-3 text-xl">
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
              <span className="text-sm text-gray-600 ml-2">({ratings?.totalRatings ?? 0})</span>
            </div>

            {/* Submit rating form */}
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="flex gap-1 text-yellow-500 text-2xl cursor-pointer">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    onClick={() => handleStarClick(i + 1)}
                    className={i < newRating ? 'text-yellow-500' : 'text-gray-300'}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                className="w-full p-2 mt-2 border rounded-md"
                placeholder="Write a review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />

              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit Review
              </button>
            </form>

            {/* Student Ratings Section with Show More */}
            {ratings?.ratings?.length ? (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Student Reviews</h4>
                <div className="space-y-4">
                  {(showAll ? ratings.ratings : ratings.ratings.slice(0, 3)).map((r, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                      <div className="flex items-center space-x-3">
                        <img
                          src={r.student?.photoURL || '/noProfile.png'}
                          alt="Student Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{r.student?.displayName}</p>
                          <div className="flex text-yellow-500 text-lg">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < r.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {r.review && <p className="mt-2 text-gray-700">{r.review}</p>}
                    </div>
                  ))}
                </div>
                {ratings.ratings.length > 3 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 text-blue-500 hover:underline"
                  >
                    {showAll ? 'See Less' : 'See More'}
                  </button>
                )}
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No reviews yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MentorAboutSection;