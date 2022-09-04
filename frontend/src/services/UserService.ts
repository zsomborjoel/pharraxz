import axios from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { ENDPOINTS } from '../configs/constants';

const getUserBoard = (): Promise<any> => axios.get(ENDPOINTS.USER, { headers: AuthHeader() });

const UserService = {
    getUserBoard,
};

export default UserService;
