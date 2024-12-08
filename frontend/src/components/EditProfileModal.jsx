import React, { useEffect, useState } from "react";
import { updateUserProfile, getUserProfile } from "../requests/profile";

const EditProfileModal = ({ isOpen, onClose, onProfileUpdate }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (isOpen) {
            const profileData = JSON.parse(localStorage.getItem("profileData")) || {};
            setFormData({
                first_name: profileData.first_name || "",
                last_name: profileData.last_name || "",
                username: profileData.username || "",
                email: profileData.email || "",
            });
            setErrorMessage("");
            setSuccessMessage("");
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleSubmit = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await updateUserProfile(formData);
            const updatedProfile = await getUserProfile();
            localStorage.setItem("profileData", JSON.stringify(updatedProfile));
            onProfileUpdate(updatedProfile);
            setSuccessMessage("Profile updated successfully.");
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage("Failed to update profile. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-3/4 lg:w-1/3 relative">
                <button
                    className="absolute top-2 right-2 text-black font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3 className="text-xl font-bold mb-6">Edit Profile</h3>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Email"
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
                    )}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-primary text-white rounded"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;