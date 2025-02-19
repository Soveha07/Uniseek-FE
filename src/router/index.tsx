import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UniListpage from "../Pages/Uni/UniListpage";

const Routers: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/uni" element={<UniListpage />} />
        </Routes>
      </Router>
    );
  };
  export default Routers;