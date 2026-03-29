import { apiClient } from "./apiClient";

export const authService = {
    login: (credentials: Record<string, string>) => {
        return apiClient("/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
    },
    signup: (userData: Record<string, string>) => {
        return apiClient("/signup", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },
    getProfile: () => {
        return apiClient("/profile");
    },
    updateProfile: (userData: Record<string, string>) => {
        return apiClient("/profile", {
            method: "PUT",
            body: JSON.stringify(userData),
        });
    },
};
