import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Onboard from "../pages/onboarding/Onboard";
import Login from "../pages/onboarding/Login";
import SignUp from "../pages/onboarding/Signup";
import PublicRoute from "../services/auth/PublicRoute";
import ProtectedRoute from "../services/auth/ProtectedRoute";
import NavBar from "../layouts/navbar";
import { Outlet } from "react-router-dom";

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
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute><Onboard /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          
          <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;
