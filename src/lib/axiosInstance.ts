import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})

// Function to Refresh Access Token
export const refreshAccessToken = async () => {
    try {
        await axiosInstance.get("/api/refresh", { withCredentials: true });
    } catch (error) {
        console.error("Refresh token failed", error);
        return null;
    }
};


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If login fails (401 on login route), do NOT attempt refresh
        if (originalRequest.url.includes("/login")) {
            return Promise.reject(error);
        }

        // If 401 occurs on protected routes, attempt refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loops

            //Retry only if refresh succeeds
            const res = await refreshAccessToken();
            if (res !== null) {
                return axiosInstance(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);