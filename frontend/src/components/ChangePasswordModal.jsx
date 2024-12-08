import React, { useState, useEffect } from "react";
import { changeUserPassword } from "../requests/profile";

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        new_password: "",
        password_confirm: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (isOpen) {
            setErrorMessage("");
            setSuccessMessage("");
            setFormData({
                new_password: "",
                password_confirm: "",
            });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleSubmit = async () => {
        if (formData.new_password !== formData.password_confirm) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            await changeUserPassword(formData);
            setSuccessMessage("Password changed successfully.");
            setFormData({
                new_password: "",
                password_confirm: "",
            });
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Error changing password:", error);
            setErrorMessage("Failed to change password. Please try again.");
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
                <h3 className="text-xl font-bold mb-6">Change Password</h3>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="new_password" className="block text-sm font-medium">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="New Password"
                        />
                    </div>
                    <div>
                        <label htmlFor="password_confirm" className="block text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="password_confirm"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Confirm Password"
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

export default ChangePasswordModal;