import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxios";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isAdmin, setIsAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/users/admin?email=${user.email}`)
                .then(res => {
                    console.log(res.data)
                    setIsAdmin(res.data.admin);
                    setAdminLoading(false);
                })
                .catch(() => {
                    setIsAdmin(false);
                    setAdminLoading(false);
                });
        }
    }, [user, axiosSecure]);

    if (loading || adminLoading) {
        return <p className="text-center mt-10">Checking permission...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
