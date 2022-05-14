import axios from 'axios';
import AuthHeader from '../utils/AuthHeader';

const getUserBoard = (): Promise<any> => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, { headers: AuthHeader() });
};

const UserService = {
    getUserBoard,
};

export default UserService;
