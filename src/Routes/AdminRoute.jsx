import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, role, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (user && role === "admin") {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
