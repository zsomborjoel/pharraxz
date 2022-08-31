import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { OrderView } from './model/OrderView';
import { OrderSaveRequest } from './model/OrderSaveRequest';
import { ENDPOINTS } from '../config/constants';

const getAllOrderView = (): Promise<AxiosResponse<OrderView[]>> =>
    axios.get(ENDPOINTS.ORDER, { headers: AuthHeader() });

const deleteOrderDetail = (id: number): Promise<void> =>
    axios.delete(`${ENDPOINTS.ORDER}/detail/${id}`, { headers: AuthHeader() });

const saveOrder = (request: OrderSaveRequest): Promise<AxiosResponse<OrderView[]>> =>
    axios.post(ENDPOINTS.ORDER, request, { headers: AuthHeader() });

const OrderService = {
    getAllOrderView,
    deleteOrderDetail,
    saveOrder,
};

export default OrderService;
