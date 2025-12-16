import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    if (!user) {
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }

    return children
};

export default PrivetRoute;