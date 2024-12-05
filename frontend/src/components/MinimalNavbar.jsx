import React from "react";
import { NavLink } from "react-router-dom";

const MinimalNavbar = () => {
    return (
        <div className="bg-background font-mono fixed top-0 left-0 w-full z-10 h-16">
            <div className="flex items-center max-w-screen-xl mx-auto py-8 px-5 sm:px-10 relative">
                <div className="absolute left-0">
                    <NavLink to="/" className="text-2xl font-bold text-text hover:text-accent transition-colors duration-300 ease-in-out">ULetter</NavLink>
                </div>
            </div>
        </div>
    );
};

export default MinimalNavbar;