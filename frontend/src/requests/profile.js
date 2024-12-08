import axiosInstance from "./axiosInstance";

export const getUserProfile = async () => {
    const profileResponse = await axiosInstance.get(`/users/profile/`);
    return profileResponse.data;
};

export const getUserStats = async () => {
    const statsResponse = await axiosInstance.get(`/users/stats/`);
    return statsResponse.data;
};

export const getUserMessageHistory = async () => {
    const messageHistoryResponse = await axiosInstance.get(`/users/profile/message-history/`);
    return messageHistoryResponse.data;
};

export const updateUserProfile = async (profileData) => {
    const updateProfileResponse = await axiosInstance.put(`/users/profile/update/`, profileData);
    return updateProfileResponse.data;
};

export const changeUserPassword = async (data) => {
    const response = await axiosInstance.put("/users/profile/change-password/", data);
    return response.data;
};