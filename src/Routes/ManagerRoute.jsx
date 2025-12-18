import { Navigate, Outlet } from "react-router";
import useUserRole from "../Hooks/useUserRole";

const ManagerRoute = ({ children }) => {
    const { role, roleLoading } = useUserRole();
    // console.log()

    if (roleLoading) return <p>Loading...</p>;

    if (role !== "manager") return <Navigate to="/" replace />;

    return children;
};

export default ManagerRoute;
