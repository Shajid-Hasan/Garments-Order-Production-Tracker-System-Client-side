import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../Social Login/SocialLogin';
import { toast } from 'react-toastify';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser, resetPassword, loading, setLoading } = useAuth(); // resetPassword যদি implement থাকে
    const location = useLocation();
    const navigate = useNavigate();

    // const [loading, setLoading] = useState(false);


    // 🔹 Handle Login
    const handleLogin = (data) => {
        setLoading(true);
        signInUser(data.email, data.password)
            .then(result => {
                toast.success('Login successful 🎉');
                navigate(location?.state || '/');
            })
            .catch(error => {
                const errorMessage = error.message.includes('user-not-found')
                    ? 'User not found ❌'
                    : 'Login failed ❌';
                toast.error(errorMessage);
                console.error(error);
            })
            .finally(() => setLoading(false));
    }

    // 🔹 Handle Forgot Password
    const handleForgotPassword = () => {
        const email = prompt('Please enter your registered email:');
        if (!email) return toast.error('Email is required!');
        resetPassword(email)
            .then(() => toast.success('Password reset email sent! 📧'))
            .catch(err => toast.error(err.message || 'Failed to send reset email ❌'));
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-10">
            <div className="card-body">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset space-y-3">

                        {/* EMAIL */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Email"
                        />
                        {errors.email && <p className='text-red-500'>Email is required</p>}

                        {/* PASSWORD */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
                            })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must contain uppercase, lowercase, number & special character</p>}

                        {/* Forgot Password */}
                        <div className="mt-1">
                            <button type="button" onClick={handleForgotPassword} className="link link-hover">
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button className="btn btn-neutral mt-4 w-full" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </fieldset>

                    {/* Register Link */}
                    <p className="mt-2 text-center">
                        Already have an account?
                        <Link
                            state={location.state}
                            className='text-blue-400 underline ml-2'
                            to='/register'
                        >
                            Register
                        </Link>
                    </p>


                    {/* Social Login */}
                    <SocialLogin />
                </form>
            </div>
        </div>
    );
};

export default Login;
