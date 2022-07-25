import axios from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { ENDPOINTS } from '../config/constants';

const getUserBoard = (): Promise<any> => {
    return axios.get(ENDPOINTS.USER, { headers: AuthHeader() });
};

const UserService = {
    getUserBoard,
};

export default UserService;
