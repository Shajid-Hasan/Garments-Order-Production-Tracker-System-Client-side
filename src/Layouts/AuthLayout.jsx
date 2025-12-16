import React from 'react';
import Logo from '../Component/Logo/Logo';

import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;