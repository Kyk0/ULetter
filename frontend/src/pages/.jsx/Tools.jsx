import React from 'react';
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";

const Tools = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (isAuthenticated()) {
            navigate('/message-edit');
        } else {
            navigate('/sign-in');
        }
    };

    return (
        <div>
            <h1>Tools Page</h1>
            <button onClick={handleNavigation}>Go to MessageEdit</button>
        </div>
    );
};

export default Tools;