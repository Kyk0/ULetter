import React, { useEffect, useState } from "react";
import { getUserProfile } from "../requests/profile";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
            } catch (err) {
                setError("Failed to load profile. Please try again later.");
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono">
            <h1 className="text-2xl font-bold text-text mb-4">Profile</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : profile ? (
                <div className="text-text text-center space-y-2">
                    <p><strong>ID:</strong> {profile.id}</p>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>First Name:</strong> {profile.first_name || "N/A"}</p>
                    <p><strong>Last Name:</strong> {profile.last_name || "N/A"}</p>
                    <p><strong>Date Joined:</strong> {new Date(profile.date_joined).toLocaleString()}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;