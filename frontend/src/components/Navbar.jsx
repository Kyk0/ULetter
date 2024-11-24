import React from "react";
import { NavLink } from "react-router-dom";
import '../index.css';

const Navbar = () => {
    return (
        <div className="bg-background  font-mono">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto py-5 px-5 sm:px-10">
                <div className="text-2xl font-bold text-text">
                    <NavLink to="/" className="hover:text-accent transition-colors duration-300 ease-in-out">ULetter</NavLink>
                </div>
                <ul className="list-none flex space-x-6 text-text">
                    <li><NavLink to="/tools" className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out">Tools</NavLink></li>
                    <li><NavLink to="/about" className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out">About</NavLink></li>
                    <li><NavLink to="/contact" className="px-4 py-2 hover:text-accent transition-colors duration-300 ease-in-out">Contact</NavLink></li>
                </ul>
                <div className="flex items-center justify-between space-x-3">
                    <NavLink to="/signin" className="px-4 py-2 text-text hover:text-accent transition-colors duration-300 ease-in-out">Log in</NavLink>
                    <NavLink to="/signup" className="px-4 py-2 bg-primary text-white rounded hover:bg-accent shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">Sign up</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar;