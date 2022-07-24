import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { OrderOverview } from './model/OrderOverview';

const ENTITY_URL = '/orders';

const getAllOrderOverview = (): Promise<AxiosResponse<OrderOverview[]>> => {
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
