import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UniListpage from "../Pages/Uni/UniListpage";
import UniDetailpage from "../Pages/Uni/UniDetailpage";

const Routers: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/uni" element={<UniListpage />} />
          <Route path="/unidetail" element={<UniDetailpage />} />
        </Routes>
        
      </Router>

    );
  };
  export default Routers;