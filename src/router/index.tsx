import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Onboard from "../pages/onboarding/Onboard";
import Login from "../pages/onboarding/Login";
import SignUp from "../pages/onboarding/Signup";
import PublicRoute from "../services/auth/PublicRoute";
import ProtectedRoute from "../services/auth/ProtectedRoute";
import UniversityList from "../pages/uni/Uni-List";
import UniversityDetail from "../pages/uni/Uni-Detail";
import MentorList from "../pages/mentor/Mentor-List";
import MentorDetail from "../pages/mentor/MentorDetail";
const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* ----Public Routes---- */}
        <Route path="/" element={<PublicRoute><Onboard /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        {/* <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} /> */}
        {/* ----End---- */}

        {/* University Listing */}
        <Route path="/universities" element={<PublicRoute><UniversityList /></PublicRoute>} />
        <Route path="/universities/detail/:id" element={<PublicRoute><UniversityDetail /></PublicRoute>} />
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/mentors/detail/:id" element={<MentorDetail />} />
        {/* ----Protected Routes---- */}
        {/* <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
        {/* ----End---- */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
