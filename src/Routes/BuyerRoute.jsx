// import { Navigate, useLocation } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole"; // আপনার role hook

const BuyerRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (authLoading || roleLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== "buyer") {
        return (
            <p className="text-center mt-10 text-red-500">
                Access Denied. Only Buyers can access this page.
            </p>
        );
    }

    return children;
};

export default BuyerRoute;
