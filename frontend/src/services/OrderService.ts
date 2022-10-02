import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { OrderView } from './model/OrderView';
import { OrderSaveRequest } from './model/OrderSaveRequest';

const save = (endpoint: string, request: OrderSaveRequest): Promise<AxiosResponse<OrderView[]>> =>
    axios.post(endpoint, request, { headers: AuthHeader() });

const OrderService = {
    save,
};

export default OrderService;
