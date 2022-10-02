import axios from 'axios';
import { RoleName } from './enum/RoleName';
import { Auth } from './model/Auth';

const STORAGE_ITEM_USER = 'user';

const isUserLoggedIn = (): boolean => localStorage.getItem(STORAGE_ITEM_USER) !== null;

const setupAxiosInterceptors = (token: string): any => {
    axios.interceptors.request.use((config) => {
        if (isUserLoggedIn() && config.headers) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });
};

const login = (username: string, password: string): Promise<boolean> =>
    axios
        .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            username,
            password,
        })
        .then((response: { data: Auth }) => {
            localStorage.setItem(STORAGE_ITEM_USER, JSON.stringify(response.data));
            setupAxiosInterceptors(response.data.jwtToken);
            return true;
        });

const logout = (): void => {
    localStorage.removeItem(STORAGE_ITEM_USER);
};

const getCurrentUser = (): Auth | null => {
    const user = localStorage.getItem(STORAGE_ITEM_USER);

    if (user === null) {
        return null;
    }

    return JSON.parse(user);
};

const hasUserValidRole = (requiredUserRoles: RoleName[] | undefined): boolean => {
    if (requiredUserRoles === undefined) {
        return true;
    }

    if (requiredUserRoles) {
        const roles = getCurrentUser()?.roleNames;

        if (roles) {
            const found = roles.find((role) => requiredUserRoles.includes(RoleName[role as keyof typeof RoleName]));
            if (found) return true;
        }
    }

    return false;
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
    isUserLoggedIn,
    hasUserValidRole,
};

export default AuthService;
