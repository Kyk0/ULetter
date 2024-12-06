import React, { createContext, useState, useEffect, useCallback } from "react";
import { loginUserAPI, registerUserAPI, logoutUserAPI } from "../requests/auth";
import { getUserProfile } from "../requests/profile";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            console.error("Failed to parse JWT:", e);
            return null;
        }
    };

    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem("authTokens");
        return storedTokens ? JSON.parse(storedTokens) : null;
    });

    const [user, setUser] = useState(null);

    const isTokenExpired = (token) => {
        const payload = parseJwt(token);
        return payload?.exp && Math.floor(Date.now() / 1000) > payload.exp;
    };

    const loginUser = async (credentials) => {
        try {
            const data = await loginUserAPI(credentials);
            setAuthTokens(data);
            setUser(parseJwt(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const registerUser = async (userData) => {
        try {
            const data = await registerUserAPI(userData);
            setAuthTokens(data);
            setUser(parseJwt(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
        } catch (error) {
            console.error("Sign-up failed:", error);
            throw error;
        }
    };

    const logoutUser = useCallback(async () => {
        try {
            if (authTokens?.refresh) {
                await logoutUserAPI(authTokens.refresh);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem("authTokens");
            window.location.href = "/";
        }
    }, [authTokens]);

    useEffect(() => {
        if (authTokens && isTokenExpired(authTokens.access)) {
            logoutUser();
        } else if (authTokens?.access) {
            setUser(parseJwt(authTokens.access));
        }
    }, [authTokens, logoutUser]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUser((prevUser) => ({ ...prevUser, ...profile }));
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        if (authTokens?.access) {
            fetchUserProfile();
        }
    }, [authTokens]);

    const isLoggedIn = useCallback(() => {
        return authTokens && !isTokenExpired(authTokens.access);
    }, [authTokens]);

    return (
        <AuthContext.Provider
            value={{
                user,
                authTokens,
                isLoggedIn,
                loginUser,
                registerUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };