import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllProduct from "../Pages/Home/All Product/AllProduct";
import AboutUs from "../Pages/Home/About Us/AboutUs";
import Contact from "../Pages/Home/Contact/Contact";

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
                path: 'aboutUs',
                Component: AboutUs,
            },
            {
                path: 'contact',
                Component: Contact,
            }
        ]
    }
])