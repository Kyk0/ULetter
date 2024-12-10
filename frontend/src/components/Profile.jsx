import React, { useEffect, useState } from "react";
import { getUserProfile, getUserStats, getUserMessageHistory, getUserStyles } from "../requests/profile";
import MessageHistoryModal from "./MessageHistoryModal";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import StyleDetailsModal from "./StyleDetailsModal";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [statsData, setStatsData] = useState(null);
    const [messageHistory, setMessageHistory] = useState([]);
    const [stylesData, setStylesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const [selectedStyle, setSelectedStyle] = useState(null);
    const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);

    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    const syncProfileDataFromLocalStorage = () => {
        const storedProfileData = JSON.parse(localStorage.getItem("profileData"));
        if (storedProfileData) {
            setProfileData(storedProfileData);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profile, stats, messages, styles] = await Promise.all([
                    getUserProfile(),
                    getUserStats(),
                    getUserMessageHistory(),
                    getUserStyles()
                ]);

                setProfileData(profile);
                setStatsData(stats);
                setMessageHistory(messages.message_history);
                setStylesData(styles);

                localStorage.setItem("profileData", JSON.stringify(profile));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const handleStorageChange = () => syncProfileDataFromLocalStorage();
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Make the entire page unscrollable again
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const openMessageModal = (message) => {
        setSelectedMessage(message);
        setIsMessageModalOpen(true);
    };

    const closeMessageModal = () => {
        setSelectedMessage(null);
        setIsMessageModalOpen(false);
    };

    const openStyleModal = (style) => {
        setSelectedStyle(style);
        setIsStyleModalOpen(true);
    };

    const closeStyleModal = () => {
        setSelectedStyle(null);
        setIsStyleModalOpen(false);
    };

    const openEditProfileModal = () => setIsEditProfileModalOpen(true);
    const closeEditProfileModal = () => setIsEditProfileModalOpen(false);

    const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);
    const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!profileData || !statsData) {
        return <p>Error loading profile or stats. Please try again later.</p>;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center font-mono">
            <MessageHistoryModal
                isOpen={isMessageModalOpen}
                message={selectedMessage}
                onClose={closeMessageModal}
            />
            <StyleDetailsModal
                isOpen={isStyleModalOpen}
                styleData={selectedStyle}
                onClose={closeStyleModal}
            />
            <EditProfileModal
                isOpen={isEditProfileModalOpen}
                onClose={closeEditProfileModal}
                onProfileUpdate={syncProfileDataFromLocalStorage}
                profileData={profileData}
            />
            <ChangePasswordModal
                isOpen={isChangePasswordModalOpen}
                onClose={closeChangePasswordModal}
            />

            <main className="flex flex-col lg:flex-row mt-8 w-11/12 max-w-6xl">
                <div className="lg:w-1/3 bg-secondary/80 p-6 border-2 border-accent shadow-md rounded-md flex flex-col">
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full overflow-hidden border-2 border-primary">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Placeholder"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h2 className="text-xl font-bold text-text">{profileData.username}</h2>
                        <ul className="mt-4 text-left space-y-2">
                            <li>
                                <span className="font-semibold">ID:</span> {profileData.id}
                            </li>
                            <li>
                                <span className="font-semibold">First Name:</span> {profileData.first_name}
                            </li>
                            <li>
                                <span className="font-semibold">Last Name:</span> {profileData.last_name}
                            </li>
                            <li>
                                <span className="font-semibold">Email:</span> {profileData.email}
                            </li>
                            <li>
                                <span className="font-semibold">Joined:</span> {formatDate(profileData.date_joined)}
                            </li>
                        </ul>
                    </div>
                    <div className="mt-6 bg-gray-100 p-6 rounded-md shadow-md flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-text text-center">All-Time Stats</h3>
                        <ul className="mt-6 space-y-6 text-center">
                            <li>
                                <span className="font-semibold">Messages Generated:</span>{" "}
                                {statsData.user_stats.messages_generated}
                            </li>
                            <li>
                                <span className="font-semibold">Styles Created:</span>{" "}
                                {statsData.user_stats.styles_created}
                            </li>
                            <li>
                                <span className="font-semibold">Time Saved (minutes):</span>{" "}
                                {statsData.user_stats.messages_generated * statsData.user_stats.styles_created}
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8 flex justify-around">
                        <button
                            className="px-4 py-2 bg-primary text-background rounded hover:bg-accent transition-all duration-300"
                            onClick={openEditProfileModal}
                        >
                            Edit Profile
                        </button>
                        <button
                            className="px-4 py-2 bg-primary text-background rounded hover:bg-accent transition-all duration-300"
                            onClick={openChangePasswordModal}
                        >
                            Edit Password
                        </button>
                    </div>
                </div>
                <div className="lg:w-2/3 lg:ml-8 flex flex-col gap-6">
                    <div className="bg-secondary/80 p-5 border-2 border-accent shadow-md rounded-md">
                        <h3 className="text-xl font-semibold text-text">Message History</h3>
                        <div className="mt-4 h-64 overflow-y-auto bg-gray-100 rounded p-2">
                            {messageHistory.length === 0 ? (
                                <p className="text-text">No messages yet...</p>
                            ) : (
                                <ul className="space-y-4">
                                    {messageHistory.map((message, index) => (
                                        <li
                                            key={index}
                                            className="p-2 bg-white rounded shadow-md hover:bg-gray-200 cursor-pointer transition"
                                            onClick={() => openMessageModal(message)}
                                        >
                                            <p>
                                                <strong>Request:</strong> {message.request}
                                            </p>
                                            <p>
                                                <strong>Timestamp:</strong>{" "}
                                                {new Date(message.timestamp).toLocaleString()}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="bg-secondary/80 p-5 border-2 border-accent shadow-md rounded-md">
                        <h3 className="text-xl font-semibold text-text">Personalized Styles</h3>
                        <div className="mt-4 h-64 overflow-y-auto bg-gray-100 rounded p-2">
                            {stylesData.length === 0 ? (
                                <p className="text-text">No styles configured...</p>
                            ) : (
                                <ul className="space-y-4">
                                    {stylesData.map((style, index) => (
                                        <li
                                            key={index}
                                            className="p-2 bg-white rounded shadow-md hover:bg-gray-200 cursor-pointer transition"
                                            onClick={() => openStyleModal(style)}
                                        >
                                            <p>
                                                <strong>Name:</strong> {style.name}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;