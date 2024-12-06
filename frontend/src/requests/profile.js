import axiosInstance from "./axiosInstance";

export const getUserProfile = async () => {
    const response = await axiosInstance.get(`/users/profile/`);
    return response.data;
};