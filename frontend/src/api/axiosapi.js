import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    (config) => {

        const access = localStorage.getItem("access");

        if (access) {
            config.headers.Authorization = `Bearer ${access}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // ACCESS TOKEN EXPIRED
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refresh = localStorage.getItem("refresh");

                // NO REFRESH TOKEN
                if (!refresh) {

                    localStorage.clear();

                    window.location.href = "/login";

                    return Promise.reject(error);
                }

                // REFRESH TOKEN API
                const res = await axios.post(
                    `${BASE_URL}/api/users/refresh/`,
                    {
                        refresh: refresh,
                    }
                );

                // SAVE NEW ACCESS TOKEN
                localStorage.setItem(
                    "access",
                    res.data.access
                );

                // UPDATE HEADERS
                axiosInstance.defaults.headers.Authorization =
                    `Bearer ${res.data.access}`;

                originalRequest.headers.Authorization =
                    `Bearer ${res.data.access}`;

                // RETRY REQUEST
                return axiosInstance(originalRequest);

            } catch (refreshError) {

                console.log("Refresh token expired");

                localStorage.clear();

                // REDIRECT LOGIN
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;