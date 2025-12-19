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
import ManagerRoute from "./ManagerRoute";

// Admin Pages
import ManageUsers from "../Pages/Dashbord/Manage User/ManageUsers";
import AdminAllOrders from "../Pages/Dashbord/Admin All Order/AdminAllOrders";
import AdminAllProducts from "../Pages/Dashbord/Admin All Products/AdminAllProducts";
import MyOrders from "../Pages/Dashbord/My Order/MyOrders";
import AdminOrderDetails from "../Pages/Dashbord/Admin All Order/AdminOrderDetails";

// Manager Pages
import AddProduct from "../Pages/Dashbord/Manager/Add Product/AddProduct";
import ManageProducts from "../Pages/Dashbord/Manager/Manage Product/ManageProducts";
import PendingOrders from "../Pages/Dashbord/Manager/Pending Order/PendingOrders";
import ApprovedOrders from "../Pages/Dashbord/Manager/Approved Order/ApprovedOrders";
import Profile from "../Pages/Dashbord/Manager/Profile/Profile";
import BuyerDashboardLayout from "../Layouts/BuyerDashboardLayout";
import BuyerRoute from "./BuyerRoute";
import TrackOrder from "../Pages/Dashbord/Buyer/Track Order/TrackOrder";
import MyProfile from "../Pages/Dashbord/Buyer/My Profile/MyProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "allProduct", Component: AllProduct },
            {
                path: "/products/:id",
                element: (
                    <PrivetRoute>
                        <ProductDetails />
                    </PrivetRoute>
                ),
            },
            { path: "aboutUs", Component: AboutUs },
            { path: "contact", Component: Contact },
            {
                path: "/",
                Component: AuthLayout,
                children: [
                    { path: "register", Component: Register },
                    { path: "login", Component: Login },
                    { path: "update-profile", Component: UpdateProfile },
                    { path: "booking/:id", Component: BookingPage },
                ],
            },
            {
                path: "dashboard",
                element: (
                    <PrivetRoute>
                        <DashbordLayout />
                    </PrivetRoute>
                ),
                children: [
                    // ================= ADMIN ROUTES =================
                    {
                        path: "manage-users",
                        element: (
                            <AdminRoute>
                                <ManageUsers />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "all-products",
                        element: (
                            <AdminRoute>
                                <AdminAllProducts />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "all-orders",
                        element: (
                            <AdminRoute>
                                <AdminAllOrders />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "order/:id",
                        element: (
                            <AdminRoute>
                                <AdminOrderDetails />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "my-orders",
                        element: (
                            <AdminRoute>
                                <MyOrders />
                            </AdminRoute>
                        ),
                    },

                    // ================= MANAGER ROUTES =================
                    {
                        path: "add-product",
                        element: (
                            <ManagerRoute>
                                <AddProduct />
                            </ManagerRoute>
                        ),
                    },
                    {
                        path: "manage-products",
                        element: (
                            <ManagerRoute>
                                <ManageProducts />
                            </ManagerRoute>
                        ),
                    },
                    {
                        path: "pending-orders",
                        element: (
                            <ManagerRoute>
                                <PendingOrders />
                            </ManagerRoute>
                        ),
                    },
                    {
                        path: "approved-orders",
                        element: (
                            <ManagerRoute>
                                <ApprovedOrders />
                            </ManagerRoute>
                        ),
                    },
                    {
                        path: "profile",
                        element: (
                            <ManagerRoute>
                                <Profile />
                            </ManagerRoute>
                        ),
                    },

                    // ================= BUYER ROUTES =================
                    {
                        path: "buyer",
                        element: (
                            <BuyerRoute>
                                <BuyerDashboardLayout />
                            </BuyerRoute>
                        ),
                        children: [
                            { 
                                path: "my-orders",
                                Component: MyOrders
                            },
                            { 
                                path: "track-order/:orderId",
                                Component: TrackOrder
                            },
                            { 
                                path: "profile",
                                element: MyProfile
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
