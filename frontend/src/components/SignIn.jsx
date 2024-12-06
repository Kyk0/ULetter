import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const { isLoggedIn, loginUser, registerUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const formType = params.get("type");
        setIsLogin(formType === "login");
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await loginUser({ username: formData.username, password: formData.password });
            } else {
                await registerUser({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    password_confirm: formData.password_confirm,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                });
            }
            navigate("/");
        } catch (err) {
            setError(err.detail || "An unexpected error occurred. Please try again.");
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        navigate(`/signin?type=${isLogin ? "signup" : "login"}`);
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

                {error && (
                    <p className="text-center text-red-500 text-sm mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isLogin ? (
                        <>
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
                                    name="username"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
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
                                    name="password"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="block text-sm font-medium text-text"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                        placeholder="First name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="last_name"
                                        className="block text-sm font-medium text-text"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                        placeholder="Last name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

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
                                    name="email"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

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
                                    name="username"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
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
                                    name="password"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirm"
                                    className="block text-sm font-medium text-text"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="password_confirm"
                                    name="password_confirm"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-background text-text"
                                    placeholder="Confirm your password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 bg-primary text-background font-medium rounded hover:bg-accent hover:shadow-md transition-all duration-300 ease-in-out"
                    >
                        {isLogin ? "Log In" : "Sign Up"}
                    </button>
                </form>

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