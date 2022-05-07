import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response: { data: { accessToken: string; }; }) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = (): string => {
    const user = localStorage.getItem("user");
    if (user === null) {
        return '';
    }
    return JSON.parse(user);
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
