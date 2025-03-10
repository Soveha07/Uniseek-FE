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

const Layout: React.FC = () => (
  <>
    <NavBar />
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
          <Route path="/mentors/detail" element={<MentorDetail />} />
        </Route>

        {/* ----Public Routes---- */}
        <Route path="/" element={<PublicRoute><Onboard /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />

        {/* <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} /> */}
        {/* ----End---- */}

        {/* University Listing */}
        {/* <Route path="/universities" element={<PublicRoute><UniversityList /></PublicRoute>} />
        <Route path="/universities/detail/:id" element={<PublicRoute><UniversityDetail /></PublicRoute>} />
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/mentors/detail" element={<MentorDetail />} /> */}
        {/* ----Protected Routes---- */}

        {/* ----End---- */}
      </Routes>
    </Router>
  );
};

export default Routers;
