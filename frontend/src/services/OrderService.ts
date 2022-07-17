import axios from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { DoctorOrderOverview } from './model/OrderOverview';

const ENTITY_URL = '/orders';

const getAllOrderOverview = (): Promise<DoctorOrderOverview[]> => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL + ENTITY_URL}/doctor`, { headers: AuthHeader() });
};

const deleteOrderDetail = (id: number): Promise<void> => {
    return axios.delete(`${process.env.REACT_APP_SERVER_URL + ENTITY_URL}/doctor/${id}`, { headers: AuthHeader() });
};

const OrderService = {
    getAllOrderOverview,
    deleteOrderDetail,
};

export default OrderService;
