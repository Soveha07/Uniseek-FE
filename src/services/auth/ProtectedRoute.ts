import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import isLoggedIn from "../../helpers/LoginAuth"; // Ensure this path is correct

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return isLoggedIn() ? children : React.createElement(Navigate, { to: "/", replace: true });
};

export default ProtectedRoute;
