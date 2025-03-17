import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Onboard from "../pages/onboarding/Onboard";
import Login from "../pages/onboarding/Login";
import SignUp from "../pages/onboarding/Signup";
import PublicRoute from "../services/auth/PublicRoute";
import Survey from "../pages/survey/Survey";
import ProtectedRoute from "../services/auth/ProtectedRoute";
import NavBar from "../layouts/navbar";
import { Outlet } from "react-router-dom";
import UniversityRecommendation from "../pages/survey/UniRecommenation";
import UniversityList from "../pages/uni/Uni-List";
import UniversityDetail from "../pages/uni/Uni-Detail";
import MentorList from "../pages/mentor/Mentor-List";
import MentorDetail from "../pages/mentor/MentorDetail";
import MajorMentors from "../pages/mentor/MajorMentor";
import BookingsPage from "../pages/booking/booking";
import MentorLogin from "../pages/mentor_pages/login";
import MentorHome from "../pages/mentor_pages/home";
import MentorNavBar from "../layouts/mentorNavBar";
import MentorProfile from "../pages/mentor_pages/mentorProfile";
import UserProfile from "../pages/student/UserProfile";
import UserResetPw from "../pages/student/UpdatePassword";

const Layout: React.FC = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const MentorLayout: React.FC = () => (
  <>
    <MentorNavBar />
    <Outlet />
  </>
);

const Routers: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ----With Layout---- */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/uniRecommendation" element={<UniversityRecommendation />} />
          <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
          <Route path="/universities" element={<UniversityList />} />
          <Route path="/universities/detail/:id" element={<UniversityDetail />} />
          <Route path="/mentors" element={<MentorList />} />
          <Route path="/mentors/detail/:id" element={<MentorDetail />} />
          <Route path="/universities/:universityId/majors/:majorId/mentors" element={<MajorMentors />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/userprofile/:uid" element={<UserProfile/>}></Route>
          <Route path="/userresetpw" element={<UserResetPw/>}></Route>
        </Route>
        {/* ----End---- */}

        {/* ----Public Routes---- */}
        <Route path="/" element={<PublicRoute><Onboard /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        {/* ----End---- */}

        {/* Mentor Pages */}
        <Route path="/mentor/login" element={<MentorLogin />} />
        <Route element={<MentorLayout />}>
          <Route path="/mentor/home" element={<ProtectedRoute><MentorHome /></ProtectedRoute>} />
          <Route path="/mentor/profile" element={<ProtectedRoute><MentorProfile /></ProtectedRoute>} />
        </Route>
        {/* ----End---- */}

        {/* ----Protected Routes---- */}
        {/* ----End---- */}
      </Routes>
    </Router>
  );
};

export default Routers;
