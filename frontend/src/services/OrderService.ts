import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { OrderView } from './model/OrderView';
import { OrderSaveRequest } from './model/OrderSaveRequest';

const getAllByUserId = (endpoint: string, userId: number): Promise<AxiosResponse<OrderView[]>> =>
    axios.get(`${endpoint}/${userId}`, { headers: AuthHeader() });

const save = (endpoint: string, request: OrderSaveRequest): Promise<AxiosResponse<OrderView[]>> =>
    axios.post(endpoint, request, { headers: AuthHeader() });

const OrderService = {
    getAllByUserId,
    save,
};

export default OrderService;
