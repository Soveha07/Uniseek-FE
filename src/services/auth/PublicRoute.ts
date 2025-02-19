import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import isLoggedIn from "../../helpers/LoginAuth";

interface PublicRouteProps {
    children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    return !isLoggedIn() ? children : React.createElement(Navigate, { to: "/home", replace: true });
};

export default PublicRoute;
