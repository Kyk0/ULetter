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
export const getUserStyles = async () => {
    const stylesResponse = await axiosInstance.get(`/style_personalization/styles/retrieve`);
    return stylesResponse.data;
};

export const getStyleQuestions = async (category) => {
    const response = await axiosInstance.get("/style_personalization/questions", {
        params: { category },
    });
    return response.data;
};

export const sendToChatGPT = async (payload) => {
    const response = await axiosInstance.post("/text-processing/chat-gpt/call/", payload);
    return response.data;
};