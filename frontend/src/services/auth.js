const isAuthenticated = () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
};

const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
};

export { isAuthenticated, logOut };