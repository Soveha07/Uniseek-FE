import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Onboard from "../pages/onboarding/Onboard";
import Login from "../pages/onboarding/Login";
import SignUp from "../pages/onboarding/Signup";
import PublicRoute from "../services/auth/PublicRoute";
import ProtectedRoute from "../services/auth/ProtectedRoute";
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

        {/* ----Protected Routes---- */}
        {/* <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
        {/* ----End---- */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
