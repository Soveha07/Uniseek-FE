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
          <Route path="/recommendation" element={<UniversityRecommendation />} />
          <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
        </Route>

        {/* ----Public Routes---- */}
        <Route path="/" element={<PublicRoute><Onboard /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />

        {/* <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} /> */}
        {/* ----End---- */}

        {/* ----Protected Routes---- */}

        {/* ----End---- */}
      </Routes>
    </Router>
  );
};

export default Routers;
