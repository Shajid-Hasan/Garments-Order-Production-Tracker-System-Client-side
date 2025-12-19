import { NavLink, Outlet, Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";

const BuyerDashboardLayout = () => {
    const { logOut } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // ❌ Only Buyer Allowed
    if (role !== "buyer") {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-base-200 p-6">
                <h2 className="text-xl font-bold mb-6">Buyer Panel</h2>

                <ul className="space-y-3">
                    <li>
                        <NavLink to="/dashboard/my-orders">
                            My Orders
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/profile">
                            My Profile
                        </NavLink>
                    </li>

                    <li>
                        <button
                            onClick={logOut}
                            className="btn btn-sm btn-error mt-6 w-full"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default BuyerDashboardLayout;
