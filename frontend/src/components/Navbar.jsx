import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logOut } from "../services/auth";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(isAuthenticated());
    }, []);

    const handleLogOut = () => {
        logOut();
        setLoggedIn(false);
        window.location.reload();
    };

    return (
        <nav>
            <ul className="nav-left">
                <li className="nav-logo"><NavLink to="/">ULetter</NavLink></li>
            </ul>
            <ul className="nav-right">
                <li><NavLink to="/tools">Tools</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                {loggedIn ? (
                    <>
                        <li>
                            <div className="nav-profile-btn"><NavLink to="/profile">Profile</NavLink></div>
                        </li>
                        <li>
                            <button className="nav-logout-btn" onClick={handleLogOut}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <button className="nav-login-btn" onClick={() => navigate("/sign-in")}>
                                Sign in
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;