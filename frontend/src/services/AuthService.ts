import axios from 'axios';

const STORAGE_ITEM_USER = 'user';

const isUserLoggedIn = (): boolean => {
    return localStorage.getItem(STORAGE_ITEM_USER) !== null;
};

const setupAxiosInterceptors = (token: string): any => {
    axios.interceptors.request.use(
        (config) => {
            if (isUserLoggedIn() && config.headers) {
                const bearer = `Bearer ${token}`;
                // eslint-disable-next-line no-param-reassign
                config.headers.Authorization = bearer;
            }
            return config;
        },
    );
};

const login = (username: string, password: string): any => {
    return axios
        .post(`${process.env.REACT_APP_SERVER_URL}/login`, {
            username,
            password,
        })
        .then((response: { data: { jwtToken: string; refreshToken: string; }; }) => {
            if (response.data.jwtToken) {
                setupAxiosInterceptors(response.data.jwtToken);
            }
        });
};

const logout = (): void => {
    localStorage.removeItem(STORAGE_ITEM_USER);
};

const getCurrentUser = (): string | null => {
    const user = localStorage.getItem(STORAGE_ITEM_USER);
    if (user === null) {
        return null;
    }
    return JSON.parse(user);
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
    isUserLoggedIn,
};

export default AuthService;
