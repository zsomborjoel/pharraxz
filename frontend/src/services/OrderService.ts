import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { OrderOverview } from './model/OrderOverview';
import { OrderSaveRequest } from './model/OrderSaveRequest';
import { ENDPOINTS } from '../config/constants';

const getAllOrderOverview = (): Promise<AxiosResponse<OrderOverview[]>> => axios.get(ENDPOINTS.ORDER, { headers: AuthHeader() });

const deleteOrderDetail = (id: number): Promise<void> => axios.delete(`${ENDPOINTS.ORDER}/detail/${id}`, { headers: AuthHeader() });

const saveOrder = (request: OrderSaveRequest): Promise<void> => axios.post(ENDPOINTS.ORDER, request, { headers: AuthHeader() });

const OrderService = {
    getAllOrderOverview,
    deleteOrderDetail,
    saveOrder,
};

export default OrderService;
