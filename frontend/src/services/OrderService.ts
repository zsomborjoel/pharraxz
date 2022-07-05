import axios from 'axios';
import AuthHeader from '../utils/AuthHeader';

const ENTITY_URL = '/orders';

const getAllDoctorOrderOverview = (): Promise<any> => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL + ENTITY_URL}/doctor`, { headers: AuthHeader() });
};

const OrderService = {
    getAllDoctorOrderOverview,
};

export default OrderService;
