import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UniListpage from "../Pages/Uni/UniListpage";
import UniDetailpage from "../Pages/Uni/UniDetailpage";
import UserProfile from "../Pages/Profiles/UserProfile";

const Routers: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/uni" element={<UniListpage />} />
          <Route path="/unidetail" element={<UniDetailpage />} />
          <Route path="/userprofile" element={<UserProfile/>} />
        </Routes>
        
      </Router>

    );
  };
  export default Routers;