import axios from 'axios';

const STORAGE_ITEM_USER = 'user';

const login = (username: string, password: string): any => {
    return axios
        .post(`${process.env.REACT_APP_SERVER_URL}/login`, {
            username,
            password,
        })
        .then((response: { data: { accessToken: string; }; }) => {
            if (response.data.accessToken) {
                localStorage.setItem(STORAGE_ITEM_USER, JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = (): void => {
    localStorage.removeItem(STORAGE_ITEM_USER);
};

const getCurrentUser = (): string => {
    const user = localStorage.getItem(STORAGE_ITEM_USER);
    if (user === null) {
        return '';
    }
    return JSON.parse(user);
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
