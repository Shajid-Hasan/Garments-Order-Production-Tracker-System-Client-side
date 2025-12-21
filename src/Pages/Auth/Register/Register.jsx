import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import SocialLogin from '../Social Login/SocialLogin';
import { toast } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile, setLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    const handleRegistration = (data) => {
        registerUser(data.email, data.password)
            .then(() => {
                const userProfile = {
                    displayName: data.name,
                    photoURL: data.photo
                };

                updateUserProfile(userProfile)
                    .then(() => {

                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photo,
                            role: data.role 
                        };

                        fetch('https://garments-server-side.vercel.app/users', {
                            method: 'POST',

                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userInfo)
                        })
                            .then(res => res.json())
                            .then(() => {
                                setLoading(false)
                                toast.success('Registration successful 🎉');
                                navigate(location.state || '/');
                            });

                    })
                    .catch(error => {
                        toast.error('Profile update failed');
                        setLoading(false)
                        console.error(error);
                    });
            })
            .catch(error => {
                toast.error(error.message || 'Registration failed');
                setLoading(false)
                console.error(error);
            });
    };


    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl mt-10">
            <div className="card-body">
                <form onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset space-y-2">

                        {/* NAME */}
                        <label className="label">Name</label>
                        <input
                            {...register('name', { required: true })}
                            className="input input-bordered"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500">Name is required</p>}

                        {/* PHOTO */}
                        <label className="label">Photo URL</label>
                        <input
                            {...register('photo', { required: true })}
                            className="input input-bordered"
                            placeholder="Photo URL"
                        />

                        {/* ROLE */}
                        <label className="label">Role</label>
                        <select
                            {...register('role', { required: true })}
                            className="select select-bordered"
                            defaultValue="buyer"
                        >
                            <option value="buyer">Buyer</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>

                        {/* EMAIL */}
                        <label className="label">Email</label>
                        <input
                            {...register('email', { required: true })}
                            className="input input-bordered"
                            placeholder="Email"
                        />

                        {/* PASSWORD */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', { required: true, minLength: 6 })}
                                className="input input-bordered w-full pr-10"
                                placeholder="Password"
                            />
                            <span
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl"
                                onClick={togglePassword}
                            >
                                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </span>
                        </div>

                        <button className="btn btn-neutral mt-4 w-full">
                            Register
                        </button>
                    </fieldset>
                </form>

                <p className="mt-4 text-center">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 underline ml-1">
                        Login
                    </Link>
                </p>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;
