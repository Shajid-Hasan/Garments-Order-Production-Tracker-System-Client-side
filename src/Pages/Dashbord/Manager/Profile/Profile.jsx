// import useAuth from "../../hooks/useAuth";

import useAuth from "../../../../Hooks/useAuth";

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <img src={user.photoURL} width="100" />
            <h2>{user.displayName}</h2>
            <p>{user.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
