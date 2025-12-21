import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useUserRole = () => {
    const { user, loading } = useAuth();
    const [role, setRole] = useState("");
    const [roleLoading, setRoleLoading] = useState(true);
    console.log(role)

    useEffect(() => {
        if (!user?.email || loading) return;

        axios
            .get(`https://garments-server-side.vercel.app/users/role?email=${user.email}`)
            .then(res => {
                setRole(res.data.role);
                setRoleLoading(false);
            })
            .catch(() => {
                setRole("buyer");
                setRoleLoading(false);
            });
    }, [user, loading]);

    return { role, roleLoading };
};

export default useUserRole;

