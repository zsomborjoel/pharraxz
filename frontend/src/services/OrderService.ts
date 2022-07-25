import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { OrderOverview } from './model/OrderOverview';
import { OrderSaveRequest } from './model/OrderSaveRequest';
import { ENDPOINTS } from '../config/constants';

const getAllOrderOverview = (): Promise<AxiosResponse<OrderOverview[]>> => {
    return axios.get(`${ENDPOINTS.ORDER}/doctor`, { headers: AuthHeader() });
};

const deleteOrderDetail = (id: number): Promise<void> => {
    return axios.delete(`${ENDPOINTS.ORDER}/doctor/${id}`, { headers: AuthHeader() });
};

const saveOrder = (request: OrderSaveRequest): Promise<void> => {
    return axios.post(`${ENDPOINTS.ORDER}`, request, { headers: AuthHeader() });
};

const OrderService = {
    getAllOrderOverview,
    deleteOrderDetail,
    saveOrder,
};

export default OrderService;
