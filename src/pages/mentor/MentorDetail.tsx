import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MentorDetailLayout from "../../layouts/mentor/MentorDetailLayout";
import MentorHeroBanner from "./components/MentorBanner";
import MentorProfileHeader from "./components/MentorProfile";
import MentorAboutSection from "./components/MentorAbout";
import MentorScheduleSection from "./components/MentorSchedule";
import BackButton from "./components/BackButton";
import { getMentorById } from "../../api/mentor/GetMentorById";

const MentorDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [mentorData, setMentorData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState("Tue");
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const data = await getMentorById(Number(id));
        setMentorData(data);
        console.log("Fetched mentor data:", data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  const handleBackToList = () => {
    navigate('/mentors');
  };

  // Sample data if couldn't fetch from backend
  const sampleData = {
    id: 1,
    name: "Just Me",
    profileImage: "/assets/images/profile-pic.png",
    rating: 4.3,
    reviewCount: 150,
    university: "Institute of Technology of Cambodia",
    title: "Data Science Student & Junior Data Scientist",
    bio: [
      "A year 5 student at ITC, majoring in Data Science. Currently working as a Junior Data Scientist at EY.",
      "Passionate about helping students navigate their educational and career paths in the tech industry.",
      "My expertise includes Python programming, machine learning algorithms, and data visualization techniques. I've helped over 20 students improve their coding skills and land internships in the field."
    ],
    ratings: {
      average: 4.3,
      count: 150,
      breakdown: [
        { label: "5", value: 75, percentage: "50%" },
        { label: "4", value: 45, percentage: "30%" },
        { label: "3", value: 15, percentage: "10%" },
        { label: "2", value: 10, percentage: "7%" },
        { label: "1", value: 5, percentage: "3%" }
      ]
    },
    schedule: {
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      unavailableDays: ["Wed"],
      availableTimes: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"]
    }
  };
  
  const data = mentorData ? {
    ...sampleData,
    id: mentorData.id,
    name: mentorData.fullName,
    profileImage: mentorData.profileUrl || sampleData.profileImage,
    university: mentorData.university?.name || sampleData.university,
    title: mentorData.major?.name || sampleData.title,
    bio: [mentorData.description || sampleData.bio[0], ...sampleData.bio.slice(1)],
    rating: sampleData.rating,
    reviewCount: sampleData.reviewCount,
    ratings: sampleData.ratings,
    schedule: sampleData.schedule
  } : sampleData;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MentorDetailLayout>
      <MentorHeroBanner profileImage={data.profileImage} />
      
      <MentorProfileHeader 
        name={data.name}
        rating={data.rating}
        reviewCount={data.reviewCount}
        university={data.university}
        title={data.title}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <MentorAboutSection 
          bio={data.bio}
          ratings={data.ratings}
        />
        
        <MentorScheduleSection 
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          availableDays={data.schedule.availableDays}
          availableTimes={data.schedule.availableTimes}
          unavailableDays={data.schedule.unavailableDays}
        />
      </div>
      
      <BackButton 
        label="Back to Mentor List"
        onClick={handleBackToList}
      />
    </MentorDetailLayout>
  );
};

export default MentorDetail;
