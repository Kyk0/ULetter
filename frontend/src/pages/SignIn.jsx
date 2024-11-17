import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/login/', {
                params: { username, password }
            });
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            navigate('/tools');
        } catch {
            alert('Invalid credentials');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/register/', {
                params: { username, password, email }
            });
            alert('Account created successfully. Please log in.');
            setIsSigningUp(false);
        } catch {
            alert('Sign-up failed. Please try again.');
        }
    };

    return (
        <div className="sign-wrapper">
            <div className="sign-container">
                <h1 className="sign-title">{isSigningUp ? 'Sign Up' : 'Sign In'}</h1>
                {isSigningUp ? (
                    <form className="sign-form" onSubmit={handleSignUp}>
                        <input
                            className="sign-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="sign-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="sign-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="sign-button" type="submit">Sign Up</button>
                        <p className="sign-text">
                            Already have an account?{' '}
                            <span
                                className="sign-toggle"
                                onClick={() => setIsSigningUp(false)}
                            >
                                Log In
                            </span>
                        </p>
                    </form>
                ) : (
                    <form className="sign-form" onSubmit={handleLogin}>
                        <input
                            className="sign-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="sign-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="sign-button" type="submit">Log In</button>
                        <p className="sign-text">
                            Don't have an account?{' '}
                            <span
                                className="sign-toggle"
                                onClick={() => setIsSigningUp(true)}
                            >
                                Sign Up
                            </span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignIn;