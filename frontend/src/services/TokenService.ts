import { User } from './model/User';

const STORAGE_ITEM_USER = 'user';

const getLocalRefreshToken = (): string | null => {
    const user = localStorage.getItem(STORAGE_ITEM_USER);
    if (user === null) {
        return null;
    }

    return JSON.parse(user)?.refreshToken;
};

const getLocalAccessToken = (): string | null => {
    const user = localStorage.getItem(STORAGE_ITEM_USER);
    if (user === null) {
        return null;
    }

    return JSON.parse(user)?.accessToken;
};

const updateLocalAccessToken = (token: string): void => {
    const user = localStorage.getItem(STORAGE_ITEM_USER);
    if (user === null) {
        return;
    }

    const parsedUser = JSON.parse(user);
    parsedUser.accessToken = token;
    localStorage.setItem(STORAGE_ITEM_USER, JSON.stringify(parsedUser));
};

const getUser = (): User | null => {
    const user = localStorage.getItem(STORAGE_ITEM_USER);
    if (user === null) {
        return null;
    }

    return JSON.parse(user);
};

const setUser = (user: User): void => {
    localStorage.setItem(STORAGE_ITEM_USER, JSON.stringify(user));
};

const removeUser = (): void => {
    localStorage.removeItem(STORAGE_ITEM_USER);
};

const isUserLoggedIn = (): boolean => {
    return localStorage.getItem(STORAGE_ITEM_USER) !== null;
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
    isUserLoggedIn,
};

export default TokenService;
