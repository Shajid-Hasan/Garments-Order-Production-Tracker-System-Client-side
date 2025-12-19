// import useAuth from "../../../Hooks/useAuth";

import useAuth from "../../../../Hooks/useAuth";

const MyProfile = () => {
    const { user, logOut } = useAuth();

    return (
        <div className="max-w-md">
            <h2 className="text-xl font-bold mb-4">My Profile</h2>

            <div className="card bg-base-200 p-4">
                <p><strong>Name:</strong> {user?.displayName}</p>
                <p><strong>Email:</strong> {user?.email}</p>

                <button
                    onClick={logOut}
                    className="btn btn-error mt-4 w-full"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MyProfile;
