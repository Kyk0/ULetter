import axiosInstance from "./axiosInstance";

export const loginUserAPI = async (credentials) => {
    const response = await axiosInstance.post(`/users/login/`, credentials, {
        headers: { Authorization: undefined },
    });
    return response.data;
};

export const registerUserAPI = async (userData) => {
    const response = await axiosInstance.post(`/users/signup/`, userData, {
        headers: { Authorization: undefined },
    });
    return response.data;
};

export const logoutUserAPI = async (refreshToken) => {
    const response = await axiosInstance.post(`/users/logout/`, { refresh: refreshToken });
    return response.data;
};