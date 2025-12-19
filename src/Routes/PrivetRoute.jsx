// import { Navigate, useLocation } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(loading)
    console.log(user)

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivetRoute;
