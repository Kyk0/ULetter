import React, { useContext } from "react";
import { AuthContext } from "../services/AuthContext";

function Home() {
    const { user, isLoggedIn } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono">
            <h1 className="text-2xl font-bold text-text mb-4">Welcome to the Home Page</h1>
            {isLoggedIn() ? (
                <>
                    <p className="text-green-500">You are logged in as <strong>{user?.username}</strong>.</p>
                    <p>Email: <strong>{user?.email || "N/A"}</strong></p>
                    <p>Full Name: <strong>{user?.first_name} {user?.last_name}</strong></p>
                </>
            ) : (
                <p className="text-red-500">You are not logged in. Please log in to continue.</p>
            )}
        </div>
    );
}

export default Home;