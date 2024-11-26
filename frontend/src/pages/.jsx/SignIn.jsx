import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const formType = params.get("type");
        setIsLogin(formType === "login");
    }, [location]);

    const toggleForm = () => {
        const newFormType = isLogin ? "signup" : "login";
        setIsLogin(!isLogin);
        navigate(`/signin?type=${newFormType}`);
    };

    return (
        <div
            className="min-h-screen bg-background flex justify-center items-center font-mono"
            style={{ position: "fixed", inset: 0 }}
        >
            <div className="w-full max-w-md p-6 bg-secondary/80 border-2 border-accent shadow-md rounded-md">
                <h1 className="text-xl font-semibold text-center text-text mb-4">
                    {isLogin ? "Log In" : "Sign Up"}
                </h1>

                {isLogin ? (
                    <form className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-text"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-text"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-primary text-background font-medium rounded hover:bg-accent hover:shadow-md transition-all duration-300 ease-in-out"
                        >
                            Log In
                        </button>
                    </form>
                ) : (
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-text"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first-name"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="First name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-text"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last-name"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Last name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-text"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="username-signup"
                                    className="block text-sm font-medium text-text"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username-signup"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="password-signup"
                                    className="block text-sm font-medium text-text"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password-signup"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password-confirm"
                                    className="block text-sm font-medium text-text"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="password-confirm"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Confirm password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-primary text-background font-medium rounded hover:bg-accent hover:shadow-md transition-all duration-300 ease-in-out"
                        >
                            Sign Up
                        </button>
                    </form>
                )}

                <p className="mt-4 text-center text-sm text-text">
                    {isLogin ? (
                        <>
                            Don’t have an account?{" "}
                            <button
                                className="text-primary hover:text-accent underline transition-all duration-300 ease-in-out"
                                onClick={toggleForm}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                className="text-primary hover:text-accent underline transition-all duration-300 ease-in-out"
                                onClick={toggleForm}
                            >
                                Log In
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default SignIn;