// src/routes/RoleRoute.jsx

import { Navigate } from "react-router";

const RoleRoute = ({ children, roles }) => {

    const role = localStorage.getItem("role");

    if (!role) {
        return <Navigate to="/login" />;
    }

    if (!roles.includes(role)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default RoleRoute;