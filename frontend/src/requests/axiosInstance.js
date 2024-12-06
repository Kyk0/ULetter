import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(async (config) => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens) {
        const { access, refresh } = JSON.parse(tokens);

        const payload = JSON.parse(atob(access.split(".")[1]));
        const isExpired = Math.floor(Date.now() / 1000) > payload.exp;

        if (isExpired) {
            try {
                const response = await axios.post(`${API_BASE_URL}/users/token/refresh/`, { refresh });
                localStorage.setItem("authTokens", JSON.stringify(response.data));
                config.headers.Authorization = `Bearer ${response.data.access}`;
            } catch (error) {
                console.error("Token refresh failed:", error);
                localStorage.removeItem("authTokens");
                window.location.href = "/login";
                throw error;
            }
        } else {
            config.headers.Authorization = `Bearer ${access}`;
        }
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error);
        return Promise.reject(error.response?.data || { detail: "An error occurred" });
    }
);

export default axiosInstance;