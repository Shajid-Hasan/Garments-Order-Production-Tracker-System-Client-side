import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllProduct from "../Pages/Home/All Product/AllProduct";
import AboutUs from "../Pages/Home/About Us/AboutUs";
import Contact from "../Pages/Home/Contact/Contact";
import Register from "../Pages/Auth/Register/Register";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import UpdateProfile from "../Pages/Update Profile/UpdateProfile";
import ProductDetails from "../Pages/Home/All Product/ProductDetails";
import BookingPage from "../Pages/Home/All Product/BookingPage";
import PrivetRoute from "./PrivetRoute";
import DashbordLayout from "../Layouts/DashbordLayout";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'allProduct',
                Component: AllProduct
            },
            {
                path: "/products/:id",
                element:
                <PrivetRoute>
                    <ProductDetails/>
                </PrivetRoute> 
            },
            {
                path: 'aboutUs',
                Component: AboutUs,
            },
            {
                path: 'contact',
                Component: Contact,
            },
            {
                path: '/',
                Component: AuthLayout,
                children: [
                    {
                        path: '/register',
                        Component: Register
                    },
                    {
                        path: '/login',
                        Component: Login
                    },
                    {
                        path: '/update-profile',
                        Component: UpdateProfile
                    },
                    {
                        path: "/booking/:id",
                        Component: BookingPage
                    }
                ]
            },
            {
                path: '/dashbord',
                element:
                    <PrivetRoute>
                        <DashbordLayout />
                    </PrivetRoute>,
                children: [
                    { 
                        path: "manage-users",
                        element: 
                        <AdminRoute>
                            <ManageUsers />
                        </AdminRoute> 
                    },
                    { 
                        path: "all-products",
                        element: 
                        <AdminRoute>
                            <AdminAllProducts />
                        </AdminRoute> 
                    },
                    { 
                        path: "all-orders", 
                        element: 
                        <AdminRoute>
                            <AdminAllOrders />
                        </AdminRoute> 
                    },
                ]
            }
            
        ]
    }
])