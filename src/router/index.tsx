import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Onboard from "../pages/onboarding/Onboard";
const Routers: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboard />} />
      </Routes>
    </Router>
  );
};

export default Routers;
