import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <main className='min-h-[calc(100vh-285px)]'>
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
};

export default RootLayout;