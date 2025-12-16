import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import useAuth from '../../../Hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../Hooks/useAuth';

const UpdateProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            reset({
                name: user.displayName || '',
                photo: user.photoURL || ''
            });
        }
    }, [user, reset]);

    const handleUpdate = (data) => {
        setLoading(true);

        const profileData = {
            displayName: data.name,
            photoURL: data.photo
        };

        updateUserProfile(profileData)
            .then(() => {
                toast.success('Profile updated successfully 🎉');
            })
            .catch((error) => {
                toast.error(error.message || 'Profile update failed ❌');
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="card w-full max-w-md mx-auto mt-10 shadow-lg bg-base-100">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="card-body">
                <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>

                <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="label">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="label">Photo URL</label>
                        <input
                            type="url"
                            {...register('photo', { required: 'Photo URL is required' })}
                            className="input input-bordered w-full"
                        />
                        {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
